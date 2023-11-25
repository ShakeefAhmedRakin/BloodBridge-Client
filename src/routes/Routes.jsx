import { createBrowserRouter } from "react-router-dom";
import Root from "../pages//public/Root";
import Home from "../pages/public/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Admin/Dashboard";
import AdminHome from "../pages/Admin/AdminHome";
import AllUsers from "../pages/Admin/AllUsers";
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
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // ADMIN ROUTES
      {
        path: "admin-home",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "user",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "all-blood-donations",
        element: <></>,
      },
      {
        path: "content-manage",
        element: <></>,
      },
    ],
  },
]);
