"use client";
import { useState, useMemo, useContext, useEffect } from "react";
import InputComponents from "@/components/FormElements/InputComponents";
import Link from "next/link";
import { logIn } from "@/services/login";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
interface FormData {
  [key: string]: string;
}
const intialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [logInData, setLogInData] = useState<FormData>(intialState);
  const { isAuthUser, setIsAuthUser, user, setUser,setIsAdminView } =useContext(GlobalContext);
   const router = useRouter()
  const onChangeLogin = (label: string, value: string) => {
    setLogInData({ ...logInData, [label]: value });
  };

  const formDataNotEmpty = useMemo(() => {
    const allValuesAreNonEmpty = Object.values(logInData).every(
      (value) => value !== null && value !== ""
    );
    return !allValuesAreNonEmpty;
  }, [logInData]);

  const onLoginSubmit = async () => {
    const res = await logIn(logInData);
    console.log(res);
    const { success, data, message } = res;
    if (!success) {
      setIsAuthUser(false)
      return toast.error(message);
    }
    //if res.success is success
    setIsAuthUser(true);
    setUser(data?.user);
    toast.success(message);
    setLogInData(intialState);
    Cookies.set("token", data?.token);
    localStorage.setItem("user", JSON.stringify(data?.user));
    setIsAdminView(data?.user.role === 'admin' ? true :false)
    
  };
  console.log(isAuthUser,user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);
  return (
    <>
      <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto max-w-full xl:px-5 lg:flex-row max-[500px]:w-full max-[500px]:p-1">
          <div className="flex flex-xol justify-center items-center w-full pr-10 pl-10 lg:flex-row max-[375px]:w-full max-[500px]:p-1">
            <div className="w-full mt-10 mr-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10 max-[500px]:shadow-[0px] max-[500px]:p-2">
                <p className="w-full text-4xl font-medium text-center font-serif max-[500px]:text-2xl">
                  Login
                </p>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  <InputComponents
                    id={"email"}
                    type={"email"}
                    placeHolder={"Enter your email"}
                    label={"Email"}
                    onChange={onChangeLogin}
                    value={logInData.email}
                  />
                  <InputComponents
                    id={"password"}
                    type={"password"}
                    placeHolder={"Enter your password"}
                    label={"Password"}
                    onChange={onChangeLogin}
                    value={logInData.password}
                  />
                  <button
                    className={`inline-flex w-full items-center justify-center ${
                      formDataNotEmpty ? "bg-zinc-700" : "bg-black"
                    } px-6 py-4  text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide max-[500px]:text-base max-[500px]:p-3`}
                    disabled={formDataNotEmpty}
                    onClick={onLoginSubmit}
                  >
                    Login
                  </button>
                </div>
                <div className="w-full mt-6">
                  <p>Don`t have a account ?</p>
                  <Link href="/register">
                    <button className="mt-[3px] inline-flex w-full items-center justify-center bg-black px-5 py-3  text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide max-[500px]:text-base max-[500px]:p-3">
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
