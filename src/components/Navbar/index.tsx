"use client";
import { Fragment, useCallback, useContext, useEffect, useMemo } from "react";
import { adminNavOptions, navOptions, styles } from "@/utils";
import { GlobalContext } from "@/context";
import CommonModal from "../CommonModal";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// const isAdminView = false;
// const {isAuthUser} = false;
const user = {
  role: "admin",
};

const Navbar = () => {
  const { showNavModal, setShowNavModal, isAdminView, setIsAdminView } =
    useContext(GlobalContext);
  const { isAuthUser, setIsAuthUser, user, setUser } =
    useContext(GlobalContext);
  console.log(user);
  const router = useRouter();
  function NavItem({ isModalView = false }: any) {
    const item = isAuthUser && isAdminView ? adminNavOptions : navOptions;
    return (
      <div
        // className={`items-center justify-between w-full md:w-auto ${isModalView ? "":'hidden'} `}
        className={`items-center justify-between w-full md:flex md:w-auto ${
          isModalView ? "" : "hidden"
        }`}
        id="nav-items"
      >
        <ul className="flex flex-col p-4 md:p-0 nt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white">
          {item.map(({ id, label, path }: any) => (
            <li
              className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
              key={id}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const HandleLogoutBtn = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.removeItem("user");
    toast.warn("Logout from Website");
    router.push("/");
  };
  // useEffect(()=>{
  // },[Cookies])
  console.log("logout", Cookies.get("token"), localStorage.getItem("user"));
  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer">
            <span className="slef-center text-2xl font-semibold whitespace-nowrap">
              eCommerce
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser && (
              <Fragment>
                <button className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white">
                  Account
                </button>
                <button className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white">
                  cart
                </button>
              </Fragment>
            )}
            {isAuthUser && user.role === "admin" ? (
              isAdminView ? (
                <button
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                  onClick={() => setIsAdminView(false)}
                >
                  Client View
                </button>
              ) : (
                <button
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                  onClick={() => setIsAdminView(true)}
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                onClick={HandleLogoutBtn}
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white">
                  Login
                </button>
              </Link>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(!showNavModal)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItem />
        </div>
      </nav>
      <CommonModal
        show={showNavModal}
        setShow={setShowNavModal}
        showModalTitle={false}
        mainContent={
          <NavItem
            isModalView={true}
            item={isAdminView ? adminNavOptions : navOptions}
          />
        }
      />
    </>
  );
};

export default Navbar;
