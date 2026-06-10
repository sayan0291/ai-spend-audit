import { useEffect, useRef, useMemo } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  Filler,
  Tooltip,
} from "chart.js";
import { useUser } from "../../context/UserContext";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, BarController, BarElement, Filler, Tooltip);

// Build last 6 months labels + expense totals from real data
function buildMonthlyData(expenses) {
  const now = new Date();
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleString("en-IN", { month: "short" }),
      year: d.getFullYear(),
      month: d.getMonth(),
      total: 0,
    });
  }

  expenses.forEach((e) => {
    const d = new Date(e.created_at);
    const match = months.find(m => m.year === d.getFullYear() && m.month === d.getMonth());
    if (match) match.total += Number(e.amount);
  });

  return months;
}

export default function MonthlyExpenseTrend() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const { expenses } = useUser();

  const monthlyData = useMemo(() => buildMonthlyData(expenses), [expenses]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvasRef.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, "rgba(16,185,129,0.22)");
    gradient.addColorStop(1, "rgba(16,185,129,0.02)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthlyData.map(m => m.label),
        datasets: [{
          data: monthlyData.map(m => m.total),
          borderColor: "#10b981",
          borderWidth: 2.5,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#10b981",
          pointRadius: 4,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#10b981",
          pointHoverBorderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            titleColor: "#9ca3af",
            bodyColor: "#111827",
            bodyFont: { weight: "bold", size: 14 },
            padding: 12,
            cornerRadius: 12,
            displayColors: false,
            callbacks: {
              label: (item) => `₹${item.parsed.y.toLocaleString("en-IN")}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: "black", font: { size: 12 } },
          },
          y: {
            grid: { color: "#f0f0f0" },
            border: { display: false },
            beginAtZero: true,
            ticks: {
              color: "#9ca3af",
              font: { size: 11 },
              callback: (v) => v === 0 ? "₹0" : `₹${(v / 1000).toFixed(0)}k`,
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [monthlyData]);

  const totalThisMonth = monthlyData[monthlyData.length - 1]?.total ?? 0;
  const totalLastMonth = monthlyData[monthlyData.length - 2]?.total ?? 0;
  const diff = totalThisMonth - totalLastMonth;
  const pct = totalLastMonth > 0 ? Math.round((diff / totalLastMonth) * 100) : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 w-full">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-semibold text-gray-900">Monthly Expense Trend</h2>
        {pct !== null && (
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diff <= 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
            {diff <= 0 ? "▼" : "▲"} {Math.abs(pct)}% vs last month
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-4">
        This month: <span className="font-semibold text-gray-700">₹{totalThisMonth.toLocaleString("en-IN")}</span>
      </p>
      <div className="h-52">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}