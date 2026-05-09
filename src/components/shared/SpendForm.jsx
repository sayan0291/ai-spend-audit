import { useState } from "react"
import { ToolCard } from "./ToolCard"
import { TOOLS } from "../../data/PricingData"

export const SpendForm = () => {
    const [entries, setEntries] = useState(
        TOOLS.map((tool) =>  ({
            toolId: tool.id,
            active: false,
            planId: tool.plans[0].id,
            seats: 1,
        }))
    )

    function toogleTool(id) {
        setTools((prev) =>
                prev.map((item) => item.toolId === id ? {...item ,active: !item.active } : item
            )
        )
    }

    return(
        <div>
            <div className="left-card">
                <div className="left-card-header">
                    <span className="left-card-title">Your AI tools</span>
                    <span className="toggle-add-title">Toggle to add</span>
                </div>
                <div className="left-card-body">
                    <div className="tool-list">
                        {TOOLS.map((tool) => {
                            const entry = entries.find((e) => 
                                e.toolId === tool.id
                            );
                        
                        return (
                            <ToolCard
                                key={tool.id}
                                tool={tool}
                                entry={entry}
                                toogleTool={toogleTool}
                            />
                        );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}