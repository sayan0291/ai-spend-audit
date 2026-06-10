import { useUser } from "../../context/UserContext.jsx";

function BoxIcon({ bg, color }) {
  return (
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${color}`} fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function RecentActivity() {
  const { expenses, subscriptions } = useUser();

  const activities = [
    ...expenses.map(e => ({
      id: `exp-${e.id}`,
      title: e.title,
      subtitle: e.category,
      date: e.created_at,
      amount: `₹${Number(e.amount).toLocaleString("en-IN")}`,
      tag: "Expense",
      tagColor: "bg-amber-100 text-amber-600",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-300",
    })),
    ...subscriptions.map(s => ({
      id: `sub-${s.id}`,
      title: s.name,
      subtitle: s.category,
      date: s.created_at,
      amount: `₹${Number(s.amount).toLocaleString("en-IN")}`,
      tag: "Sub",
      tagColor: "bg-emerald-100 text-emerald-700",
      iconBg: "bg-teal-50",
      iconColor: "text-teal-400",
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 w-80">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
      </div>
      {activities.length === 0 ? (
        <p className="text-sm text-gray-400">No activity yet.</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BoxIcon bg={item.iconBg} color={item.iconColor} />
                <div>
                  <p className="text-sm font-medium text-gray-800 leading-tight">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.subtitle} · {formatDate(item.date)}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 ml-4">
                <span className="text-sm font-semibold text-gray-900">{item.amount}</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg whitespace-nowrap ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}