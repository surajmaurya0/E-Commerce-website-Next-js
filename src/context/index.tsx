"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserDataI } from "@/Interface";
export const GlobalContext = createContext<any>(null);
interface GlobalStateProps {
  children: ReactNode;
}
export default function GlobalState({ children }: GlobalStateProps) {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commonLoader, setCommonLoader] = useState<boolean>(false);
  const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
  const [user, setUser] = useState<UserDataI>();
  const [isAdminView, setIsAdminView] = useState(Boolean);
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userDataStr = localStorage.getItem("user");
      const userData = userDataStr ? JSON.parse(userDataStr) : {};
      setIsAdminView(userData.role === "admin" ? true : false);
      setUser(userData);
    } else {
      setIsAdminView(false);
      setIsAuthUser(false);
    }
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        commonLoader,
        setCommonLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        isAdminView,
        setIsAdminView,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
