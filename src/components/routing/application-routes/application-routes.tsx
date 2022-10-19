import React from "react";
import RoutePath from "../../global/route-paths";
import Home from "../../pages/home/home";
import LoginComponent from "../../pages/login/login";
import { Route, Routes } from "react-router-dom";
const AppRouter = (props: any) => {
  return (
    <Routes>
      <Route path={RoutePath.home} element={<Home />} />
      <Route path={RoutePath.login} element={<LoginComponent />} />
    </Routes>
  );
};
export default AppRouter;
