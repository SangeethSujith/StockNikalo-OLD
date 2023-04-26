/**
 * Router Wrapper
 *
 * Developed By : Akhil Soman
 * Author: Akhil Soman
 * Created on: 1/12/2022
 * Project: Stocknikalo
 */

import React from "react";
import { useNavigate } from "react-router-dom";

export const routerWrapper = (Component: any) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();

    return <Component history={navigate} {...props} />;
  };

  return Wrapper;
};
