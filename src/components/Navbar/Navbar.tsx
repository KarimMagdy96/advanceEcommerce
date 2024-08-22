import { FC, useContext } from "react";

import logo from "../../assets/img/logoipsum-321.svg";
import { NavLink } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  let { userLogin, setuserLogin } = useContext(userContext);
  let handelLogout = () => {
    localStorage.removeItem("userToken");
    setuserLogin("");
  };
  return (
    <nav
      className={` bg-gray-100 lg:fixed static top-0 left-0 right-0 py-3  container mx-auto p-2 justify-between  flex flex-col lg:flex-row   items-center`}
    >
      <div className="flex flex-col gap-5 items-center lg:flex-row  ">
        <img width={110} src={logo} alt="logo" />
        <ul className="flex   items-center  flex-col lg:flex-row ">
          {userLogin.length > 0 ? (
            <>
              <li>
                <NavLink
                  className={`mx-2 inline-block py-2 text-lg text-slate-900 font-light`}
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`mx-2 inline-block py-2 text-lg text-slate-900 font-light`}
                  to={"/cart"}
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`mx-2 inline-block py-2 text-lg text-slate-900 font-light`}
                  to={"/brands"}
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`mx-2 inline-block py-2 text-lg text-slate-900 font-light`}
                  to={"/categories"}
                >
                  Categories
                </NavLink>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div>
        <ul className="flex  items-center  flex-col lg:flex-row ">
          {userLogin.length == 0 ? (
            <>
              <li>
                <NavLink
                  className={`mx-2 inline-block py-2 text-lg text-slate-900 font-light`}
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`mx-2 inline-block py-2 text-lg text-slate-900 font-light`}
                  to={"/register"}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                onClick={handelLogout}
                className={`mx-2 inline-block py-2 text-lg text-slate-900 font-light`}
                to={"/Login"}
              >
                Logout
              </NavLink>
            </li>
          )}

          <li className=" flex items-center">
            <i className=" mx-2 fab fa-facebook"></i>
            <i className=" mx-2 fab fa-instagram"></i>
            <i className=" mx-2 fab fa-youtube"></i>
            <i className=" mx-2 fab fa-tiktok"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
