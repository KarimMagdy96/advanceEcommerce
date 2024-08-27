import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logoipsum-321.svg";
interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className="bg-white rounded-lg   m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div className="flex justify-between">
        <Link
          to="/"
          className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt=" Logo" />
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
          <li>
            <Link to="/" className="hover:underline me-4 md:me-6">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Cart" className="hover:underline me-4 md:me-6">
              Cart
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center ">
        Developed by Karim 2024 {` `}
        <a
          href="https://www.linkedin.com/in/karimmagdy96/"
          className="hover:underline text-blue-500"
        >
          linkedin
        </a>
        . All Rights Reserved.
      </span>
    </div>
  </footer>
);

export default Footer;
