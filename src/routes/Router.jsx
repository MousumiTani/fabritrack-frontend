import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/About";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import SimpleLayout from "../layouts/SimpleLayout";
import Contact from "../pages/Contact";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import Statistics from "../pages/Dashboard/Common/Statistics";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomeLayout /> },
      { path: "/all-products", element: <AllProducts /> },

      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            ),
          },

          {
            path: "my-inventory",
            element: (
              <PrivateRoute>
                <MyInventory />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <PrivateRoute>
                <ManageUsers />
              </PrivateRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
          {
            path: "my-orders",
            element: (
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-orders",
            element: <ManageOrders />,
          },
        ],
      },

      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      {
        path: "*",
        element: <SimpleLayout />,
        children: [{ path: "*", element: <NotFound /> }],
      },
    ],
  },
]);

export default Router;
