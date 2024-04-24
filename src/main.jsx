import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import App from "./App";

import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Signup from "./routes/signup";


// 1 - Router configuration
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/cadastro",
    element: <Signup/>
  },
  {
    path: "/criar-grupos",
    element: <Signup/>
  },
  {
    path: "/meus-grupos",
    element: <Signup/>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" richColors />
  </React.StrictMode>
);