import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import RouteProtect from "./protected/UserProtect";
import PublicRoutes from "./public/UserPublic";

function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteProtect>
            <Home />
          </RouteProtect>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <SignIn />
          </PublicRoutes>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoutes>
            <SignUp />
          </PublicRoutes>
        }
      />
    </Routes>
  );
}

export default UserRoutes;
