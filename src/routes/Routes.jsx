import { createBrowserRouter } from "react-router-dom";
import Root from "../pages//public/Root";
import Home from "../pages/public/Home/Home";
import Login from "../pages/Login/Login";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
