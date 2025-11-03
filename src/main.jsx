import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './component/home/Home.jsx';
import AllProducts from './component/all-product/AllProducts.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Register from './component/authentication-page/Register.jsx';
import MyProducts from './component/my-product/MyProducts.jsx';
import MyBids from './component/my-bids/MyBids.jsx';
import ProductDetails from './component/my-product/ProductDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },

      {
        path: "/allProducts",
        Component: AllProducts
      },

      {
        path: "/register",
        Component: Register
      },

      {
        path: '/myProducts',
        element: <MyProducts></MyProducts>
      },

      {
        path: '/myBids',
        element: <MyBids></MyBids>
      },

      {
        path: "/productDetails/:id",
        loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
        element: <ProductDetails></ProductDetails>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
