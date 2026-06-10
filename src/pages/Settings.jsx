import { SectionTop } from "../components/layouts/SectionTop"
import { useState } from "react";
import { ProfilCard, SettingsCard } from "../components/layouts/StatCard";
import { Button } from "../components/common/Button";
import { useUser } from "../context/UserContext";

export function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
        enabled ? "bg-emerald-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export const Settings = () => {

  const { profile,logout } = useUser();

    const [renewalReminders, setRenewalReminders] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    return(
        <div className="h-screen flex flex-col">
              <div className="sticky top-0 z-50 bg-white">
                <SectionTop name="Settings" />
              </div>

                <div className="flex flex-col p-4 gap-4">
                    <ProfilCard profile={profile} />
                    <SettingsCard  renewalReminders={renewalReminders} setRenewalReminders={setRenewalReminders} emailNotifications={emailNotifications} setEmailNotifications={setEmailNotifications} logout={logout} />
                </div>
        </div>
    )
}