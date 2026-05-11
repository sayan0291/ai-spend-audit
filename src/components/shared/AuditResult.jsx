import { Button } from "./Button"
import { Link,Upload } from "lucide-react"

export const AuditResult = () => {
    return(
        <>
            <div className="right-hero-card">
                <div className="savings-hero-card">
                    <div className="absolute -top-[30px] -right-[30px] h-[120px] w-[120px] rounded-full bg-white/5" />
                    <div className="saving-tag">Potential monthly savings</div>
                    <div className="savings-amount"><sup>$</sup>247</div>
                    <div className="savings-period">across 3 active tools . 8-person team</div>
                    <div className="savings-annual">
                        Annul savings <span className="font-semibold">$2,964 / year</span>
                    </div>
                </div>
                <div className="audit-items">
                    <div className="audit-item">
                        <div className="audit-item-top">
                            <div className="audit-tool-info">
                                <div className="tool-icon">
                                    Cu
                                </div>
                                <span className="audit-tool-name">
                                    Cursor
                                </span>
                            </div>
                            <span className="badge badge-save">
                                Save $160/mo
                            </span>
                        </div>
                        <div className="audit-change">
                            <span className="audit-form">Business × 8 — $320</span>
                            <span className="audit-arrow">→</span>
                            <span className="audit-to">Pro x 8 via credits - $160</span>
                        </div>
                    </div>
                    <div className="audit-reason">
                        Team of 8 doesn't need Business tier. Pro covers the same models at $20/seat. Credex credits bring this to retail Pro pricing.
                    </div>
                </div>
                <div className="ai-summery-card">
                    <div className="ai-summery-label">
                        <div className="ai-dot"></div>
                        AI-generated insight
                    </div>
                    <div className="ai-summery-text">
                        Your 8-person coding team is spending <strong>$580/month</strong> across three AI tools but getting the most value only from Claude Pro. The bulk of your spend — Cursor Business and ChatGPT Team — is sized for enterprise workflows you're not using. Switching Cursor to Pro and moving ChatGPT usage to direct API access would cut your bill by 43% while maintaining full model access. The $2,964 in annual savings is meaningful runway for a team your size.
                    </div>
                </div>
                <div className="email-gate-card">
                    <div className="email-gate-title">get this report by email</div>
                    <div className="email-gate-hub">We'll also notify you when new savings apply to your stack.</div>
                    <div className="email-input-row">
                        <input type="email" placeholder="you@company.com" />
                        <Button varient="emailSubmit">
                            submit
                        </Button>
                    </div>
                </div>
                <div className="share-row">
                    <Button varient="shareBtn">
                        <Link />
                        <p>Share report</p>
                    </Button>
                    <Button varient="shareBtn">
                        <Upload  />
                        <p>PDF export</p>
                    </Button>
                </div>
            </div>
        </>
    )
}