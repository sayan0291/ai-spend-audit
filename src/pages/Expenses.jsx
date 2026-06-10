import { SectionTop } from "../components/layouts/SectionTop"
import { Button } from "../components/common/Button"
import { AddExpenseCard } from "../components/layouts/AddExpenseCard"
import { useState } from "react"
import { TransactionCard } from "../components/layouts/StatCard"
import { useUser } from "../context/UserContext"

export const Expenses = () => {
  const [open, setOpen] = useState(false)
  const { expenses } = useUser()

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0)

  function formatDate(dateStr) {
    if (!dateStr) return ""
    const d = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === today.toDateString()) return "Today"
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday"
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  }

  const CATEGORY_COLORS = {
    Food:     { bg: "bg-amber-50",  icon: "text-amber-400"  },
    Shopping: { bg: "bg-blue-50",   icon: "text-blue-400"   },
    Travel:   { bg: "bg-purple-50", icon: "text-purple-400" },
    Bills:    { bg: "bg-red-50",    icon: "text-red-400"    },
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white">
        <SectionTop name="Expenses" />
      </div>
      <div className="flex-bw-ic w-4/5 px-6 py-2">
        <h4 className="flex-jc-ic">Total <h5>₹{total.toLocaleString("en-IN")}</h5></h4>
        <Button varient="shareBtn" onClick={() => setOpen(!open)}>
          add expenses
        </Button>
        {open ? <AddExpenseCard setOpen={setOpen} open={open} /> : ""}
      </div>

      {expenses.length === 0 ? (
        <p className="text-sm text-gray-400 px-6 py-4">No expenses yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-2">
          {expenses.map((expense) => {
            const colors = CATEGORY_COLORS[expense.category] || { bg: "bg-gray-50", icon: "text-gray-400" }
            return (
              <TransactionCard
                key={expense.id}
                id={expense.id}
                name={expense.title}
                category={expense.category}
                time={formatDate(expense.created_at)}
                amount={`₹${Number(expense.amount).toLocaleString("en-IN")}`}
                iconBg={colors.bg}
                iconcolor={colors.icon}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}