import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Homepage/Home/Home";
import CoveragePage from "../pages/CoveragePage/CoveragePage";
import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcel from "../pages/Dashboard/MyParcel/MyParcel";
import Overview from "../pages/Dashboard/Overview/Overview";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import Rider from "../pages/Rider/Rider";
import AppliedRiders from "../pages/Dashboard/AppliedRiders/AppliedRiders";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <p>Loading..</p>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "coverage",
        element: <CoveragePage />,
        loader: async () => axios("/warehouses.json"),
      },
      {
        path: "send-parcel",
        element: <SendParcel />,
        loader: async () => axios("/warehouses.json"),
      },
      {
        path: "be-a-rider",
        element: <Rider />,
        loader: async () => axios("/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "my-parcels",
        element: <MyParcel />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },

      {
        path: "",
        element: <AdminRoute />,
        children: [
          {
            path: "manage-users",
            element: <ManageUsers />,
          },
          {
            path: "applied-riders",
            element: <AppliedRiders />,
          },
        ],
      },
    ],
  },
]);

export default Router;
