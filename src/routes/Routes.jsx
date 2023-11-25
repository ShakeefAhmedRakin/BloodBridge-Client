import { createBrowserRouter } from "react-router-dom";
import Root from "../pages//public/Root";
import Home from "../pages/public/Home/Home";
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
]);
