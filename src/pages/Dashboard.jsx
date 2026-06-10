import MonthlyExpenseTrend from "../components/layouts/MonthlyChart.jsx"
import RecentActivity from "../components/layouts/RecentActivity.jsx"
import UpcomingRenewals from "../components/layouts/RenewalsData.jsx"
import { SectionTop } from "../components/layouts/SectionTop"
import { StatCard } from "../components/layouts/StatCard.jsx"
import { useUser } from "../context/UserContext.jsx"
import { HandCoins,Landmark,Podcast,Repeat } from "lucide-react"

export const Dashboard = () => {
  const { profile, expenses, subscriptions, dataLoading } = useUser();

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalSubscriptions = subscriptions.reduce((sum, s) => sum + Number(s.amount), 0);
  const monthlySpend = totalExpenses + totalSubscriptions;

  const today = new Date();
  const in7Days = new Date(today);
  in7Days.setDate(today.getDate() + 7);
  const upcomingRenewals = subscriptions.filter(s => {
    if (!s.renewal_date) return false;
    const d = new Date(s.renewal_date);
    return d >= today && d <= in7Days;
  });

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white">
        <SectionTop name={`Dashboard${profile ? ` · ${profile.first_name}` : ""}`} />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-3">
        {dataLoading ? (
          <p className="text-sm text-gray-400 px-2">Loading your data…</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              <StatCard
                title="Monthly Spend"
                value={`₹${monthlySpend.toLocaleString("en-IN")}`}
                subtitle="Expenses + Subscriptions"
              >
                <HandCoins color="green" />
              </StatCard>
              <StatCard
                title="Total Expenses"
                value={`₹${totalExpenses.toLocaleString("en-IN")}`}
                subtitle={`${expenses.length} transaction${expenses.length !== 1 ? "s" : ""}`}
              >
                <Landmark color="gray" />
              </StatCard>
              <StatCard
                title="Subscriptions"
                value={`₹${totalSubscriptions.toLocaleString("en-IN")}`}
                subtitle={`${subscriptions.length} active`}
              >
                <Podcast color="black" />
              </StatCard>
              <StatCard
                title="Renewals This Week"
                value={upcomingRenewals.length}
                subtitle={upcomingRenewals.length ? upcomingRenewals.map(s => s.name).join(", ") : "None due soon"}
              >
                <Repeat color="gray" />
              </StatCard>
            </div>

            <div className="flex flex-col xl:flex-row gap-2 mt-4">
              <MonthlyExpenseTrend />
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mt-4">
              <UpcomingRenewals />
              <RecentActivity />
            </div>
          </>
        )}
      </div>
    </div>
  );
};