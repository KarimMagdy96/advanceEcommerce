import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";

import UserContextProvider from "./Context/UserContext";
import ProtectedRouts from "./components/ProtectedRouts/ProtectedRouts";
import Layout from "./components/Layout/Layout";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";

let queryClient = new QueryClient();
let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouts>
            <Home />
          </ProtectedRouts>
        ),
      },
      {
        path: "/about",
        element: (
          <ProtectedRouts>
            <About />
          </ProtectedRouts>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRouts>
            <Categories />
          </ProtectedRouts>
        ),
      },
      {
        path: "/Productdetails/:id/:category",
        element: (
          <ProtectedRouts>
            <ProductDetails />
          </ProtectedRouts>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRouts>
            <Brands />
          </ProtectedRouts>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRouts>
            <Cart />
          </ProtectedRouts>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRouts>
            <Products />
          </ProtectedRouts>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ReactQueryDevtools />
            <Toaster />
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
