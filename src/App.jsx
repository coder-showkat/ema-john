import React from "react";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import LoadingSpinner from "./components/LoadingSpinner";
import Login from "./components/Login";
import Order from "./components/Order";
import OrderReview from "./components/OrderReview";
import loaderData from "./loaderData/loaderData";

const Layout = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <ToastContainer />
      <main>
        {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "/order",
        element: <Order />,
        loader: loaderData,
      },
      {
        path: "/order-review",
        element: <OrderReview />,
        loader: loaderData,
      },
      {
        path: "/manage-inventory",
        element: <Inventory />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
