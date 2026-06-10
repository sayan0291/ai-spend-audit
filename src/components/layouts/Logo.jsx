import { Bot } from "lucide-react"
import { Icon } from "../common/Icon"

export const Logo = () => {
    return(
        <>
            <div className="logo p-2">
                <Icon varient="solid">
                    <Bot size={25} strokeWidth={2} />
                </Icon>
                <h1 className="text-[clamp(13px,2vw,17px)]">SpendLens</h1>
            </div>
        </>
    )
}
