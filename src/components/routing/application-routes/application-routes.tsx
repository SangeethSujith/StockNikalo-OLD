import React from "react";
import RoutePath from "../../global/route-paths";
import Home from "../../pages/home/home";
import LoginComponent from "../../pages/login/login";
import RegistrationComponent from "../../pages/register/register";
import CartComponent from "../../pages/cart/cart";
import ProductsComponent from "../../pages/products/products";
import CompleteRegistrationComponent from "../../pages/complete-register/complete-register";
import ProductsDetailComponent from "../../pages/products/products-details";
import CheckoutComponent from "../../pages/checkout/checkout";
import RfqsComponent from "../../pages/rfqs/rfqs";
import RfqQuotePriceComponent from "../../pages/rfqs/quote-the-price";
import AuctionDetailComponent from "../../pages/auction/auction-details";
import AuctionComponent from "../../pages/auction/auction";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../private-route";
const AppRouter = (props: any) => {
  return (
    <Routes>
      <Route path={RoutePath.home} element={<Home />} />

      <>
        <Route path={RoutePath.login} element={<LoginComponent />} />
        <Route path={RoutePath.register} element={<RegistrationComponent />} />

        <Route
          path={RoutePath.checkout}
          element={
            <PrivateRoute>
              <CheckoutComponent />
            </PrivateRoute>
          }
        />
        <Route
          path={RoutePath.rfqs}
          element={
            <PrivateRoute>
              <RfqsComponent />
            </PrivateRoute>
          }
        />
        <Route
          path={RoutePath.quoteprice}
          element={
            <PrivateRoute>
              <RfqQuotePriceComponent />
            </PrivateRoute>
          }
        />
      </>

      <Route path={RoutePath.cart} element={<CartComponent />} />
      <Route path={RoutePath.shop} element={<ProductsComponent />} />
      <Route path={RoutePath.auctionpage} element={<AuctionComponent />} />
      <Route
        path={RoutePath.complete_profile}
        element={<CompleteRegistrationComponent />}
      />
      <Route
        path={RoutePath.product + "/:id"}
        element={<ProductsDetailComponent />}
      />
      <Route
        path={RoutePath.auction + "/:id"}
        element={<AuctionDetailComponent />}
      />
    </Routes>
  );
};
export default AppRouter;
