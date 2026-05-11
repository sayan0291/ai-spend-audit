import { Button } from "../shared/Button.jsx"
import { Play } from "lucide-react";

export const ToolCard = ({
                    tool,
                    entry,
                    toggleTool,
                    updateEntry,
                    }) => {

                    return (
                        <div className="tool-row">
                        <div className="tool-row-header">
                            <div className="tool-icon" style={{ backgroundColor: tool.color }}>
                            {tool.initials}
                            </div>

                            <div className="tool-name-wrap">
                                <div className="tool-name">{tool.name}</div>
                            </div>

                            <input
                                type="checkbox"
                                checked={entry.active}
                                onChange={() => toggleTool(tool.id)}
                                className="toggle toggle-sm rounded-md"
                            />
                        </div>

                        {entry.active && (
                            <div className="tool-fields">
                            <select
                                className="fields"
                                value={entry.planId}
                                onChange={(e) =>
                                    updateEntry(tool.id, "planId", e.target.value)
                                } >
                                    {tool.plans.map((plan) => (
                                    <option key={plan.id} value={plan.id}>
                                        {plan.label}
                                    </option>
                                    ))}
                            </select>

                            <input
                                type="number"
                                min="1"
                                value={entry.seats}
                                onChange={(e) =>
                                    updateEntry(tool.id, "seats", Number(e.target.value))
                                }
                                placeholder="Seats"
                                className="fields"
                            />

                            <input
                                type="number"
                                min="1"
                                value={entry.monthlyspend}
                                onChange={(e) =>
                                    updateEntry(tool.id, "monthlyspend", Number(e.target.value))
                                }
                                placeholder="$ / month"
                                className="fields"
                            />
                            </div>
                        )}
                        </div>
                    );
};