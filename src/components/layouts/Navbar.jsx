import React from "react"
import { NavLink } from "react-router-dom"
import { Button } from "../common/Button"
import { TextAlignJustify, X } from "lucide-react"
import { Logo } from "./Logo"
import { useUser } from "../../context/UserContext"

export const Navbar = () => {

    const { user } = useUser();

    const [open,setOpen] = React.useState(false);


    return(
        <>
            <nav>
                <Logo />
                <div className="nav-links hidden md:block">
                    {user ? (<Button varient="navButtn">
                                {<NavLink to="/main/dashboard">Dashboard</NavLink>}
                            </Button>) : null
                            
                        }
                </div>
            </nav>
        </>
    )
}
