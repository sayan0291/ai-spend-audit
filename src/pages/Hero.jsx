export const Hero = () => {
    return(
        <div className="flex-jc-ic min-h-screen h-full w-screen">
            <div className="hero">
                <div className="hero-badge">
                    <div className="hero-badge-dot"></div>
                    Free AI spend audit — no signup needed
                </div>
                <h1>Are you <em>overpaying</em><br/>for AI tools?</h1>
                <div className="p-2">
                    <p>Enter your subscriptions, get an instant audit. See exactly where you're losing money and what to do about it.</p>
                </div>
                <div className="hero-stats">
                    <div className="hero-stat">
                    <div className="hero-stat-num">$840</div>
                    <div className="hero-stat-lbl">avg savings found / mo</div>
                    </div>
                    <div className="hero-stat">
                    <div className="hero-stat-num">2 min</div>
                    <div className="hero-stat-lbl">to complete audit</div>
                    </div>
                    <div className="hero-stat">
                    <div className="hero-stat-num">1,200+</div>
                    <div className="hero-stat-lbl">audits run this month</div>
                    </div>
                </div>
                </div>
        </div>
    )
}