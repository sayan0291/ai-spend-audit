import React from "react"
import { NavLink } from "react-router-dom"
import { Button } from "../shared/Button"
import { Icon } from "../shared/Icon"
import { Bot,TextAlignJustify,X  } from "lucide-react"

const MobileView = () => {
    return(
        <div className="nav-links absolute top-17 right-0 w-1/2 bg-white flex flex-col gap-5 p-6 md:hidden z-50">
            <a href="#">How it works</a>
            <a href="#">Pricing Data</a>
            <Button varient="navButtn">
                Get Free Audit
            </Button>
        </div>
    )
}

export const Navbar = () => {

    const [open,setOpen] = React.useState(false);


    return(
        <>
            <nav>
                <div className="logo">
                    <Icon varient="solid">
                        <Bot size={25} strokeWidth={2} />
                    </Icon>
                    <h1 className="hidden md:block">SpendLens</h1>
                    <Icon varient="logoby">
                        by Credex
                    </Icon>
                </div>
                <div className="nav-links hidden md:block">
                    <NavLink className="nav-link-buttn" to="/hero">How it works</NavLink>
                    <NavLink className="nav-link-buttn" to="/audi">Pricing Data</NavLink>
                    <Button varient="navButtn">
                        <NavLink to="/audit">Get Free Audit</NavLink>
                    </Button>
                </div>
                <Button varient="menuButtn" >
                    {open ? <X size={25} strokeWidth={1.5} onClick={() => setOpen(false)} /> : <TextAlignJustify size={25} strokeWidth={1.5} onClick={() => setOpen(true)} /> }
                </Button>
            </nav>
            {open && <MobileView setOpen={setOpen} />}
        </>
    )
}