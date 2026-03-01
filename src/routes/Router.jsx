import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import SimpleLayout from "../layouts/SimpleLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import OrderForm from "../pages/OrderForm";
import Payment from "../pages/Payment";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Profile from "../pages/Dashboard/Profile";

// Buyer
import MyOrders from "../pages/Dashboard/Buyer/MyOrders";
import Overview from "../pages/Dashboard/Buyer/Overview";
import Settings from "../pages/Dashboard/Buyer/Settings";

// Manager
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import UpdateProduct from "../pages/Dashboard/UpdateProduct";
import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders";
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";
import OrderDetails from "../pages/Dashboard/OrderDetails";

// Admin
import AllOrders from "../pages/Dashboard/Admin/AllOrders";
import AllProduct from "../pages/Dashboard/Admin/AllProduct";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

import PrivateRoute from "./PrivateRoute";
import BuyerRoute from "./BuyerRoute";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomeLayout /> },
      { path: "/all-products", element: <AllProducts /> },
      { path: "/about-us", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <OrderForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:orderId",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },

      //dashboard
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { path: "profile", element: <Profile /> },

          {
            path: "order/:id",
            element: (
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            ),
          },
          {
            path: "my-orders",
            element: (
              <BuyerRoute>
                <MyOrders />
              </BuyerRoute>
            ),
          },
          {
            path: "overview",
            element: (
              <BuyerRoute>
                <Overview />
              </BuyerRoute>
            ),
          },
          {
            path: "settings",
            element: (
              <BuyerRoute>
                <Settings />
              </BuyerRoute>
            ),
          },

          //only manager
          {
            path: "add-product",
            element: (
              <ManagerRoute>
                <AddProduct />
              </ManagerRoute>
            ),
          },
          {
            path: "update-product/:id",
            element: (
              <ManagerRoute>
                <UpdateProduct />
              </ManagerRoute>
            ),
          },
          {
            path: "approved-orders",
            element: (
              <ManagerRoute>
                <ApprovedOrders />
              </ManagerRoute>
            ),
          },
          {
            path: "manage-products",
            element: (
              <ManagerRoute>
                <ManageProducts />
              </ManagerRoute>
            ),
          },
          {
            path: "pending-orders",
            element: (
              <ManagerRoute>
                <PendingOrders />
              </ManagerRoute>
            ),
          },

          //only admin
          {
            path: "all-orders",
            element: (
              <AdminRoute>
                <AllOrders />
              </AdminRoute>
            ),
          },
          {
            path: "all-product",
            element: (
              <AdminRoute>
                <AllProduct />
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
        ],
      },

      // 404
      {
        path: "*",
        element: <SimpleLayout />,
        children: [{ path: "*", element: <NotFound /> }],
      },
    ],
  },
]);

export default Router;
