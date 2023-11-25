import { BiDonateBlood } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { GrLogin } from "react-icons/gr";
import "./Navbar.css";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/"} className={"hover:underline"}>
          Home
        </NavLink>
      </li>
      <div className="divider divider-horizontal"></div>
      <li>
        <NavLink to={"/donation-requests"} className={"hover:underline"}>
          Donation Requests
        </NavLink>
      </li>
      <div className="divider divider-horizontal"></div>
      <li>
        <NavLink to={"/blog"} className={"hover:underline"}>
          Blog
        </NavLink>
      </li>
      <div className="divider divider-horizontal"></div>
      <li>
        <NavLink to={"/register"} className={"hover:underline"}>
          Sign Up
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <div className="text-secondary flex items-center gap-1">
            <BiDonateBlood className="text-3xl text-primary"></BiDonateBlood>
            <h1 className="font-heading text-xl md:text-2xl font-semibold">
              BloodBridge
            </h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="hidden lg:flex font-heading font-semibold text-secondary">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn bg-secondary hover:shadow-xl hover:bg-secondary font-semibold text-white">
            <span className="hidden lg:flex">Log In</span>
            <GrLogin className="text-xl"></GrLogin>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
