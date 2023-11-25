import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

const Layout = () => {
  return (
    <>
      <ScrollRestoration></ScrollRestoration>
      <div>
        <div className="container px-2 md:px-8 mx-auto">
          <Navbar></Navbar>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Layout;
