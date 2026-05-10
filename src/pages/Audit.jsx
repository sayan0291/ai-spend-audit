import { SpendForm } from "../components/shared/SpendForm"
import { AuditResult } from "../components/shared/AuditResult"

export const Audit = () => {
    return(
        <>
            <div className="main py-5 h-full">
                <SpendForm />
                <AuditResult />
            </div>
        </>
    )
}