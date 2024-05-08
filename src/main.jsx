import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import App from "./App";

import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Signup from "./routes/signup";
import ErrorPage from "./routes/ErrorPage";
import CreateGroup from "./routes/CreateGroup";

// 1 - Router configuration
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/home/:id?",
    element: <Home />
  },
  {
    path: "/perfil/:id",
    element: <Profile />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Signup />
  },
  {
    path: "/criar-grupo",
    element: <CreateGroup />
  },
  {
    path: "/meus-grupos",
    element: <Signup />
  },
  {
    path: "/entrar"
  },
  {
    path: "*",
    element: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" richColors expand={true} />
  </React.StrictMode>
);