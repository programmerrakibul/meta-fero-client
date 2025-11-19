import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Homepage/Home/Home";
import CoveragePage from "../pages/CoveragePage/CoveragePage";
import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import SendParcel from "../pages/SendParcel/SendParcel";

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
]);

export default Router;
