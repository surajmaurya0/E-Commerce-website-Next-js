import { Fragment, useCallback, useMemo } from "react";
import { adminNavOptions, navOptions } from "@/utils";

const isAdminView = false;
const isAuthUser = false;
const user = {
  role: "admin",
};

const Navbar = () => {
  const NavItem = useCallback((item: any) => {
    return (
      <div
        className="items-center justify-between w-full md:w-auto"
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
  }, []);

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
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button>Account</button>
                <button>cart</button>
              </Fragment>
            ) : null}
            {isAuthUser && user.role === "admin" ? (
              isAdminView ? (
                <button> Client View</button>
              ) : (
                <button>Admin View</button>
              )
            ) : null}
            {isAuthUser ? <button>Logout</button> : <button>Login</button>}
          </div>
          {NavItem(isAdminView ? adminNavOptions : navOptions)}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
