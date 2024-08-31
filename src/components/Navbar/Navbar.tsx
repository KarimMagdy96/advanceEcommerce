import { FC, useContext, useState } from "react";

import logo from "../../assets/img/logoipsum-321.svg";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";
interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  let { userLogin, setuserLogin } = useContext(userContext);
  let { CartItemsCount } = useContext(cartContext);
  let [isOpen, setIsOpen] = useState(false);
  let handelLogout = () => {
    localStorage.removeItem("userToken");
    setuserLogin("");
  };

  return (
    <>
      <nav className="bg-white  fixed w-full  z-20 top-0 start-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img width={110} src={logo} alt="logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {userLogin.length == 0 ? (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <NavLink
                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                  to={"/login"}
                >
                  Login
                </NavLink>
                <NavLink
                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                  to={"/register"}
                >
                  Register
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <NavLink
                  to={"/cart"}
                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 flex justify-center gap-1 items-center focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span>{CartItemsCount}</span>
                </NavLink>
                <NavLink
                  onClick={handelLogout}
                  to={"/Login"}
                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                >
                  Logout
                </NavLink>
              </div>
            )}

            {userLogin.length > 0 && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            )}
          </div>
          {/* change */}
          {userLogin.length > 0 && (
            <div
              className={`${
                isOpen ? "" : "hidden"
              } items-center justify-between  w-full md:flex md:w-auto md:order-1`}
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  dark:border-gray-700">
                <li>
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={`mx-2 inline-block py-2 text-lg text-slate-900 font-light`}
                    to={"/"}
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={`mx-2 inline-block py-2 text-lg text-slate-900 font-light`}
                    to={"/products"}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={`mx-2 inline-block py-2 capitalize text-lg text-slate-900 font-light`}
                    to={"/allorders"}
                  >
                    orders History
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
