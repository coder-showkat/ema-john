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
import Checkout from "./components/Checkout";
import ErrorPage from "./components/ErrorPage";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import Login from "./components/Login";
import Order from "./components/Order";
import OrderReview from "./components/OrderReview";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Register from "./components/Register";
import loaderData from "./loaderData/loaderData";
import AuthProvider from "./probiders/AuthProvider";

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
    errorElement: <ErrorPage />,
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
