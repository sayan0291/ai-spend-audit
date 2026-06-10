import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleExpense, handleSubscriptions } from "../lib/supabse.js";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    try { return JSON.parse(storedUser); } catch { return null; }
  });

  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    if (!storedProfile || storedProfile === "undefined") return null;
    try { return JSON.parse(storedProfile); } catch { return null; }
  });

  const [expenses, setExpenses] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    setDataLoading(true);
    Promise.all([
      handleExpense({ user_id: user.id }),
      handleSubscriptions({ user_id: user.id }),
    ]).then(([exp, subs]) => {
      setExpenses(exp || []);
      setSubscriptions(subs || []);
    }).finally(() => setDataLoading(false));
  }, [user?.id]);

  const login = (userData, profileData) => {
    setUser(userData);
    setProfile(profileData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("profile", JSON.stringify(profileData));
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setProfile(null);
    setExpenses([]);
    setSubscriptions([]);
    navigate("/", { replace: true });
  };

  const refreshData = async () => {
    if (!user?.id) return;
    const [exp, subs] = await Promise.all([
      handleExpense({ user_id: user.id }),
      handleSubscriptions({ user_id: user.id }),
    ]);
    setExpenses(exp || []);
    setSubscriptions(subs || []);
  };

  return (
    <UserContext.Provider value={{
      user, setUser,
      profile, setProfile,
      expenses, subscriptions,
      dataLoading, refreshData,
      login, logout,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};