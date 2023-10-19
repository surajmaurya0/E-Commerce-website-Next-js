"use client"
import { createContext, useState } from "react";

export const GlobalContext = createContext<any>(null)

export default function GlobalState ({children}:any){
    const [showNavModal,setShowNavModal] = useState<boolean>(false)
    return <GlobalContext.Provider value={{showNavModal,setShowNavModal}} >{children}</GlobalContext.Provider>
    
}