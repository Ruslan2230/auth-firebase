import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoutes";
import OrderPage from "../pages/order-page/order-page";
import SignInSignUpPage from "../pages/sign-in-sign-up/sign-in-sign-up";
import HomePage from "../pages/home-page/home-page";
import ErrorPage from "../pages/error-page/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    index: true,
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <OrderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sign-in-sign-up",
    element: <SignInSignUpPage />,
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
