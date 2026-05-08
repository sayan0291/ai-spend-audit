import { useState } from "react"

export const ToolCard = ({
    id,
    toolName = "Cursor",
    planType = "Business",
    seats = 8,
    costPerMonth = 320,
    initials = "Cu"
}) => {
    const [isActive, setIsActive] = useState(true)
    const [plan, setPlan] = useState(planType)
    const [seatCount, setSeatCount] = useState(seats)
    const [monthlyCost, setMonthlyCost] = useState(costPerMonth)

    const planOptions = ["Business", "Pro", "Hobby", "Enterprise"]

    return (
        <div className={`border-1 transition-all duration-200 overflow-hidden ${
            isActive
                ? "shadow-[0_0_0_3px_rgba(29,158,117,0.08)]"
                : ""
        }`} style={{
            borderColor: isActive ? 'var(--color-green)' : 'var(--color-border)',
            borderRadius: 'var(--radius-md)'
        }}>
            {/* Header */}
            <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-3 transition-colors"
                onClick={() => setIsActive(!isActive)}
                style={{
                    background: 'var(--color-surface-3)',
                    borderBottom: isActive ? '1px solid var(--color-border)' : 'none'
                }}
            >
                {/* Icon */}
                <div
                    className="w-7 h-7 flex items-center justify-center text-xs font-semibold flex-shrink-0"
                    style={{
                        background: isActive ? '#000' : 'var(--color-border)',
                        color: isActive ? '#fff' : 'var(--color-ink-4)',
                        borderRadius: '7px'
                    }}
                >
                    {initials}
                </div>

                {/* Name & Plan Info */}
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold" style={{color: 'var(--color-ink)'}}>
                        {toolName}
                    </div>
                    <div className="text-xs" style={{color: 'var(--color-ink-4)'}}>
                        {plan} · {seatCount} seats
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsActive(!isActive)
                    }}
                    className="relative w-9 h-5 rounded-full transition-colors flex-shrink-0 focus:outline-none"
                    style={{
                        background: isActive ? 'var(--color-green)' : 'var(--color-border-2)'
                    }}
                    aria-label="Toggle tool"
                >
                    <span
                        className={`absolute top-0.5 w-4 h-4 bg-surface rounded-full transition-all duration-200 ${
                            isActive ? "translate-x-4" : "translate-x-0.5"
                        }`}
                        style={{boxShadow: 'var(--shadow-sm)'}}
                    />
                </button>
            </div>

            {/* Fields (Collapsible) */}
            {isActive && (
                <div className="grid grid-cols-3 gap-3 p-4" style={{background: 'var(--color-surface-2)'}}>
                    {/* Plan Dropdown */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wide" style={{color: 'var(--color-ink-4)'}}>
                            Plan
                        </label>
                        <select
                            value={plan}
                            onChange={(e) => setPlan(e.target.value)}
                            className="px-2.5 py-1.5 text-xs border-1 transition-colors focus:outline-none"
                            style={{
                                borderColor: 'var(--color-border)',
                                background: 'var(--color-surface)',
                                color: 'var(--color-ink)',
                                borderRadius: 'var(--radius-sm)',
                                fontFamily: 'var(--font-body)'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-green)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        >
                            {planOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Seats Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wide" style={{color: 'var(--color-ink-4)'}}>
                            Seats
                        </label>
                        <input
                            type="number"
                            value={seatCount}
                            onChange={(e) => setSeatCount(Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                            className="px-2.5 py-1.5 text-xs border-1 transition-colors focus:outline-none"
                            style={{
                                borderColor: 'var(--color-border)',
                                background: 'var(--color-surface)',
                                color: 'var(--color-ink)',
                                borderRadius: 'var(--radius-sm)',
                                fontFamily: 'var(--font-mono)'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-green)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </div>

                    {/* Cost Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wide" style={{color: 'var(--color-ink-4)'}}>
                            $/month
                        </label>
                        <input
                            type="number"
                            value={monthlyCost}
                            onChange={(e) => setMonthlyCost(Math.max(0, parseInt(e.target.value) || 0))}
                            min="0"
                            className="px-2.5 py-1.5 text-xs border-1 transition-colors focus:outline-none"
                            style={{
                                borderColor: 'var(--color-border)',
                                background: 'var(--color-surface)',
                                color: 'var(--color-ink)',
                                borderRadius: 'var(--radius-sm)',
                                fontFamily: 'var(--font-mono)'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-green)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
