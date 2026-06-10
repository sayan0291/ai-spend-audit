import { SectionTop } from "../components/layouts/SectionTop"
import BudgetForecastCard from "../components/layouts/BudgetForecastCard"
import { useUser } from "../context/UserContext"

export const SmartInsights = () => {
  const { expenses, subscriptions } = useUser()

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const totalSubs = subscriptions.reduce((sum, s) => sum + Number(s.amount), 0)

  // Group expenses by category
  const byCategory = {}
  expenses.forEach(e => {
    const cat = e.category || "Other"
    byCategory[cat] = (byCategory[cat] || 0) + Number(e.amount)
  })
  const sortedCats = Object.entries(byCategory).sort((a, b) => b[1] - a[1])

  // This month vs last month
  const now = new Date()
  const thisMonth = expenses.filter(e => {
    const d = new Date(e.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonth = expenses.filter(e => {
    const d = new Date(e.created_at)
    return d.getMonth() === lastMonthDate.getMonth() && d.getFullYear() === lastMonthDate.getFullYear()
  })

  const thisMonthTotal = thisMonth.reduce((sum, e) => sum + Number(e.amount), 0)
  const lastMonthTotal = lastMonth.reduce((sum, e) => sum + Number(e.amount), 0)
  const momDiff = thisMonthTotal - lastMonthTotal
  const momPct = lastMonthTotal > 0 ? Math.round((Math.abs(momDiff) / lastMonthTotal) * 100) : null

  // Upcoming renewal cost in next 30 days
  const in30 = new Date(); in30.setDate(now.getDate() + 30)
  const upcomingSubs = subscriptions.filter(s => {
    if (!s.renewal_date) return false
    const d = new Date(s.renewal_date)
    return d >= now && d <= in30
  })
  const upcomingCost = upcomingSubs.reduce((sum, s) => sum + Number(s.amount), 0)

  // Avg daily spend this month
  const dayOfMonth = now.getDate()
  const avgDaily = dayOfMonth > 0 ? Math.round(thisMonthTotal / dayOfMonth) : 0
  const projectedMonthEnd = avgDaily * new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white">
        <SectionTop name="Smart Insights" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Budget Forecast */}
          <BudgetForecastCard
            title="Budget Forecast"
            icon="clock"
            iconBg="bg-amber-100"
            iconColor="text-amber-500"
            badgeColor="bg-amber-100 text-amber-700"
            badgeLabel="Forecast"
            forecast={projectedMonthEnd}
            spent={thisMonthTotal}
            budget={projectedMonthEnd}
            description={
              momPct !== null
                ? `At your current pace, this month will reach ₹${projectedMonthEnd.toLocaleString("en-IN")} — ${momPct}% ${momDiff >= 0 ? "more" : "less"} than last month.`
                : `You've spent ₹${thisMonthTotal.toLocaleString("en-IN")} this month so far.`
            }
            tiles={sortedCats.slice(0, 2).map(([label, amount]) => ({ label, amount: `₹${amount.toLocaleString("en-IN")}` }))}
          />

          {/* Subscription Renewal Alert */}
          <BudgetForecastCard
            title="Upcoming Renewals"
            icon="bell"
            iconBg="bg-blue-100"
            iconColor="text-blue-500"
            badgeColor="bg-blue-100 text-blue-700"
            badgeLabel={`${upcomingSubs.length} renewing`}
            forecast={upcomingCost}
            spent={upcomingCost}
            budget={totalSubs || upcomingCost}
            description={
              upcomingSubs.length > 0
                ? `${upcomingSubs.length} subscription${upcomingSubs.length > 1 ? "s" : ""} renewing in the next 30 days totalling ₹${upcomingCost.toLocaleString("en-IN")}.`
                : "No subscriptions renewing in the next 30 days."
            }
            tiles={upcomingSubs.slice(0, 2).map(s => ({ label: s.name, amount: `₹${Number(s.amount).toLocaleString("en-IN")}` }))}
          />

          {/* Top Spending Category */}
          <BudgetForecastCard
            title="Top Spending Category"
            icon="chart"
            iconBg="bg-emerald-100"
            iconColor="text-emerald-500"
            badgeColor="bg-emerald-100 text-emerald-700"
            badgeLabel={sortedCats[0]?.[0] ?? "—"}
            forecast={sortedCats[0]?.[1] ?? 0}
            spent={sortedCats[0]?.[1] ?? 0}
            budget={totalExpenses || 1}
            description={
              sortedCats[0]
                ? `${sortedCats[0][0]} is your biggest expense category at ₹${sortedCats[0][1].toLocaleString("en-IN")}, making up ${Math.round((sortedCats[0][1] / totalExpenses) * 100)}% of total spending.`
                : "Add some expenses to see your top spending category."
            }
            tiles={sortedCats.slice(0, 2).map(([label, amount]) => ({ label, amount: `₹${amount.toLocaleString("en-IN")}` }))}
          />

          {/* Month-over-Month */}
          <BudgetForecastCard
            title="Month-over-Month"
            icon="trend"
            iconBg={momDiff <= 0 ? "bg-emerald-100" : "bg-red-100"}
            iconColor={momDiff <= 0 ? "text-emerald-500" : "text-red-500"}
            badgeColor={momDiff <= 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}
            badgeLabel={momPct !== null ? `${momDiff <= 0 ? "▼" : "▲"} ${momPct}%` : "No data"}
            forecast={thisMonthTotal}
            spent={thisMonthTotal}
            budget={lastMonthTotal || thisMonthTotal}
            description={
              momPct !== null
                ? `You spent ₹${thisMonthTotal.toLocaleString("en-IN")} this month vs ₹${lastMonthTotal.toLocaleString("en-IN")} last month — ${momPct}% ${momDiff >= 0 ? "increase" : "decrease"}.`
                : "Not enough data yet to compare months."
            }
            tiles={[
              { label: "This month", amount: `₹${thisMonthTotal.toLocaleString("en-IN")}` },
              { label: "Last month", amount: `₹${lastMonthTotal.toLocaleString("en-IN")}` },
            ]}
          />

        </div>
      </div>
    </div>
  )
}