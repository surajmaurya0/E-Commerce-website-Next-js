"use client";
import { Fragment, useCallback, useContext, useEffect, useMemo } from "react";
import { adminNavOptions, navOptions, styles } from "@/utils";
import { GlobalContext } from "@/context";
import CommonModal from "../CommonModal";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { NavbarMenuI } from "@/Interface";
import CartModal from "../CartModal";

// const isAdminView = false;
// const {isAuthUser} = false;

const Navbar = () => {
  const {
    showNavModal,
    setShowNavModal,
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    setUpdateProduct,
    updateProduct,
    showCartModal,
  } = useContext(GlobalContext);
  console.log(user);
  const pathName = usePathname();
  const isAdminView = pathName.includes("admin-view");
  useEffect(() => {
    if (pathName !== "/admin-view/add-product" && updateProduct !== null) {
      setUpdateProduct(null);
    }
  }, [pathName]);
  const router = useRouter();

  const HandleLogoutBtn = useCallback(() => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.removeItem("user");
    toast.warn("Logout from Website");
    router.push("/");
  }, [router, setIsAuthUser, setUser]);

  const activityBtn: any = useMemo(() => {
    return (
      <>
        {!isAdminView && isAuthUser && (
          <Fragment>
            <button className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white">
              Account
            </button>
            <button className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white">
              Cart
            </button>
          </Fragment>
        )}
        {isAuthUser && user.role === "admin" ? (
          isAdminView ? (
            <button
              className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
              onClick={() => router.push("/")}
            >
              Client View
            </button>
          ) : (
            <button
              className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
              onClick={() => router.push("/admin-view")}
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
          <button
            className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </>
    );
  }, [HandleLogoutBtn, isAdminView, isAuthUser, router, user]);
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
          {item.map(({ id, label, path }: NavbarMenuI) => (
            <li
              className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
              key={id}
              onClick={() => router.push(path)}
            >
              {label}
            </li>
          ))}
        </ul>
        <div className="md:hidden activity-btn">

            {activityBtn}
            </div>
      </div>
    );
  }
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
            <div className="min-[10px]:hidden md:block activity-btn">

            {activityBtn}
            </div>
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
      {showCartModal && <CartModal />}
    </>
  );
};

export default Navbar;
