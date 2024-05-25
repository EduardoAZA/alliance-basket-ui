import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import App from "./App";

import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ErrorPage from "./pages/ErrorPage";
import CreateGroup from "./pages/CreateGroup";
import MyGroups from "./pages/MyGroups";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App/>
    <Toaster position="top-right" richColors expand={true} />
  </React.StrictMode>
);