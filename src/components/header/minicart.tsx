import React, { Component, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RoutePath from "../global/route-paths";
import authStore from "../store/auth-store";
import productStore from "../store/product-store";
import userStore from "../store/user-store";
import { observer } from "mobx-react-lite";
import cartService from "../services/cart-service";
const Minicart: React.FC<any> = () => {
  const navigate = useNavigate();
  const [proCategory, setproCategory] = useState([]);
  const [CurrentCategory, setCurrentCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [CartData, setCartData] = useState(Array);
  const [subTotal, setsubTotal] = useState(Number);
  useEffect(() => {
    getUserCart();
  }, [userStore?.cartItem]);

  const logOut = () => {
    authStore.signOut(localStorage.getItem("userToken"), () => {
      navigate(RoutePath.login);
    });
  };

  const getUserCart = () => {
    var tot = 0;
    var price = 0;
    if (userStore?.cartItem.length > 0) {
      userStore?.cartItem?.map(
        (item: any) => (
          (price = item.qty * item.productPrice), (tot = tot + price)
        )
      );
    }
    setsubTotal(tot);
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
    if ((CurrentCategory != "" && searchText != "") || id != null) {
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

  const handleItemremove = (item: any) => {
    console.log("item iss", item, item.id);
    if (item) {
      cartService
        .removeCartItem(item?.id)
        .then((response) => {
          if (response) {
            userStore.getUserCart(() => {
              console.log("haiiiii got response");
            });
          }
        })
        .catch((error) => {
          console.log("error occured", error);
        });
    }
  };

  return (
    <>
      <div className="dropdown cart-dropdown akhil">
        <a
          href="# "
          title="Cart"
          className="dropdown-toggle dropdown-arrow cart-toggle"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          data-display="static"
        >
          <i className="minicart-icon"></i>
          <span className="cart-count badge-circle">
            {userStore?.cartItem.length}
          </span>
        </a>
        <div className="cart-overlay"></div>
        <div className="dropdown-menu mobile-cart">
          <a href="# " title="Close (Esc)" className="btn-close">
            ×
          </a>
          <div className="dropdownmenu-wrapper custom-scrollbar">
            <div className="dropdown-cart-header">Shopping Cart</div>

            {userStore?.cartItem.length > 0 ? (
              <>
                <div className="dropdown-cart-products">
                  {userStore?.cartItem.map((item: any, index: number) => (
                    <div key={index} className="product">
                      <div className="product-details">
                        <h4 className="product-title">
                          <a href="# ">{item.productName}</a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">{item.qty}</span> ×
                          {item.productPrice}
                        </span>
                      </div>

                      <figure className="product-image-container">
                        <a href="# " className="product-image">
                          <img
                            src={
                              item?.images
                                ? item?.images[0]?.image
                                : "/assets/images/products/product-1.jpg"
                            }
                            alt="product"
                            width="80"
                            height="80"
                          />
                        </a>
                        <a
                          href="# "
                          className="btn-remove"
                          title="Remove Product"
                          onClick={() => handleItemremove(item)}
                        >
                          <span>×</span>
                        </a>
                      </figure>
                    </div>
                  ))}
                </div>

                <div className="dropdown-cart-total">
                  <span>SUBTOTAL:</span>
                  <span className="cart-total-price float-right">
                    ₹{subTotal}
                  </span>
                </div>

                <div className="dropdown-cart-action">
                  <a
                    onClick={() => navigate(RoutePath.cart)}
                    className="btn btn-gray btn-block view-cart"
                  >
                    View Cart
                  </a>
                  <a
                    onClick={() => navigate(RoutePath.checkout)}
                    className="btn btn-dark btn-block"
                  >
                    Checkout
                  </a>
                </div>
              </>
            ) : (
              "Empty Cart"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Minicart);
