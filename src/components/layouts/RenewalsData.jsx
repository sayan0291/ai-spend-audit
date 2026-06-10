import { useUser } from "../../context/UserContext.jsx";

function daysBadge(days) {
  if (days <= 1) return "bg-red-100 text-red-600";
  if (days <= 5) return "bg-amber-100 text-amber-600";
  return "bg-gray-100 text-gray-500";
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const renewal = new Date(dateStr);
  renewal.setHours(0, 0, 0, 0);
  return Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
}

const COLORS = [
  "bg-red-100 text-red-500",
  "bg-emerald-100 text-emerald-500",
  "bg-blue-100 text-blue-500",
  "bg-amber-100 text-amber-500",
  "bg-purple-100 text-purple-500",
];

export default function UpcomingRenewals() {
  const { subscriptions } = useUser();

  const upcoming = subscriptions
    .filter(s => s.renewal_date && daysUntil(s.renewal_date) >= 0)
    .sort((a, b) => new Date(a.renewal_date) - new Date(b.renewal_date))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 w-80">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">Upcoming Renewals</h2>
      </div>
      {upcoming.length === 0 ? (
        <p className="text-sm text-gray-400">No upcoming renewals.</p>
      ) : (
        <ul className="space-y-4">
          {upcoming.map((item, i) => {
            const days = daysUntil(item.renewal_date);
            const color = COLORS[i % COLORS.length];
            const dateLabel = new Date(item.renewal_date).toLocaleDateString("en-IN", {
              day: "numeric", month: "short"
            });
            return (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold flex-shrink-0 ${color}`}>
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 leading-tight">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.category} · {dateLabel}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 ml-4">
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{Number(item.amount).toLocaleString("en-IN")}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${daysBadge(days)}`}>
                    {days === 0 ? "Today" : days === 1 ? "1 day" : `${days} days`}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}