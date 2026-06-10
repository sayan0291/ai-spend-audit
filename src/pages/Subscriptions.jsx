import { useState } from "react"
import { Button } from "../components/common/Button"
import { AddSubscriptionCard } from "../components/layouts/AddSubscriptionCard"
import { SectionTop } from "../components/layouts/SectionTop"
import { useUser } from "../context/UserContext"
import SubscriptionCards from "../components/layouts/SubscriptionCard"

export const Subscriptions = () => {
  const [open, setOpen] = useState(false)
  const { subscriptions } = useUser()

  const total = subscriptions.reduce((sum, s) => sum + Number(s.amount), 0)

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white">
        <SectionTop name="Subscriptions" />
      </div>
      <div className="flex-bw-ic w-4/5 px-6 py-2">
        <h4 className="flex-jc-ic">
          Total <h5>₹{total.toLocaleString("en-IN")}</h5>
        </h4>
        <Button varient="shareBtn" onClick={() => setOpen(!open)}>
          add subscriptions
        </Button>
        {open ? <AddSubscriptionCard setOpen={setOpen} open={open} /> : ""}
      </div>
      <div>
        <SubscriptionCards />
      </div>
    </div>
  )
}