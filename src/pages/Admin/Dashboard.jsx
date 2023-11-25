import { BiDonateBlood } from "react-icons/bi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "sonner";
import { GrLogout } from "react-icons/gr";

const Dashboard = () => {
  const { logOut } = useContext(AuthContext);

  const closeSidebar = () => {
    const closeBtn = document.getElementById("my-drawer-2");
    if (closeBtn) {
      closeBtn.checked = false;
    }
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="bg-secondary">
        <div className="container mx-auto p-2 md:p-7 lg:p-12 min-h-screen h-screen">
          <div className="drawer md:drawer-open h-full">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer-2"
                className="btn text-xl bg-background text-secondary hover:bg-background drawer-button md:hidden mb-3"
              >
                <span className="text-sm">Menu</span>
                <TbLayoutSidebarLeftExpandFilled />
              </label>
              <div className="bg-background h-fit md:h-full rounded-2xl md:rounded-none md:rounded-tr-2xl md:rounded-br-2xl">
                <Outlet></Outlet>
              </div>
            </div>
            <div className="drawer-side h-full">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu h-full p-4 w-80 bg-base-200 text-base-content rounded-none md:rounded-none md:rounded-tl-2xl md:rounded-bl-2xl">
                {/* Sidebar content here */}

                <div className="flex justify-between items-center gap-2">
                  <div className="text-secondary flex items-center gap-1">
                    <BiDonateBlood className="text-3xl text-primary"></BiDonateBlood>
                    <h1 className="font-heading text-xl md:text-3xl font-semibold">
                      BloodBridge
                    </h1>
                  </div>
                  <label
                    onClick={closeSidebar}
                    className="btn text-xl bg-secondary text-white hover:bg-secondary drawer-button md:hidden"
                  >
                    <TbLayoutSidebarLeftCollapseFilled />
                  </label>
                </div>
                <hr className="my-2" />
                <div className="flex flex-col text-lg font-heading font-medium gap-4">
                  <NavLink
                    to={"/dashboard/admin-home"}
                    onClick={closeSidebar}
                    className={"p-2 w-full border-2 hover:underline rounded-xl"}
                  >
                    <li>Dashboard</li>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/user"}
                    onClick={closeSidebar}
                    className={"p-2 w-full border-2 hover:underline rounded-xl"}
                  >
                    <li>All Users</li>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/all-blood-donations"}
                    onClick={closeSidebar}
                    className={"p-2 w-full border-2 hover:underline rounded-xl"}
                  >
                    <li>Blood Donations</li>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/content-manage"}
                    onClick={closeSidebar}
                    className={"p-2 w-full border-2 hover:underline rounded-xl"}
                  >
                    <li>Manage Content</li>
                  </NavLink>
                  <hr className="my-2" />
                  <Link
                    to={"/"}
                    onClick={closeSidebar}
                    className={"btn bg-primary hover:bg-primary text-white"}
                  >
                    <li>Home</li>
                  </Link>
                  <button
                    className="btn btn-sm md:btn-md bg-secondary hover:shadow-xl hover:bg-secondary font-semibold text-white"
                    onClick={() => handleLogOut()}
                  >
                    Log Out
                    <GrLogout className="text-xl"></GrLogout>
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
