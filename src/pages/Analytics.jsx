import { SectionTop } from "../components/layouts/SectionTop"
import { StatCard } from "../components/layouts/StatCard"
import RoundChart from "../components/layouts/RoundChart"
import BarChart from "../components/layouts/BarChart"
import { useUser } from "../context/UserContext"

export const Analytics = () => {
  const { expenses, subscriptions } = useUser()

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const totalSubs = subscriptions.reduce((sum, s) => sum + Number(s.amount), 0)
  const totalSpend = totalExpenses + totalSubs

  // Highest single expense
  const maxExpense = expenses.length
    ? expenses.reduce((max, e) => Number(e.amount) > Number(max.amount) ? e : max, expenses[0])
    : null

  // Most used category
  const categoryCounts = {}
  expenses.forEach(e => { categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1 })
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]

  // Average expense
  const avgExpense = expenses.length ? Math.round(totalExpenses / expenses.length) : 0

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white">
        <SectionTop name="Analytics" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Spend"
            value={`₹${totalSpend.toLocaleString("en-IN")}`}
            subtitle="Expenses + Subscriptions"
          />
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses.toLocaleString("en-IN")}`}
            subtitle={`${expenses.length} transaction${expenses.length !== 1 ? "s" : ""}`}
          />
          <StatCard
            title="Avg per Expense"
            value={`₹${avgExpense.toLocaleString("en-IN")}`}
            subtitle={topCategory ? `Top: ${topCategory[0]}` : "No data yet"}
          />
          <StatCard
            title="Highest Expense"
            value={maxExpense ? `₹${Number(maxExpense.amount).toLocaleString("en-IN")}` : "—"}
            subtitle={maxExpense ? maxExpense.title : "No expenses yet"}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RoundChart />
          <BarChart />
        </div>
      </div>
    </div>
  )
}