import React, { Component } from "react";
class Header extends Component {
  render() {
    return (
      <>
        <header className="header home">
          <div className="header-middle text-dark sticky-header">
            <div className="container">
              <div className="header-left col-lg-2 w-auto pl-0">
                <button className="mobile-menu-toggler mr-2" type="button">
                  <i className="fas fa-bars"></i>
                </button>
                <a href="# " className="logo">
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
                  <form action="# " method="get">
                    <div className="header-search-wrapper">
                      <div className="select-custom">
                        <select id="cat" name="cat">
                          <option value="">All Category</option>
                          <option value="4">Fashion</option>
                          <option value="12">- Women</option>
                          <option value="13">- Men</option>
                          <option value="66">- Jewellery</option>
                          <option value="67">- Kids Fashion</option>
                          <option value="5">Electronics</option>
                          <option value="21">- Smart TVs</option>
                          <option value="22">- Cameras</option>
                          <option value="63">- Games</option>
                          <option value="7">Home &amp; Garden</option>
                          <option value="11">Motors</option>
                          <option value="31">- Cars and Trucks</option>
                          <option value="32">
                            - Motorcycles &amp; Powersports
                          </option>
                          <option value="33">- Parts &amp; Accessories</option>
                          <option value="34">- Boats</option>
                          <option value="57">
                            - Auto Tools &amp; Supplies
                          </option>
                        </select>
                      </div>
                      <input
                        type="search"
                        className="form-control"
                        name="q"
                        id="q"
                        placeholder="Search..."
                        required
                      />

                      <button
                        className="btn icon-magnifier"
                        type="submit"
                      ></button>
                    </div>
                  </form>
                </div>
                <div className="header-contact d-none d-lg-flex align-items-center pr-xl-5 mr-5 mr-xl-3 ml-5">
                  <i className="icon-user-2"></i>
                  <h6 className="pt-1 line-height-1">
                    Login
                    <a href="tel:#" className="d-block text-dark ls-10 pt-1">
                      Register
                    </a>
                  </h6>
                </div>
                <a href="# " className="header-icon header-icon-user">
                  <i className="fa fa-print"></i>
                </a>
                <a href="# " className="header-icon position-relative">
                  <i className="fa fa-envelope"></i>
                  <span className="cart-count badge-circle top-adj">3</span>
                </a>
                <div className="dropdown cart-dropdown">
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
                    <span className="cart-count badge-circle">3</span>
                  </a>
                  <div className="cart-overlay"></div>
                  <div className="dropdown-menu mobile-cart">
                    <a href="# " title="Close (Esc)" className="btn-close">
                      ×
                    </a>
                    <div className="dropdownmenu-wrapper custom-scrollbar">
                      <div className="dropdown-cart-header">Shopping Cart</div>

                      <div className="dropdown-cart-products">
                        <div className="product">
                          <div className="product-details">
                            <h4 className="product-title">
                              <a href="# ">Ultimate 3D Bluetooth Speaker</a>
                            </h4>
                            <span className="cart-product-info">
                              <span className="cart-product-qty">1</span> ×
                              $99.00
                            </span>
                          </div>

                          <figure className="product-image-container">
                            <a href="# " className="product-image">
                              <img
                                src="assets/images/products/product-1.jpg"
                                alt="product"
                                width="80"
                                height="80"
                              />
                            </a>
                            <a
                              href="# "
                              className="btn-remove"
                              title="Remove Product"
                            >
                              <span>×</span>
                            </a>
                          </figure>
                        </div>

                        <div className="product">
                          <div className="product-details">
                            <h4 className="product-title">
                              <a href="# ">Brown Women Casual HandBag</a>
                            </h4>
                            <span className="cart-product-info">
                              <span className="cart-product-qty">1</span> ×
                              $35.00
                            </span>
                          </div>
                          <figure className="product-image-container">
                            <a href="# " className="product-image">
                              <img
                                src="assets/images/products/product-2.jpg"
                                alt="product"
                                width="80"
                                height="80"
                              />
                            </a>
                            <a
                              href="# "
                              className="btn-remove"
                              title="Remove Product"
                            >
                              <span>×</span>
                            </a>
                          </figure>
                        </div>

                        <div className="product">
                          <div className="product-details">
                            <h4 className="product-title">
                              <a href="# ">Circled Ultimate 3D Speaker</a>
                            </h4>
                            <span className="cart-product-info">
                              <span className="cart-product-qty">1</span> ×
                              $35.00
                            </span>
                          </div>

                          <figure className="product-image-container">
                            <a href="# " className="product-image">
                              <img
                                src="assets/images/products/product-1.jpg"
                                alt="product"
                                width="80"
                                height="80"
                              />
                            </a>
                            <a
                              href="# "
                              className="btn-remove"
                              title="Remove Product"
                            >
                              <span>×</span>
                            </a>
                          </figure>
                        </div>
                      </div>

                      <div className="dropdown-cart-total">
                        <span>SUBTOTAL:</span>
                        <span className="cart-total-price float-right">
                          $134.00
                        </span>
                      </div>

                      <div className="dropdown-cart-action">
                        <a
                          href="# "
                          className="btn btn-gray btn-block view-cart"
                        >
                          View Cart
                        </a>
                        <a href="# " className="btn btn-dark btn-block">
                          Checkout
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
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
                  </li>
                  <li>
                    <a href="# ">Ready To Ship</a>
                  </li>
                  <li>
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
                  </li>
                  <li className="float-right">
                    <a href="# " className="pl-5">
                      English USD
                    </a>
                    <ul>
                      <li>
                        <a href="# ">USD</a>
                      </li>
                      <li>
                        <a href="# ">INR</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
