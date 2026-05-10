import { useState } from "react"
import { Button } from "../shared/Button.jsx"
import { Play } from "lucide-react";

export const ToolCard = ({
    tool,
    entry,
    toggleTool,
}) => {
    const [isChecked, setIsChecked] = useState(true);

    console.log(tool.color)

    return(
        <>
            <div className="tool-row">
                <div className="tool-row-header">
                    <div className="tool-icon" style={{backgroundColor: tool.color}}>{tool.initials}</div>
                    <div className="tool-name-wrap">
                        <div className="tool-name">{tool.name}</div>
                    </div>
                    <input type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="toggle toggle-sm rounded-md bg-border-2 border-none checked:bg-green text-white"
                    />
                </div>
                    {
                        isChecked && (
                            <div className="tool-fields">
                                <select className="fields">
                                    {tool.plans.map((plan) => (
                                    <option key={plan.id}>
                                        {plan.label}
                                    </option>
                                    ))}
                                </select>

                                <input
                                    type="number"
                                    placeholder="Seats"
                                    className="fields"
                                />

                                <input
                                    type="number"
                                    placeholder="$ / month"
                                    className="fields"
                                />
                            </div>
                        )
                    }
            </div>
        </>
    )
}
