import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import{createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import StorePage from "./pages/StorePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/category",
    element: <CategoryPage />,
  },
  { 
    path: "/store",
    element: <StorePage />,
  }
])

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
