import { useState } from "react"

export const ToolCard = ({
    tool,
    entry,
    toggleTool,
}) => {
    const [isChecked, setIsChecked] = useState(true);

    return(
        <>
            <div className="tool-row">
                <div className="tool-row-header">
                    <div className="tool-icon">{tool.initials}</div>
                    <div className="tool-name-wrap">
                        <div className="tool-name">{tool.name}</div>
                        <div className="tool-plan">Pro · 3 seats</div>
                    </div>
                    <input type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="toggle toggle-sm rounded-md bg-border-2 border-none checked:bg-green text-white"
                    />
                </div>
            </div>

            {
                isChecked && (
                    <div className="grid grid-cols-3 gap-3 border-t bg-gray-50 p-4">
                        <select className="rounded-lg border p-2">
                            {tool.plans.map((plan) => (
                            <option key={plan.id}>
                                {plan.label}
                            </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            placeholder="Seats"
                            className="rounded-lg border p-2"
                        />

                        <input
                            type="number"
                            placeholder="$ / month"
                            className="rounded-lg border p-2"
                        />
                    </div>
                )
            }
        </>
    )
}
