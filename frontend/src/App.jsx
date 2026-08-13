import homeLoader from './loaders/homeLoader';
import Home from './pages/Home'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home />, loader: homeLoader }]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
