import { useEffect, useRef, useMemo } from "react"
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js"
import { useUser } from "../../context/UserContext"

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip)

function buildMonthlyData(expenses) {
  const now = new Date()
  const months = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({ label: d.toLocaleString("en-IN", { month: "short" }), year: d.getFullYear(), month: d.getMonth(), total: 0 })
  }
  expenses.forEach(e => {
    const d = new Date(e.created_at)
    const match = months.find(m => m.year === d.getFullYear() && m.month === d.getMonth())
    if (match) match.total += Number(e.amount)
  })
  return months
}

export default function BarChart() {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)
  const { expenses } = useUser()

  const monthlyData = useMemo(() => buildMonthlyData(expenses), [expenses])

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null }

    const ctx = canvasRef.current.getContext("2d")
    const gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, "rgba(16,185,129,0.35)")
    gradient.addColorStop(1, "rgba(16,185,129,0.08)")

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthlyData.map(m => m.label),
        datasets: [{
          data: monthlyData.map(m => m.total),
          backgroundColor: gradient,
          borderColor: "#10b981",
          borderWidth: { top: 2, left: 0, right: 0, bottom: 0 },
          borderRadius: { topLeft: 6, topRight: 6 },
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            titleColor: "#9ca3af",
            bodyColor: "#111827",
            bodyFont: { weight: "600" },
            padding: 10,
            cornerRadius: 10,
            displayColors: false,
            callbacks: { label: (ctx) => `₹${ctx.parsed.y.toLocaleString("en-IN")}` },
          },
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { color: "#9ca3af", font: { size: 11 } } },
          y: {
            grid: { color: "#f3f4f6" },
            border: { display: false },
            beginAtZero: true,
            ticks: { color: "#9ca3af", font: { size: 11 }, callback: (v) => v === 0 ? "₹0" : `₹${(v / 1000).toFixed(0)}k` },
          },
        },
      },
    })

    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null } }
  }, [monthlyData])

  // Month-over-month insight
  const last = monthlyData[monthlyData.length - 1]?.total ?? 0
  const prev = monthlyData[monthlyData.length - 2]?.total ?? 0
  const diff = last - prev
  const pct = prev > 0 ? Math.round((Math.abs(diff) / prev) * 100) : null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-semibold text-gray-900">Monthly Comparison</h2>
        {pct !== null && (
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diff <= 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
            {diff <= 0 ? "▼" : "▲"} {pct}% vs last month
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-4">
        This month: <span className="font-semibold text-gray-700">₹{last.toLocaleString("en-IN")}</span>
      </p>
      <div className="h-44">
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}