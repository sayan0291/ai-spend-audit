import { Trash2 } from "lucide-react"
import { useUser } from "../../context/UserContext"
import { deleteSubscription } from "../../lib/supabse"

function daysUntil(dateStr) {
  if (!dateStr) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const renewal = new Date(dateStr)
  renewal.setHours(0, 0, 0, 0)
  return Math.ceil((renewal - today) / (1000 * 60 * 60 * 24))
}

const PALETTE = [
  { avatarBg: "bg-red-100",     avatarText: "text-red-700",     barColor: "bg-red-400"     },
  { avatarBg: "bg-emerald-100", avatarText: "text-emerald-800", barColor: "bg-emerald-500" },
  { avatarBg: "bg-amber-100",   avatarText: "text-amber-800",   barColor: "bg-amber-400"   },
  { avatarBg: "bg-blue-100",    avatarText: "text-blue-800",    barColor: "bg-blue-500"    },
  { avatarBg: "bg-purple-100",  avatarText: "text-purple-800",  barColor: "bg-purple-400"  },
]

function cycleProgress(renewal_date, billing_cycle) {
  if (!renewal_date) return 0
  const today = new Date()
  const renewal = new Date(renewal_date)
  const cycleDays = billing_cycle === "yearly" ? 365 : billing_cycle === "quarterly" ? 90 : 30
  const daysLeft = Math.max(0, Math.ceil((renewal - today) / (1000 * 60 * 60 * 24)))
  return Math.min(100, Math.max(0, Math.round(((cycleDays - daysLeft) / cycleDays) * 100)))
}

export default function SubscriptionCards() {
  const { subscriptions, refreshData } = useUser()

  const handleDelete = async (id) => {
    const ok = await deleteSubscription(id)
    if (ok) await refreshData()
  }

  if (subscriptions.length === 0) {
    return <p className="text-sm text-gray-400 px-6 py-4">No subscriptions yet.</p>
  }

  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {subscriptions.map((sub, i) => {
        const colors = PALETTE[i % PALETTE.length]
        const days = daysUntil(sub.renewal_date)
        const progress = cycleProgress(sub.renewal_date, sub.billing_cycle)
        const renewLabel = sub.renewal_date
          ? new Date(sub.renewal_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
          : "—"
        const periodLabel = sub.billing_cycle === "yearly" ? "/year" : sub.billing_cycle === "quarterly" ? "/quarter" : "/month"

        let badgeBg = "bg-gray-100", badgeText = "text-gray-500"
        if (days !== null && days <= 1)      { badgeBg = "bg-red-100";   badgeText = "text-red-600"   }
        else if (days !== null && days <= 5) { badgeBg = "bg-amber-100"; badgeText = "text-amber-600" }
        else if (days !== null)              { badgeBg = "bg-gray-100";  badgeText = "text-gray-500"  }

        return (
          <div key={sub.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium flex-shrink-0 ${colors.avatarBg} ${colors.avatarText}`}>
                  {sub.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">{sub.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub.category}</p>
                </div>
              </div>
              {days !== null && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeBg} ${badgeText}`}>
                  {days === 0 ? "Today" : days === 1 ? "1 day" : `${days} days`}
                </span>
              )}
            </div>

            {/* Amount */}
            <p className="mb-3">
              <span className="text-2xl font-medium text-gray-900">
                ₹{Number(sub.amount).toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-400 ml-1">{periodLabel}</span>
            </p>

            {/* Progress bar */}
            <div className="h-1 bg-gray-100 rounded-full mb-3 overflow-hidden">
              <div className={`h-full rounded-full ${colors.barColor}`} style={{ width: `${progress}%` }} />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Renews {renewLabel}</span>
              <Trash2
                size={15}
                className="cursor-pointer text-gray-400 hover:text-red-500"
                onClick={() => handleDelete(sub.id)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}