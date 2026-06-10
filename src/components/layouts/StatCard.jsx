import { Bot,Trash2 } from "lucide-react";
import { Toggle } from "../../pages/Settings";
import { Button } from "../common/Button";
import { useUser } from "../../context/UserContext";

export const StatCard = ({ title, value, subtitle ,children}) => {
  return (
    <div className="stat-card w-full">
      <div className="flex-bw-ic">
        <p className="text-green-dark font-display">{title}</p>
        {children}
      </div>

      <h2 className="stat-value">{value}</h2>

      <p className="stat-subtitle">{subtitle}</p>
    </div>
  );
};

export const AlertCard = ({description}) => {
  return(
    <>
      <div className="m-4 px-5 py-2 flex-ic gap-2 w-1/2 bg-amber-l border-1 border-amber rounded-sm">
          <input type="checkbox" name="check" />
          <p>{description}</p>
      </div>
    </>
  )
}

export const TransactionCard = ({ name, category, time, amount, id }) => {
  const { refreshData } = useUser()

  const handleDelete = async () => {
    const ok = await deleteExpense(id)
    if (ok) await refreshData()
  }

  return (
    <div className="flex-bw-ic bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm w-80">
      {/* Left: Icon + Info */}
      <div className="flex-ic gap-3">
        <div>
          <p className="text-sm font-medium text-gray-800 leading-tight">{name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{category} · {time}</p>
        </div>
      </div>

      {/* Right: Amount + delete */}
      <div className="flex flex-col items-end gap-1.5 ml-4">
        <span className="text-sm font-semibold text-gray-900">{amount}</span>
        <Trash2
          size={15}
          className="cursor-pointer text-gray-400 hover:text-red-500"
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

export const ProfilCard = ({profile}) => {
  return(
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">Profile</p>
          </div>
          <div className="px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-medium text-emerald-800 flex-shrink-0">
              {profile?.first_name.charAt(0)}{profile?.last_name.charAt(0)}
              </div>
              <div>
              <p className="text-sm font-medium text-gray-900">{profile?.first_name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{profile?.email}</p>
              </div>
          </div>
          </div>
        </div>
    </>
  )
}

export const SettingsCard = ({renewalReminders,setRenewalReminders,emailNotifications,setEmailNotifications,logout}) => {
  return(
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">Preferences</p>
              <div className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3">
                  <div>
                      <p className="text-sm font-medium text-gray-800">Renewal Reminders</p>
                      <p className="text-xs text-gray-400 mt-0.5">Get notified before subscriptions renew</p>
                  </div>
                  </div>
                  <Toggle enabled={renewalReminders} onToggle={() => setRenewalReminders(!renewalReminders)} />
              </div>
      
              {/* Email Notifications */}
              <div className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3">
                  <div>
                      <p className="text-sm font-medium text-gray-800">Email Notifications</p>
                      <p className="text-xs text-gray-400 mt-0.5">Weekly spending summary via email</p>
                  </div>
                  </div>
                  <Toggle enabled={emailNotifications} onToggle={() => setEmailNotifications(!emailNotifications)} />
              </div>

              <div className="flex self-end w-full">
                <Button varient="navLinkButtn" onClick={logout}>
                    Log out
                </Button>
              </div>
          </div>
      </div>
    </>
  )
}
