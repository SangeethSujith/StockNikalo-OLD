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
const AppRouter = (props: any) => {
  return (
    <Routes>
      <Route path={RoutePath.home} element={<Home />} />
      {localStorage.getItem("userId") == "null" ? (
        <>
          <Route path={RoutePath.login} element={<LoginComponent />} />
          <Route
            path={RoutePath.register}
            element={<RegistrationComponent />}
          />
          <Route path={RoutePath.checkout} element={<Home />} />
          <Route path={RoutePath.rfqs} element={<LoginComponent />} />
          <Route path={RoutePath.quoteprice} element={<Home />} />
        </>
      ) : (
        <>
          <Route path={RoutePath.login} element={<Home />} />
          <Route path={RoutePath.register} element={<Home />} />
          <Route path={RoutePath.checkout} element={<CheckoutComponent />} />
          <Route path={RoutePath.rfqs} element={<RfqsComponent />} />
          <Route
            path={RoutePath.quoteprice}
            element={<RfqQuotePriceComponent />}
          />
        </>
      )}

      <Route path={RoutePath.cart} element={<CartComponent />} />
      <Route path={RoutePath.shop} element={<ProductsComponent />} />
      <Route path={RoutePath.auctionpage} element={<AuctionComponent />} />
      <Route
        path={RoutePath.complete_profile}
        element={<CompleteRegistrationComponent />}
      />
      <Route path={RoutePath.product+'/:id'}  element={<ProductsDetailComponent />} />
      <Route path={RoutePath.auction} element={<AuctionDetailComponent />} />
    </Routes>
  );
};
export default AppRouter;
