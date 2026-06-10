import { useEffect, useRef, useMemo } from "react"
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js"
import { useUser } from "../../context/UserContext"

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const COLORS = {
  Food:     "#f59e0b",
  Shopping: "#8b5cf6",
  Travel:   "#10b981",
  Bills:    "#ef4444",
  Other:    "#3b82f6",
}

export default function RoundChart() {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)
  const { expenses } = useUser()

  // Group expenses by category and sum amounts
  const categories = useMemo(() => {
    const map = {}
    expenses.forEach(e => {
      const cat = e.category || "Other"
      map[cat] = (map[cat] || 0) + Number(e.amount)
    })
    const total = Object.values(map).reduce((a, b) => a + b, 0)
    return Object.entries(map).map(([label, amount]) => ({
      label,
      amount,
      pct: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: COLORS[label] || "#6b7280",
    })).sort((a, b) => b.amount - a.amount)
  }, [expenses])

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null }
    if (categories.length === 0) return

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: categories.map(c => c.label),
        datasets: [{
          data: categories.map(c => c.amount),
          backgroundColor: categories.map(c => c.color),
          borderWidth: 3,
          borderColor: "#fff",
          hoverOffset: 6,
        }],
      },
      options: {
        cutout: "68%",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            titleColor: "#6b7280",
            bodyColor: "#111827",
            bodyFont: { weight: "600" },
            padding: 10,
            cornerRadius: 10,
            displayColors: true,
            callbacks: {
              label: (ctx) => ` ₹${ctx.parsed.toLocaleString("en-IN")} (${categories[ctx.dataIndex].pct}%)`,
            },
          },
        },
      },
    })

    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null } }
  }, [categories])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Spend by Category</h2>

      {categories.length === 0 ? (
        <p className="text-sm text-gray-400">No expense data yet.</p>
      ) : (
        <div className="flex items-center gap-5">
          <div className="w-32 h-32 flex-shrink-0">
            <canvas ref={canvasRef} />
          </div>
          <ul className="space-y-2 flex-1">
            {categories.map(c => (
              <li key={c.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-gray-600">{c.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹{c.amount.toLocaleString("en-IN")}</span>
                  <span className="text-xs font-semibold text-gray-800 w-8 text-right">{c.pct}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}