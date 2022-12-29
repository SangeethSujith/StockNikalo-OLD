/**
 * Public  Route
 *
 * Developed By : Akhil Soman
 * Author: Akhil Soman
 * Created on: 1/12/2022
 * Project: Stocknikalo
 */

import React from "react";
import { Navigate, Route } from "react-router-dom";
import RoutePath from "../global/route-paths";
import AuthStore from "../store/auth-store";
import userStore from "../store/user-store";

export const PublicRoute: React.FC<any> = ({ children }) => {
  return AuthStore.isUserLoggedIn &&
    localStorage.getItem("userId") != "null" ? (
    <Navigate to={RoutePath.home} />
  ) : (
    children
  );
};
