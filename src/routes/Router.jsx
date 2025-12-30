import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import OrderForm from "../pages/OrderForm";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/About";
import Contact from "../pages/Contact";
import DashboardLayout from "../layouts/DashboardLayout";
import AllOrders from "../pages/Dashboard/Admin/AllOrders";
import AllProduct from "../pages/Dashboard/Admin/AllProduct";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import MyOrders from "../pages/Dashboard/Buyer/MyOrders";
import Profile from "../pages/Dashboard/Profile";
import TrackOrder from "../pages/Dashboard/Buyer/TrackOrder";
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders";
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts";
import UpdateProduct from "../pages/Dashboard/UpdateProduct";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";
import NotFound from "../pages/NotFound";
import SimpleLayout from "../layouts/SimpleLayout";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomeLayout /> },
      { path: "/all-products", element: <AllProducts /> },

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
            path: "profile",
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },

          {
            path: "all-orders",
            element: (
              <PrivateRoute>
                <AllOrders />
              </PrivateRoute>
            ),
          },

          {
            path: "all-product",
            element: (
              <PrivateRoute>
                <AllProduct />
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
            path: "my-orders",
            element: (
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            ),
          },
          {
            path: "track/:orderId",
            element: (
              <PrivateRoute>
                <TrackOrder />
              </PrivateRoute>
            ),
          },

          {
            path: "add-product",
            element: (
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            ),
          },
          {
            path: "update-product/:id",
            element: (
              <PrivateRoute>
                <UpdateProduct />
              </PrivateRoute>
            ),
          },
          {
            path: "approved-orders",
            element: (
              <PrivateRoute>
                <ApprovedOrders />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-products",
            element: (
              <PrivateRoute>
                <ManageProducts />
              </PrivateRoute>
            ),
          },
          {
            path: "pending-orders",
            element: (
              <PrivateRoute>
                <PendingOrders />
              </PrivateRoute>
            ),
          },
        ],
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "*",
        element: <SimpleLayout />,
        children: [{ path: "*", element: <NotFound /> }],
      },
    ],
  },
]);

export default Router;
