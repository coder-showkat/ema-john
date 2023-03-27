import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import Login from "./components/Login";
import Order from "./components/Order";
import OrderReview from "./components/OrderReview";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
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
      },
      {
        path: "/order-review",
        element: <OrderReview />,
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

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
