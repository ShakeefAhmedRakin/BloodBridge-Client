import { createBrowserRouter } from "react-router-dom";
import Root from "../pages//public/Root";
import Home from "../pages/public/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardHome from "../pages/Dashboard/Shared/DashboardHome";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "./AdminRoute";
import Profile from "../pages/Dashboard/Shared/Profile";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import BloodDonationRequest from "../pages/public/BloodDonationRequests/BloodDonationRequests";
import BloodDonationDetails from "../pages/public/BloodDonationDetails/BloodDonationDetails";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import UpdateDonationRequest from "../pages/Dashboard/Shared/UpdateDonationRequest";
import DonorRoute from "./DonorRoute";
import AllDonations from "../pages/Dashboard/Shared/AllDonations";
import ContentManagement from "../pages//Dashboard/Shared/ContentManagement";
import AddBlog from "../pages/Dashboard/Shared/AddBlog";
import Blogs from "../pages/public/Blogs/Blogs";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blood-donation-requests",
        element: <BloodDonationRequest></BloodDonationRequest>,
      },
      {
        path: "/blood-donation-requests/:id",
        element: (
          <PrivateRoute>
            <BloodDonationDetails></BloodDonationDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation-requests/${params.id}`),
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
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
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update/donation-requests/:id",
        element: (
          <PrivateRoute>
            <UpdateDonationRequest></UpdateDonationRequest>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation-requests/${params.id}`),
      },
      // ADMIN ROUTES
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      // ADMIN + VOLUNTEER
      {
        path: "/dashboard/all-blood-donations",
        element: (
          <PrivateRoute>
            <AllDonations></AllDonations>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/content-management",
        element: (
          <PrivateRoute>
            <ContentManagement></ContentManagement>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/content-management/add-blog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      // DONOR ROUTES
      {
        path: "/dashboard/my-donation-requests",
        element: (
          <DonorRoute>
            <MyDonationRequests></MyDonationRequests>
          </DonorRoute>
        ),
      },
      {
        path: "/dashboard/create-donation-request",
        element: (
          <DonorRoute>
            <CreateDonationRequest></CreateDonationRequest>
          </DonorRoute>
        ),
      },
    ],
  },
]);
