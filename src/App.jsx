import axios from "axios";
import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import Login from "./components/Login";
import Order from "./components/Order";
import OrderReview from "./components/OrderReview";

const ApiData = React.createContext();

const Layout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
      )
      .then((res) => setData(res?.data));
  }, []);

  return (
    <ApiData.Provider value={data}>
      <Header />
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </ApiData.Provider>
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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export { ApiData, App };
