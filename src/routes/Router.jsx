import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Homepage/Home/Home";
import CoveragePage from "../pages/CoveragePage/CoveragePage";
import axios from "axios";

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
    ],
  },
]);

export default Router;
