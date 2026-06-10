export default function BudgetForecastCard({
  title, icon, iconBg, iconColor,
  badgeColor, badgeLabel,
  forecast, spent, budget,
  description, tiles = [],
}) {
  const progress = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0

  const Icon = () => {
    if (icon === "bell") return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    )
    if (icon === "chart") return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    )
    if (icon === "trend") return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    )
    // default: clock
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
      </svg>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon />
        </div>
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">{title}</span>
      </div>

      {/* Amount */}
      <p className="text-3xl font-semibold text-gray-900 mb-2 leading-none">
        ₹{Number(forecast).toLocaleString("en-IN")}
      </p>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed mb-4">{description}</p>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Spent so far</span>
          <span>₹{Number(spent).toLocaleString("en-IN")} / ₹{Number(budget).toLocaleString("en-IN")}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${progress >= 90 ? "bg-red-400" : progress >= 70 ? "bg-amber-400" : "bg-emerald-400"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Category tiles */}
      {tiles.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {tiles.map(cat => (
            <div key={cat.label} className="bg-gray-50 rounded-xl px-3 py-2.5">
              <p className="text-xs text-gray-400 mb-0.5">{cat.label}</p>
              <p className="text-sm font-semibold text-gray-800">{cat.amount}</p>
            </div>
          ))}
        </div>
      )}

      {/* Badge */}
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${badgeColor}`}>
        {badgeLabel}
      </span>
    </div>
  )
}