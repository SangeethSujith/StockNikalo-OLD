import React, { Component, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RoutePath from "../global/route-paths";
import authStore from "../store/auth-store";
import productStore from "../store/product-store";
import userStore from "../store/user-store";
import Minicart from "./minicart";
const Header: React.FC<any> = () => {
  const navigate = useNavigate();
  const [proCategory, setproCategory] = useState([]);
  const [CurrentCategory, setCurrentCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [CartData, setCartData] = useState([]);
  const [subTotal, setsubTotal] = useState(Number);
  useEffect(() => {
    getProductCategory();
    getUserCart();
  }, []);

  const logOut = () => {
    authStore.signOut(localStorage.getItem("userToken"), () => {
      navigate(RoutePath.login);
    });
  };

  const getUserCart = () => {
    userStore.getUserCart((res: any) => {
      console.log(res);
      if (res.status) {
        setCartData(res.data);
        var tot = 0;
        var price = 0;
        res?.data?.map(
          (item: any) => (
            (price = item.qty * item.productPrice), (tot = tot + price)
          )
        );
        setsubTotal(tot);
      }
    });
  };

  const getProductCategory = () => {
    productStore.getProductCategory((values: any) => {
      setproCategory(values.data);
    });
  };
  const onTextChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleCategorySelect = (e: any) => {
    setCurrentCategory(e.target.value);
  };

  const onSearch = (id: any) => {
    if (CurrentCategory != "" || searchText != "" || id != null) {
      let data = {
        category_id: CurrentCategory ? CurrentCategory : id,
        subcategory_id: "",
        childcategory_id: "",
        product_name: searchText,
        min_rate: "",
        max_rate: "",
        sort_by: "",
        show: "",
        limit: 10,
        page: 1,
      };
      productStore.onSearch(data, (callback: any) => {
        if (callback.status) {
          navigate(RoutePath.shop, {
            state: { data: callback.data },
          });
        }
      });
    }
  };

  return (
    <>
      <header className="header home">
        <div className="header-middle text-dark sticky-header">
          <div className="container">
            <div className="header-left col-lg-2 w-auto pl-0">
              <button className="mobile-menu-toggler mr-2" type="button">
                <i className="fas fa-bars"></i>
              </button>
              <a
                onClick={() => navigate(RoutePath.home)}
                style={{ cursor: "pointer" }}
                className="logo"
              >
                <img
                  src="../../assets/images/logo.png"
                  width="111"
                  height="44"
                  alt="Porto Logo"
                />
              </a>
            </div>

            <div className="header-right w-lg-max pl-2">
              <div className="header-search header-icon header-search-inline header-search-category w-lg-max">
                <a href="# " className="search-toggle" role="button">
                  <i className="icon-search-3"></i>
                </a>
                {/* <form action="# " method="get"> */}
                <div className="header-search-wrapper">
                  <div className="select-custom">
                    <select id="cat" name="cat" onChange={handleCategorySelect}>
                      <option value="">All Category</option>
                      {proCategory?.map((item: any) => (
                        <option value={item.id}>{item.categoryname}</option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="search"
                    className="form-control"
                    name="q"
                    id="q"
                    placeholder="Search..."
                    required
                    onChange={onTextChange}
                  />

                  <button
                    className="btn icon-magnifier"
                    type="submit"
                    onClick={() => onSearch(null)}
                  ></button>
                </div>
                {/* </form> */}
              </div>
              {localStorage.getItem("userId") == "null" ? (
                <div
                  onClick={() => {
                    navigate(RoutePath.login);
                  }}
                  style={{ cursor: "pointer" }}
                  className="header-contact d-none d-lg-flex align-items-center pr-xl-5 mr-5 mr-xl-3 ml-5"
                >
                  <i className="icon-user-2"></i>
                  <h6 className="pt-1 line-height-1">
                    Login
                    <a className="d-block text-dark ls-10 pt-1">Register</a>
                  </h6>
                </div>
              ) : (
                <div
                  onClick={() => navigate(RoutePath.home)}
                  style={{ cursor: "pointer" }}
                  className="header-contact d-none d-lg-flex align-items-center pr-xl-5 mr-5 mr-xl-3 ml-5"
                >
                  <i className="icon-user-2"></i>
                  <h6 className="pt-1 line-height-1">
                    My
                    <a
                      // onClick={() => logOut()}
                      href={
                        "https://qriocty.com/auto-login/" +
                        localStorage.getItem("userToken")
                      }
                      target={"_blank"}
                      style={{ cursor: "pointer" }}
                      className="d-block text-dark ls-10 pt-1"
                    >
                      Account
                    </a>
                  </h6>
                </div>
              )}

              <a href="# " className="header-icon header-icon-user">
                <i className="fa fa-print"></i>
              </a>
              <a href="# " className="header-icon position-relative">
                <i className="fa fa-envelope"></i>
                <span className="cart-count badge-circle top-adj">3</span>
              </a>
              <Minicart />
            </div>
          </div>
        </div>

        <div
          className="header-bottom sticky-header d-none d-lg-block"
          data-sticky-options="{'mobile': false}"
        >
          <div className="container">
            <nav className="main-nav w-100">
              <ul className="menu">
                {/* <li>
                  <a href="# ">
                    <i className="fas fa-bars"></i> &nbsp;Ready To Ship
                  </a>
                  <ul>
                    <li>
                      <a href="# ">Ready To Ship 01</a>
                    </li>
                    <li>
                      <a href="# ">Ready To Ship 02</a>
                    </li>
                    <li>
                      <a href="# ">Ready To Ship 03</a>
                    </li>
                  </ul>
                </li> */}

                {proCategory
                  ?.filter((item, index) => index < 7)
                  .map((item: any) => (
                    <li>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => onSearch(item.id)}
                      >
                        {item.categoryname}
                      </a>
                    </li>
                  ))}

                {/* <li>
                  <a href="# ">Trade Show</a>
                </li>
                <li>
                  <a href="# ">Personal Protectieve Equipment</a>
                </li>
                <li>
                  <a href="# ">Services</a>
                  <ul>
                    <li>
                      <a href="# ">Services 01</a>
                    </li>
                    <li>
                      <a href="# ">Services 02</a>
                    </li>
                    <li>
                      <a href="# ">Services 03</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="# ">Sell On Stocknikalo</a>
                  <ul>
                    <li>
                      <a href="# ">Sell On Stocknikalo 01</a>
                    </li>
                    <li>
                      <a href="# ">Sell On Stocknikalo 02</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="# ">Help</a>
                  <ul>
                    <li>
                      <a href="# ">Help</a>
                    </li>
                  </ul>
                </li> */}
                {localStorage.getItem("userId") != "null" && (
                  <li className="float-right">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => logOut()}
                      className="pl-5"
                    >
                      Logout
                    </a>
                    {/* <ul>
                    <li>
                      <a href="# ">USD</a>
                    </li>
                    <li>
                      <a href="# ">INR</a>
                    </li>
                  </ul> */}
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
