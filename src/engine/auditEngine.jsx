import { TOOLS } from "../data/PricingData";

    const recommendations = {
        cursor: {
            business: {
            recommended: "pro",
            reason:
                "Small engineering teams usually don't need Cursor Business features.",
            },
            enterprise: {
            recommended: "business",
            reason:
                "Enterprise features are unnecessary for smaller teams.",
            },
        },

        github_copilot: {
            enterprise: {
            recommended: "business",
            reason:
                "GitHub Copilot Business provides similar coding assistance for most teams.",
            },
        },

        claude: {
            max: {
            recommended: "pro",
            reason:
                "Claude Max is expensive unless heavy daily token usage is required.",
            },

            team: {
            recommended: "pro",
            reason:
                "Small teams can share Claude Pro efficiently.",
            },
        },

        chatgpt: {
            enterprise: {
            recommended: "team",
            reason:
                "ChatGPT Team is sufficient for most startups under 50 employees.",
            },
        },

        gemini: {
            ultra: {
            recommended: "pro",
            reason:
                "Gemini Ultra is rarely cost efficient for general workflows.",
            },
        },

        windsurf: {
            teams: {
            recommended: "pro",
            reason:
                "Windsurf Teams is unnecessary for small developer teams.",
            },
        },
};

export const generateAudit = (entries) => {
    const activeTools = entries.filter((tool) => tool.active)

    const results = [];
    let totalMonthlySavings = 0;
    for(const item of activeTools) {
        const tool = TOOLS.find((t) => t.id === item.toolId);

        if (!tool) continue;
        const currentPlan = tool.plans.find(
            (p) => p.id === item.planId
        );

        if (!currentPlan) continue;

        const currentMonthlyCost = currentPlan.pricePerSeat * item.seats;
        let recommendedPlan = currentPlan;
        let reason = "Your current setup is already optimized.";

        const toolRecommendation = recommendations[item.toolId];
        if ( toolRecommendation && toolRecommendation[item.planId]) {
        const recommendation =
            toolRecommendation[item.planId];

        const foundPlan = tool.plans.find(
            (p) => p.id === recommendation.recommended
        );

        if (foundPlan) {
            recommendedPlan = foundPlan;
            reason = recommendation.reason;
        }
        }

        const recommendedMonthlyCost = recommendedPlan.pricePerSeat * item.seats;

        const savings = currentMonthlyCost - recommendedMonthlyCost;

        totalMonthlySavings += savings;

        results.push({
            toolName: tool.name,
            toolInitials: tool.initials,
            toolColor: tool.color,

            currentPlan: currentPlan.label,
            recommendedPlan: recommendedPlan.label,

            seats: item.seats,

            currentMonthlyCost,
            recommendedMonthlyCost,

            savings,
            annualSavings: savings * 12,

            reason,
            });
        }

        return {
            results,
            totalMonthlySavings,
            totalAnnualSavings: totalMonthlySavings * 12,
        };
}
