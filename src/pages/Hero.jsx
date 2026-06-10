import { NavLink } from "react-router-dom"
import { Button } from "../components/common/Button"
import { Icon } from "../components/common/Icon"
import { Bell,ChartPie,Lightbulb,Download,TabletSmartphone,Shield } from "lucide-react"

export const Hero = () => {
    return(
        <div className="w-screen flex flex-col">
            <div className="hero-field h-[90vh] flex-jc">
                <div className="hero-badge">
                    <div className="hero-badge-dot animate-pulse"></div>
                    Free to use — no credit card needed
                </div>
                <h1 className="title-h1">Stop losing money on <br/><em>forgotten subscriptions</em></h1>
                <div>
                    <p>Track all your subscriptions and expenses in one place. Get renewal reminders, spending analytics, and smart insights — effortlessly.</p>
                </div>
                <div className="flex gap-2 py-3">
                    <Button varient="navButtn">
                        <NavLink to="/register">Get Started Free</NavLink>
                    </Button>
                    <Button varient="navLinkButtn">
                        <a href="#how-it-works">How it Works</a>
                    </Button>
                </div>
                <div className="hero-stats">
                    <div>
                        <div className="hero-badge-dot bg-amber"></div>
                        <p>Never miss renewals</p>
                    </div>
                    <div>
                        <div className="hero-badge-dot bg-ink"></div>
                        <p>Track monthly spending</p>
                    </div>
                    <div>
                        <div className="hero-badge-dot bg-violet"></div>
                        <p>Smart spending insights</p>
                    </div>
                    <div>
                        <div className="hero-badge-dot bg-purple"></div>
                        <p>Expense analytics</p>
                    </div>
                </div>
            </div>
            <div className="dash-preview">
                <div className="dash-label">
                    <div></div>
                    <p>dashboard preview</p>
                    <div></div>
                </div>
                <div className="dash-img">
                    <div className="bg-amber-light h-full">
                        <img src="dashpreview.png" alt="" />
                    </div>
                </div>
            </div>
            <div id="how-it-works" className="features-section">
                <h1 className="title-h1 text-[clamp(1.7rem,6vw,2.5rem)]">Built for <em className="text-amber font-body">people</em> who care <br/>
                                        about where their <em>money</em> goes
                </h1>
                <div className="features">
                    <div className="card">
                        <Icon varient="fetureIcon">
                            <Bell />
                        </Icon>
                        <div className="feature-title">Renewal Reminders</div>
                        <div className="feature-desc">Get notified before any subscription charges you. Never be caught off guard again.</div>
                    </div>
                    <div className="card">
                        <Icon varient="fetureIcon">
                            <ChartPie />
                        </Icon>
                        <div className="feature-title">Spending Analytics</div>
                        <div className="feature-desc">Visualize where your money goes with beautiful charts broken down by category.</div>
                    </div>
                    <div className="card">
                        <Icon varient="fetureIcon">
                            <Lightbulb />
                        </Icon>
                        <div className="feature-title">Smart Insights</div>
                        <div className="feature-desc">Automatically detects spending patterns and tells you how to cut unnecessary costs.</div>
                    </div>
                    <div className="card">
                        <Icon varient="fetureIcon">
                            <Download />
                        </Icon>
                        <div className="feature-title">PDF & CSV Reports</div>
                        <div className="feature-desc">Generate beautiful monthly reports for your records or share with anyone instantly.</div>
                    </div>
                    <div className="card">
                        <Icon varient="fetureIcon">
                            <TabletSmartphone />
                        </Icon>
                        <div className="feature-title">Fully Responsive</div>
                        <div className="feature-desc">Works perfectly on desktop, tablet, and mobile — manage your money anywhere.</div>
                    </div>
                    <div className="card">
                        <Icon varient="fetureIcon">
                            <Shield/>
                        </Icon>
                        <div className="feature-title">Secure & Private</div>
                        <div className="feature-desc">Your financial data is yours. Stored securely with Supabase, never shared or sold.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
