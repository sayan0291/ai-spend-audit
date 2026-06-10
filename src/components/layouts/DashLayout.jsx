import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "../common/Button";

export function DashLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Button
        varient="menuButtn"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </Button>

      {open && <SideBar />}

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}