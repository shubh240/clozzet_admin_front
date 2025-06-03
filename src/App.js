import "./App.css";
import Home from "./home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/login";
import Register from "./register/register";
import AuthLayout from "./hooks/Authlayout.jsx";
import useVerifyAuth from "./hooks/useVerifyAuth.jsx";

import DashboardPage from "./pages/dashboard/dashboard";
import Categories from "./pages/categories/Categories.jsx";
import Colors from "./pages/colors/Colors.jsx";
import Advertisement from "./pages/advertisement/Advertisement.jsx";
import SubCategories from "./pages/subcategories/SubCategories.jsx";
import AddStore from "./pages/store/add/AddStore.jsx";
import StoreList from "./pages/store/list/StoreList.jsx";
import StoreEdit from "./pages/store/edit/StoreEdit.jsx";
import GoogleMapsLoader from "./layouts/google/GoogleMapsLoader.js";
import Banner from "./pages/banner/Banner.jsx";
import Config from "./pages/config/Config.jsx";
import Content from "./pages/content/Content.jsx";
import Orders from "./pages/orders/Orders.jsx";
import OrdersDetails from "./pages/orders/OrdersDetails.jsx";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <AuthLayout>
          <Home />
        </AuthLayout>
      ),

      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/categories/subcategories/:category",
          element: <SubCategories />,
        },
        {
          path: "/banners",
          element: <Banner />,
        },
        {
          path: "/store-add",
          element: (
            <GoogleMapsLoader>
              <AddStore />
            </GoogleMapsLoader>
          ),
        },
        {
          path: "/store-list",
          element: <StoreList />,
        },
        {
          path: "/store-edit/:id",
          element: (
            <GoogleMapsLoader>
              <StoreEdit />
            </GoogleMapsLoader>
          ),
        },
         {
          path: "/configs",
          element: <Config />,
        },
        {
          path: "/order-list",
          element: <Orders />,
        },
        {
          path: "/order-details/:orderId",
          element: <OrdersDetails />,
        },
           {
          path: "/colors",
          element: <Colors />,
        },
        {
          path: "/advertisements",
          element: <Advertisement />,
        },
        {
          path: "/contents",
          element: <Content />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <AuthLayout authentication={false}>
          <Register />
        </AuthLayout>
      ),
    },
  ],
  {
    basename: "/admin",
  }
);

function App() {
  useVerifyAuth();
  return <RouterProvider router={routes} />;
}

export default App;
