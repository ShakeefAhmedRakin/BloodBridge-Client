import { BiDonateBlood } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { GrLogin, GrLogout } from "react-icons/gr";
import "./Navbar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "sonner";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out");
      })
      .catch((error) => console.log(error));
  };

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
              className="font-heading font-semibold text-secondary space-y-2 dropdown-content bg-base-100 mt-1 border-white border-b-[1px] -ml-4 z-50 p-4 shadow bg-primaryLight dark:bg-primaryDark rounded-none w-screen"
            >
              {links}
            </ul>
          </div>
          <div className="text-secondary flex items-center gap-1  py-8">
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
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle btn-lg avatar"
                  >
                    <div className="w-full rounded-full hover:shadow-xl border-[1px] border-primary">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={currentUser?.photoURL}
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <h1 className="font-heading text-primary font-bold text-lg">
                      {currentUser?.displayName}
                    </h1>
                    <hr className="mb-3" />
                    <Link to={"/donor-dashboard"} className="mb-1">
                      <li className="font-heading font-semibold text-secondary text-base hover:underline hover:text-primary">
                        Dashboard
                      </li>
                    </Link>
                    <Link to={"/fundings"}>
                      <li className="font-heading font-semibold text-secondary text-base hover:underline hover:text-primary">
                        Fundings
                      </li>
                    </Link>

                    <hr className="my-3" />
                    <button
                      className="btn btn-sm md:btn-md bg-secondary hover:shadow-xl hover:bg-secondary font-semibold text-white"
                      onClick={() => handleLogOut()}
                    >
                      Log Out
                      <GrLogout className="text-xl"></GrLogout>
                    </button>
                  </ul>
                </div>
              </div>
              {/* <button className="btn btn-sm md:btn-md bg-secondary hover:shadow-xl hover:bg-secondary font-semibold text-white">
                <span className="hidden lg:flex">Log Out</span>
                <GrLogout className="text-xl"></GrLogout>
              </button> */}
            </>
          ) : (
            <Link to={"/login"} className="h-">
              <button className="btn btn-sm md:btn-md bg-secondary hover:shadow-xl hover:bg-secondary font-semibold text-white">
                <span className="hidden lg:flex">Log In</span>
                <GrLogin className="text-xl"></GrLogin>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
