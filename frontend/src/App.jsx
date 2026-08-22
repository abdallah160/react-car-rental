import ProtectedLayout from "./components/ProtectedLayout";
import RootLayout from "./components/RootLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import addEditAction from "./loaders/addEditAction";
import detailsLoader from "./loaders/detailsLoader";
import historyLoader from "./loaders/historyLoader";
import homeLoader from "./loaders/homeLoader";
import loginAction from "./loaders/loginAction";
import rentalAction from "./loaders/rentalAction";
import CarDetails from "./pages/CarDetails";
import History from "./pages/History";
import Home from "./pages/Home";
import SignPage from "./pages/Sign";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <SignPage />,
      action: loginAction,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: <RootLayout />,
          errorElement: <ErrorBoundary />,
          children: [
            {
              path: "/",
              element: <Home />,
              loader: homeLoader,
              action: addEditAction,
              errorElement: <ErrorBoundary />,
            },
            {
              path: "/:id",
              element: <CarDetails />,
              loader: detailsLoader,
              action: rentalAction,
              errorElement: <ErrorBoundary />,
            },
            {
              path: "/history",
              element: <History />,
              loader: historyLoader,
              errorElement: <ErrorBoundary />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;


