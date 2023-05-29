import React, { Component, useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
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
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    getProductCategory();
    getUserCart();
  }, []);

  const logOut = () => {
    authStore.signOut(
      localStorage.getItem("userToken"),
      (res: any, err: any) => {
        if (res || err) navigate(RoutePath.login);
      }
    );
  };

  const getUserCart = () => {
    userStore.getUserCart((res: any) => {
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
     onSearch(e.target.value);
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
      setSearchText("");
      setCurrentCategory(""); // because affect second header selection result
      productStore.onSearch(data, (callback: any) => {
        if (callback.status) {
          navigate(RoutePath.shop, {
            state: { data: callback.data, searchQuery: data },
          });
        }
      });
    }
  };
 const handleClick = ()=>{
 // const element = document.getElementById('footerSection');
  //console.log("element isss",element);
  // if (element) {
    console.log("haiii");
  //   element.scrollIntoView({ behavior: 'smooth' });
  // }
  if(footerRef){
    console.log("inside");
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
 }
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
                <img src="../../assets/images/logo.png" alt="Porto Logo" />
              </a>
            </div>

            <div className="header-right w-lg-max pl-2">
              <div className="header-search header-icon header-search-inline header-search-category w-lg-max">
                <a href="# " className="search-toggle" role="button">
                  <i className="icon-search-3"></i>
                </a>
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
                    value={searchText}
                  />

                  <button
                    className="btn icon-magnifier"
                    type="submit"
                    onClick={() => onSearch(null)}
                  ></button>
                </div>
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
                  style={{ cursor: "pointer" }}
                  className="header-contact d-none d-lg-flex align-items-center pr-xl-5 mr-5 mr-xl-3 ml-5"
                >
                  <div className="dropdown">
                    <a
                      className="d-block text-dark ls-10 pt-1"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="icon-user-2"></i> Account
                    </a>
                    <div className="dropdown-menu">
                      <ul>
                        <li>
                          <a
                            href={
                              "https://demoaccount.stocknikalo.com/auto-login/" +
                              localStorage.getItem("userToken")
                            }
                            target={"_blank"}
                            style={{ cursor: "pointer" }}
                            className="d-block text-dark ls-10 pt-1 dropdown-item"
                          >
                            My Account
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" onClick={() => navigate(RoutePath.edit_profile)}>My Profile</a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            My Orders
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Wishlist
                          </a>
                        </li>
                        <li>
                          {localStorage.getItem("userId") != "null" && (
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => logOut()}
                              className="dropdown-item"
                            >
                              Logout
                            </a>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
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
                <li>
                  <a href="# " onClick={()=>navigate(RoutePath.home)}>Home</a>
                </li>
                <li>
                  <a href="# ">Relsol Group</a>
                </li>
                <li>
                  <a href="# " onClick={()=>navigate(RoutePath.rfqs)}>RFQs</a>
                </li>
                <li>
                  <a href="# " onClick={()=>navigate(RoutePath.auction)}>Auctions</a>
                </li>
                <li>
                  <a href="# ">Contacts</a>
                </li>
                <li>
                <Link to="#" onClick={ handleClick}>
              About
            </Link>
                  {/* <a href="# "onClick={handleClick}>About</a> */}
                </li>
              </ul>
            </nav>
            <nav className="main-nav w-100 bg-light">
              <ul className="menu">
                <li>
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle btn-flex"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Shop by Category <i className="fas fa-angle-down"></i>
                    </button>
                    <div className="dropdown-menu">
                      {proCategory?.map((item: any) => (
                        <a className="dropdown-item" 
                       // href="value={item.id}" 
                        onClick={() => onSearch(item.id)}>
                          {item.categoryname}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default observer(Header);
