import { Bot, User } from "lucide-react"
import { Icon } from "../common/Icon"
import { Button } from "../common/Button.jsx"
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo.jsx";
import { useUser } from "../../context/UserContext.jsx";

const sideBarBtn = [
  {
    id: 1,
    title: "Main",
    links: [
      { name: "Dashboard", path: "/main/dashboard" },
      { name: "Subscriptions", path: "/main/subscriptions" },
      { name: "Expenses", path: "/main/expenses" }
    ]
  },
  {
    id: 2,
    title: "Insights",
    links: [
      { name: "Analytics", path: "/insights/analytics" },
      { name: "Smart Insights", path: "/insights/smart-insights" }
    ]
  },
  {
    id: 3,
    title: "Account",
    links: [
      { name: "settings", path: "/account/settings" }
    ]
  }
];



export const SideBar = () => {

    const { profile } = useUser();
    
    
    return(
        <div className="side-bar">
            <div>
                <Logo />
                <div className="side-bar-section">
                    {
                        sideBarBtn.map((obj,index) => {
                            return (
                                <div key={obj.id}>
                                    <h3>{obj.title}</h3>
                                    <div className="nav-item gap-1">
                                        {obj.links.map((btn) => (
                                            <NavLink key={btn.name} to={btn.path} className={({isActive}) => `${isActive ? "bg-light-violet text-ink-2":""}`} >{btn.name}</NavLink>
                                        ))}
                                    </div>
                                </div>
                            )
                    })}
                </div>
            </div>
            <div className="user-section">
                <Icon varient="logoby">
                    <User />
                </Icon>
                <div>
                    <h2>{profile?.first_name}</h2>
                    <small>{profile?.email}</small>
                </div>
            </div>
        </div>
    )
}