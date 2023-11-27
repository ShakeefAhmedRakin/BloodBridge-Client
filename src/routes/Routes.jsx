import { createBrowserRouter } from "react-router-dom";
import Root from "../pages//public/Root";
import Home from "../pages/public/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "./AdminRoute";
import Profile from "../pages/Dashboard/Shared/Profile";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      // BLOG,ALL DONATIONS,
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // SHARED ROUTES
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      // ADMIN ROUTES
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-blood-donations",
        element: <></>,
      },
      {
        path: "/dashboard/content-manage",
        element: <></>,
      },
    ],
  },
]);
