import { useState } from "react"
import { ToolCard } from "./ToolCard"

export const SpendForm = () => {
    const [tools, setTools] = useState([
        { id: 1, name: "Cursor", plan: "Business", seats: 8, cost: 320, initials: "Cu" },
        { id: 2, name: "ChatGPT", plan: "Pro", seats: 5, cost: 200, initials: "CG" },
        { id: 3, name: "Claude", plan: "Business", seats: 12, cost: 480, initials: "Cl" },
    ])

    return(
        <div>
            <div className="left-card">
                <div className="left-card-header">
                    <span className="left-card-title">Your AI tools</span>
                    <span className="toggle-add-title">Toggle to add</span>
                </div>
                <div className="left-card-body">
                    <div className="tool-list">
                        {tools.map(tool => (
                            <ToolCard
                                key={tool.id}
                                id={tool.id}
                                toolName={tool.name}
                                planType={tool.plan}
                                seats={tool.seats}
                                costPerMonth={tool.cost}
                                initials={tool.initials}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}