import ProtectedLayout from "./components/ProtectedLayout";
import RootLayout from "./components/RootLayout";
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
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        {
          path: "/",
          element: <RootLayout />,
          children: [
            { path: "/", element: <Home />, loader: homeLoader },
            {
              path: "/:id",
              element: <CarDetails />,
              loader: detailsLoader,
              action: rentalAction,
            },
            { path: "/history", element: <History />, loader: historyLoader },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
