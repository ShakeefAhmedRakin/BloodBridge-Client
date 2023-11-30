import { BiDonateBlood } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-secondary font-heading">
        <div className="container mx-auto">
          <footer className="footer p-10 text-base-content">
            <aside>
              <div className="text-secondary flex items-center gap-1">
                <BiDonateBlood className="text-3xl text-primary"></BiDonateBlood>
                <h1 className="font-heading text-white text-xl md:text-2xl font-semibold">
                  BloodBridge
                </h1>
              </div>
              <p className="text-white max-w-sm">
                Connecting generous donors with individuals in urgent need of
                blood.
              </p>
            </aside>
            <nav className="text-white">
              <header className="footer-title">Links</header>
              <NavLink to={"/"} className={`link link:hover`}>
                Home
              </NavLink>
              <NavLink
                to={"/blood-donation-requests"}
                className={`link link:hover`}
              >
                Donations
              </NavLink>
              <NavLink to={"/blogs"} className={`link link:hover`}>
                Blogs
              </NavLink>
              <NavLink to={"/search"} className={`link link:hover`}>
                Search Donors
              </NavLink>
            </nav>
            <nav className="text-white">
              <header className="footer-title">Others</header>
              <NavLink to={"/login"} className={`link link:hover`}>
                Login
              </NavLink>
              <NavLink to={"/register"} className={`link link:hover`}>
                Sign Up
              </NavLink>
            </nav>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
