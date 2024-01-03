"use client";
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { UserDataI } from "@/Interface";
import { validateUser } from "@/services/validate_user";
import { toast } from "react-toastify";
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
  const [cookiesToken, setCookiesToken] = useState<any>();
  const [updateProduct, setUpdateProduct] = useState<any>();
  const [showCartModal, setShowCartModel] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState(Array);
  const [address, setAddress] = useState(Array);
  const [addressFormData, setAddressFormData] = useState<any>({
    fullName: "",
    city: "",
    country: "",
    postalCode: "",
    address: "",
  });
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });

  // setCookiesToken(token)

  const tokenValid = useCallback(async () => {
    const token = Cookies.get("token");
    console.log(cookiesToken);
    const valid = await validateUser({ token });
    const { success, message } = valid;
    console.log(message);
    if (!success) {
      Cookies.remove("token");
      localStorage.removeItem("user");
      setCookiesToken(false);
      toast.warning(message.name);
    }
  }, [cookiesToken]);
  useEffect(() => {
    tokenValid();
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
  }, [tokenValid, cookiesToken]);
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
        updateProduct,
        setUpdateProduct,
        componentLevelLoader,
        setComponentLevelLoader,
        showCartModal,
        setShowCartModel,
        cartItems,
        setCartItems,
        address,
        setAddress,
        addressFormData,
        setAddressFormData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
