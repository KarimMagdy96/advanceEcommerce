import { FC } from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => (
  <>
    <Navbar />
    <div className="container mx-auto my-6 py-14 ">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
);

export default Layout;
