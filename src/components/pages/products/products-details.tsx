import React, { useState, useEffect } from "react";
import productStore from "../../store/product-store";
import RoutePath from "../../global/route-paths";
import { useNavigate, useParams } from "react-router-dom";

type ProductsProps = {};

const ProductsDetailComponent: React.FC<any> = (props: ProductsProps) => {
  const navigate = useNavigate();
  const [pid, setPid] = useState();
  const [CartQty, setCartQty] = useState();
  const [ProductsData, setProductsData] = useState([]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product: any = urlParams.get("id");
  const addtoCart = () => {
    let qty: any = document.getElementById("cartqty");
    qty = qty.value;
    const data = {
      userId: parseInt(localStorage.getItem("userId")!),
      cartType: 1,
      cartItems: [
        {
          productId: parseInt(product),
          qty: parseInt(qty),
          productPrice: parseInt(ProductsData[0]?.["salePrice"]),
        },
      ],
    };
    productStore.addtocart(data, (res: any) => {
      // if (res.status) {
      //   setProductsData(res.data);
      // } else {
      //   navigate(RoutePath.home);
      // }
    });
  };
  const getProductDetails = () => {
    productStore.getProductsDetails(product, (res: any) => {
      console.log(res.data);
      if (res.status) {
        setProductsData(res.data);
      } else {
        navigate(RoutePath.home);
      }
    });
  };
  useEffect(() => {
    setPid(product);
  }, []);
  useEffect(() => {
    getProductDetails();
  }, [product]);
  return (
    <>
      <main className="main">
        <div className="container">
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="demo4.html">
                  <i className="icon-home" />
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Products</a>
              </li>
            </ol>
          </nav>
          <div className="product-single-container product-single-info">
            <div className="cart-message d-none">
              {" "}
              <strong className="single-cart-notice">
                "Men Black Sports Shoes"
              </strong>{" "}
              <span>has been added to your cart.</span>{" "}
            </div>
            <div className="row">
              <div className="col-lg-5 col-md-6 product-single-gallery">
                <div className="product-item">
                  <div className="inner">
                    {" "}
                    <img
                      src="assets/images/products/product-1.jpg"
                      data-zoom-image="assets/images/products/product-1.jpg"
                      width={480}
                      height={480}
                      alt="proudct-img"
                    />{" "}
                    <span className="prod-full-screen">
                      {" "}
                      <i className="icon-plus" />{" "}
                    </span>{" "}
                  </div>
                </div>
                {/* End .product-item */}
                <div className="product-item">
                  <div className="inner">
                    {" "}
                    <img
                      src="assets/images/products/product-2.jpg"
                      data-zoom-image="assets/images/products/product-2.jpg"
                      width={480}
                      height={480}
                      alt="proudct-img"
                    />{" "}
                    <span className="prod-full-screen">
                      {" "}
                      <i className="icon-plus" />{" "}
                    </span>{" "}
                  </div>
                </div>
                {/* End .product-item */}
                <div className="product-item">
                  <div className="inner">
                    {" "}
                    <img
                      src="assets/images/products/product-1.jpg"
                      data-zoom-image="assets/images/products/product-1.jpg"
                      width={480}
                      height={480}
                      alt="proudct-img"
                    />{" "}
                    <span className="prod-full-screen">
                      {" "}
                      <i className="icon-plus" />{" "}
                    </span>{" "}
                  </div>
                </div>
                {/* End .product-item */}
              </div>
              {/* End .col-md-5 */}
              <div className="col-lg-7 col-md-6">
                <div className="sidebar-wrapper">
                  <div className="product-single-details">
                    <h1 className="product-title">
                      {ProductsData[0]?.["productName"]}
                    </h1>
                    <div className="product-nav">
                      <div className="product-prev">
                        {" "}
                        <a href="#">
                          {" "}
                          <span className="product-link" />{" "}
                          <span className="product-popup">
                            {" "}
                            <span className="box-content">
                              {" "}
                              <img
                                alt="product"
                                width={150}
                                height={150}
                                src="assets/images/products/product-1.jpg"
                                style={{ paddingTop: 0 }}
                              />{" "}
                              <span>Circled Ultimate 3D Speaker</span>{" "}
                            </span>{" "}
                          </span>{" "}
                        </a>{" "}
                      </div>
                      <div className="product-next">
                        {" "}
                        <a href="#">
                          {" "}
                          <span className="product-link" />{" "}
                          <span className="product-popup">
                            {" "}
                            <span className="box-content">
                              {" "}
                              <img
                                alt="product"
                                width={150}
                                height={150}
                                src="assets/images/products/product-2.jpg"
                                style={{ paddingTop: 0 }}
                              />{" "}
                              <span>Blue Backpack for the Young</span>{" "}
                            </span>{" "}
                          </span>{" "}
                        </a>{" "}
                      </div>
                    </div>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        {" "}
                        <span className="ratings" style={{ width: "60%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top" />{" "}
                      </div>
                      {/* End .product-ratings */}
                      <a href="#" className="rating-link">
                        ( 6 Reviews )
                      </a>{" "}
                    </div>
                    {/* End .ratings-container */}
                    <hr className="short-divider" />
                    <div className="price-box">
                      {" "}
                      <span className="old-price">
                        ₹{ProductsData[0]?.["mrp"]}
                      </span>{" "}
                      <span className="new-price">
                        ₹{ProductsData[0]?.["salePrice"]}
                      </span>{" "}
                    </div>
                    {/* End .price-box */}
                    <div className="product-desc">
                      <p> {ProductsData[0]?.["shortDescription1"]} </p>
                    </div>
                    {/* End .product-desc */}
                    <ul className="single-info-list">
                      {/**/}
                      <li>
                        {" "}
                        SKU: <strong>{ProductsData[0]?.["sku"]}</strong>{" "}
                      </li>
                      <li>
                        {" "}
                        CATEGORY:{" "}
                        <strong>
                          {" "}
                          <a href="#" className="product-category">
                            {ProductsData[0]?.["category"]}
                          </a>{" "}
                        </strong>{" "}
                      </li>
                    </ul>
                    <div className="product-action">
                      {/* <div className="price-box product-filtered-price">
                        {" "}
                        <del className="old-price">
                          {" "}
                          <span>₹{ProductsData[0]?.["mrp"]}</span>
                        </del>{" "}
                        <span className="product-price">
                          {" "}
                          ₹{ProductsData[0]?.["salePrice"]}
                        </span>{" "}
                      </div> */}
                      <div className="product-single-qty">
                        <input
                          className="horizontal-quantity form-control"
                          type="text"
                          id="cartqty"
                          value={CartQty}
                          onChange={(val: any) => setCartQty(val)}
                        />
                      </div>
                      {/* End .product-single-qty */}
                      <a
                        href="# "
                        onClick={() => {
                          if (localStorage.getItem("userId") == "null") {
                            navigate(RoutePath.login);
                          } else if (
                            localStorage.getItem("userCmpReg") == "0"
                          ) {
                            navigate(RoutePath.complete_profile);
                          } else {
                            addtoCart();
                          }
                        }}
                        className="btn btn-dark disabled add-cart icon-shopping-cart mr-2"
                        title="Add to Cart"
                      >
                        Add to Cart
                      </a>{" "}
                      <a
                        onClick={() => navigate(RoutePath.cart)}
                        className="btn btn-gray view-cart d-none"
                      >
                        View cart
                      </a>{" "}
                    </div>
                    {/* End .product-action */}
                    <hr className="divider mb-0 mt-0" />
                    <a
                      href="wishlist.html"
                      className="btn-icon-wish add-wishlist justify-content-start"
                      title="Add to Wishlist"
                    >
                      <i className="icon-wishlist-2" />
                      <span>Add to Wishlist</span>
                    </a>{" "}
                  </div>
                  {/* End .product-single-details */}
                </div>
              </div>
              {/* End .col-md-7 */}
            </div>
            <div className="row align-items-start">
              <div className="widget widget-info col-md-9 col-xl-6 pb-4 pb-md-0">
                <ul className="promote">
                  <li>
                    {" "}
                    <i className="icon-shipped" />
                    <h4>
                      FREE
                      <br />
                      SHIPPING
                    </h4>
                  </li>
                  <li>
                    {" "}
                    <i className="icon-us-dollar" />
                    <h4>
                      100% MONEY
                      <br />
                      BACK GUARANTEE
                    </h4>
                  </li>
                  <li>
                    {" "}
                    <i className="icon-online-support" />
                    <h4>
                      ONLINE
                      <br />
                      SUPPORT 24/7
                    </h4>
                  </li>
                </ul>
              </div>
              {/* End .widget */}
              <div className="product-single-share col-md-3 col-xl-6 align-items-start justify-content-md-end mt-0">
                <label className="sr-only">Share:</label>
                <div className="social-icons mt-0 pb-5 pb-md-0">
                  {" "}
                  <a
                    href="#"
                    className="social-icon social-facebook icon-facebook"
                    target="_blank"
                    title="Facebook"
                  />{" "}
                  <a
                    href="#"
                    className="social-icon social-twitter icon-twitter"
                    target="_blank"
                    title="Twitter"
                  />{" "}
                  <a
                    href="#"
                    className="social-icon social-linkedin fab fa-linkedin-in"
                    target="_blank"
                    title="Linkedin"
                  />{" "}
                  <a
                    href="#"
                    className="social-icon social-gplus fab fa-google-plus-g"
                    target="_blank"
                    title="Google +"
                  />{" "}
                  <a
                    href="#"
                    className="social-icon social-mail icon-mail-alt"
                    target="_blank"
                    title="Mail"
                  />{" "}
                </div>
                {/* End .social-icons */}
              </div>
              {/* End .product-single-share */}
            </div>
            {/* End .row */}
          </div>
          {/* End .product-single-container */}
        </div>
        {/* End .products-section */}
        <div className="product-single-tabs custom-product-single-tabs bg-gray mb-4">
          <div className="container">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link active"
                  id="product-tab-desc"
                  data-toggle="tab"
                  href="#product-desc-content"
                  role="tab"
                  aria-controls="product-desc-content"
                  aria-selected="true"
                >
                  Description
                </a>{" "}
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  id="product-tab-reviews"
                  data-toggle="tab"
                  href="#product-reviews-content"
                  role="tab"
                  aria-controls="product-reviews-content"
                  aria-selected="false"
                >
                  Reviews (1)
                </a>{" "}
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  id="product-tab-tags"
                  data-toggle="tab"
                  href="#product-tags-content"
                  role="tab"
                  aria-controls="product-tags-content"
                  aria-selected="false"
                >
                  Custom Tab
                </a>{" "}
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="product-desc-content"
                role="tabpanel"
                aria-labelledby="product-tab-desc"
              >
                <div className="product-desc-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur
                    sed do, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat.
                  </p>
                  <ul>
                    <li>
                      Any Product types that You want - Simple, Configurable{" "}
                    </li>
                    <li>Downloadable/Digital Products, Virtual Products </li>
                    <li>Inventory Management with Backordered items </li>
                  </ul>
                  <p>
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </p>
                </div>
                {/* End .product-desc-content */}
              </div>
              {/* End .tab-pane */}
              {/* End .tab-pane */}
              <div
                className="tab-pane fade"
                id="product-reviews-content"
                role="tabpanel"
                aria-labelledby="product-tab-reviews"
              >
                <div className="product-reviews-content">
                  <h3 className="reviews-title">
                    1 review for Men Black Sports Shoes
                  </h3>
                  <div className="comment-list">
                    <div className="comments">
                      <figure className="img-thumbnail">
                        {" "}
                        <img
                          src="assets/images/blog/author.jpg"
                          alt="author"
                          width={80}
                          height={80}
                        />{" "}
                      </figure>
                      <div className="comment-block">
                        <div className="comment-header">
                          <div className="comment-arrow" />
                          <div className="ratings-container float-sm-right">
                            <div className="product-ratings">
                              {" "}
                              <span
                                className="ratings"
                                style={{ width: "60%" }}
                              />
                              {/* End .ratings */}
                              <span className="tooltiptext tooltip-top" />{" "}
                            </div>
                            {/* End .product-ratings */}
                          </div>
                          <span className="comment-by">
                            {" "}
                            <strong>Joe Doe</strong> – April 12, 2018{" "}
                          </span>{" "}
                        </div>
                        <div className="comment-content">
                          <p>Excellent.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="add-product-review">
                    <h3 className="review-title">Add a review</h3>
                    <form action="#" className="comment-form m-0">
                      <div className="rating-form">
                        <label htmlFor="rating">
                          Your rating <span className="required">*</span>
                        </label>
                        <span className="rating-stars">
                          {" "}
                          <a className="star-1" href="#">
                            1
                          </a>{" "}
                          <a className="star-2" href="#">
                            2
                          </a>{" "}
                          <a className="star-3" href="#">
                            3
                          </a>{" "}
                          <a className="star-4" href="#">
                            4
                          </a>{" "}
                          <a className="star-5" href="#">
                            5
                          </a>{" "}
                        </span>
                        <select
                          name="rating"
                          id="rating"
                          style={{ display: "none" }}
                        >
                          <option value="">Rate…</option>
                          <option value={5}>Perfect</option>
                          <option value={4}>Good</option>
                          <option value={3}>Average</option>
                          <option value={2}>Not that bad</option>
                          <option value={1}>Very poor</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>
                          Your review <span className="required">*</span>
                        </label>
                        <textarea
                          cols={5}
                          rows={6}
                          className="form-control form-control-sm"
                          defaultValue={""}
                        />
                      </div>
                      {/* End .form-group */}
                      <div className="row">
                        <div className="col-md-6 col-xl-12">
                          <div className="form-group">
                            <label>
                              Name <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                            />
                          </div>
                          {/* End .form-group */}
                        </div>
                        <div className="col-md-6 col-xl-12">
                          <div className="form-group">
                            <label>
                              Email <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                            />
                          </div>
                          {/* End .form-group */}
                        </div>
                        <div className="col-md-12">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="save-name"
                            />
                            <label
                              className="custom-control-label mb-0"
                              htmlFor="save-name"
                            >
                              Save my name, email, and website in this browser
                              for the next time I comment.
                            </label>
                          </div>
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        defaultValue="Submit"
                      />
                    </form>
                  </div>
                  {/* End .add-product-review */}
                </div>
                {/* End .product-reviews-content */}
              </div>
              {/* End .tab-pane */}
              <div
                className="tab-pane fade"
                id="product-tags-content"
                role="tabpanel"
                aria-labelledby="product-tab-tags"
              >
                {" "}
                Custom Tab Content{" "}
              </div>
              {/* End .tab-pane */}
            </div>
            {/* End .tab-content */}
          </div>
        </div>
        {/* End .product-single-tabs */}
        <section
          className="product-section1 mt-3"
          style={{ backgroundColor: "#FFF" }}
        >
          <div className="container">
            <h2
              className="title title-underline pb-1 appear-animate"
              data-animation-name="fadeInLeftShorter"
            >
              Related Products
            </h2>
            <div
              className="owl-carousel owl-theme appear-animate"
              data-owl-options="{
              'loop': false,
              'dots': false,
              'nav': true,
              'margin': 20,
              'responsive': {
                  '0': {
                      'items': 1
                  },
                  '576': {
                      'items': 4
                  },
                  '991': {
                      'items': 5
                  }
              }
          }"
            >
              <div className="product-default inner-quickview inner-icon">
                <figure>
                  {" "}
                  <a href="#">
                    {" "}
                    <img
                      src="assets/images/products/product-1.jpg"
                      width={300}
                      height={300}
                      alt="product"
                    />{" "}
                  </a>{" "}
                </figure>
                <div className="product-details">
                  <div className="category-wrap">
                    <div className="category-list">
                      {" "}
                      <a
                        href="#"
                        className="bg-success p-2 rounded-1 text-white"
                      >
                        4.3&nbsp;
                        <i className="fa fa-star" />
                      </a>{" "}
                      (2389){" "}
                    </div>
                  </div>
                  <h3 className="product-title">
                    {" "}
                    <a href="#">
                      iBELL M200-105 IGBT Inverter 2 in 1 Flux Core/Solid Wire
                      MAG Welding Machine with 1 Year Warranty
                    </a>{" "}
                  </h3>
                  {/* End .product-container */}
                  <div className="price-box">
                    {" "}
                    <span className="product-price">$259.00</span>{" "}
                    <del className="old-price">$299.00</del>
                    <div className="category-list">
                      {" "}
                      <a href="#">50% OFF</a>{" "}
                    </div>
                  </div>
                  {/* End .price-box */}
                </div>
                {/* End .product-details */}
              </div>
              <div className="product-default inner-quickview inner-icon">
                <figure>
                  {" "}
                  <a href="#">
                    {" "}
                    <img
                      src="assets/images/products/product-1.jpg"
                      width={300}
                      height={300}
                      alt="product"
                    />{" "}
                  </a>{" "}
                </figure>
                <div className="product-details">
                  <div className="category-wrap">
                    <div className="category-list">
                      {" "}
                      <a
                        href="#"
                        className="bg-success p-2 rounded-1 text-white"
                      >
                        4.3&nbsp;
                        <i className="fa fa-star" />
                      </a>{" "}
                      (2389){" "}
                    </div>
                  </div>
                  <h3 className="product-title">
                    {" "}
                    <a href="#">
                      iBELL M200-105 IGBT Inverter 2 in 1 Flux Core/Solid Wire
                      MAG Welding Machine with 1 Year Warranty
                    </a>{" "}
                  </h3>
                  {/* End .product-container */}
                  <div className="price-box">
                    {" "}
                    <span className="product-price">$259.00</span>{" "}
                    <del className="old-price">$299.00</del>
                    <div className="category-list">
                      {" "}
                      <a href="#">50% OFF</a>{" "}
                    </div>
                  </div>
                  {/* End .price-box */}
                </div>
                {/* End .product-details */}
              </div>
              <div className="product-default inner-quickview inner-icon">
                <figure>
                  {" "}
                  <a href="#">
                    {" "}
                    <img
                      src="assets/images/products/product-1.jpg"
                      width={300}
                      height={300}
                      alt="product"
                    />{" "}
                  </a>{" "}
                </figure>
                <div className="product-details">
                  <div className="category-wrap">
                    <div className="category-list">
                      {" "}
                      <a
                        href="#"
                        className="bg-success p-2 rounded-1 text-white"
                      >
                        4.3&nbsp;
                        <i className="fa fa-star" />
                      </a>{" "}
                      (2389){" "}
                    </div>
                  </div>
                  <h3 className="product-title">
                    {" "}
                    <a href="#">
                      iBELL M200-105 IGBT Inverter 2 in 1 Flux Core/Solid Wire
                      MAG Welding Machine with 1 Year Warranty
                    </a>{" "}
                  </h3>
                  {/* End .product-container */}
                  <div className="price-box">
                    {" "}
                    <span className="product-price">$259.00</span>{" "}
                    <del className="old-price">$299.00</del>
                    <div className="category-list">
                      {" "}
                      <a href="#">50% OFF</a>{" "}
                    </div>
                  </div>
                  {/* End .price-box */}
                </div>
                {/* End .product-details */}
              </div>
              <div className="product-default inner-quickview inner-icon">
                <figure>
                  {" "}
                  <a href="#">
                    {" "}
                    <img
                      src="assets/images/products/product-1.jpg"
                      width={300}
                      height={300}
                      alt="product"
                    />{" "}
                  </a>{" "}
                </figure>
                <div className="product-details">
                  <div className="category-wrap">
                    <div className="category-list">
                      {" "}
                      <a
                        href="#"
                        className="bg-success p-2 rounded-1 text-white"
                      >
                        4.3&nbsp;
                        <i className="fa fa-star" />
                      </a>{" "}
                      (2389){" "}
                    </div>
                  </div>
                  <h3 className="product-title">
                    {" "}
                    <a href="#">
                      iBELL M200-105 IGBT Inverter 2 in 1 Flux Core/Solid Wire
                      MAG Welding Machine with 1 Year Warranty
                    </a>{" "}
                  </h3>
                  {/* End .product-container */}
                  <div className="price-box">
                    {" "}
                    <span className="product-price">$259.00</span>{" "}
                    <del className="old-price">$299.00</del>
                    <div className="category-list">
                      {" "}
                      <a href="#">50% OFF</a>{" "}
                    </div>
                  </div>
                  {/* End .price-box */}
                </div>
                {/* End .product-details */}
              </div>
              <div className="product-default inner-quickview inner-icon">
                <figure>
                  {" "}
                  <a href="#">
                    {" "}
                    <img
                      src="assets/images/products/product-1.jpg"
                      width={300}
                      height={300}
                      alt="product"
                    />{" "}
                  </a>{" "}
                </figure>
                <div className="product-details">
                  <div className="category-wrap">
                    <div className="category-list">
                      {" "}
                      <a
                        href="#"
                        className="bg-success p-2 rounded-1 text-white"
                      >
                        4.3&nbsp;
                        <i className="fa fa-star" />
                      </a>{" "}
                      (2389){" "}
                    </div>
                  </div>
                  <h3 className="product-title">
                    {" "}
                    <a href="#">
                      iBELL M200-105 IGBT Inverter 2 in 1 Flux Core/Solid Wire
                      MAG Welding Machine with 1 Year Warranty
                    </a>{" "}
                  </h3>
                  {/* End .product-container */}
                  <div className="price-box">
                    {" "}
                    <span className="product-price">$259.00</span>{" "}
                    <del className="old-price">$299.00</del>
                    <div className="category-list">
                      {" "}
                      <a href="#">50% OFF</a>{" "}
                    </div>
                  </div>
                  {/* End .price-box */}
                </div>
                {/* End .product-details */}
              </div>
              <div className="product-default inner-quickview inner-icon">
                <figure>
                  {" "}
                  <a href="#">
                    {" "}
                    <img
                      src="assets/images/products/product-1.jpg"
                      width={300}
                      height={300}
                      alt="product"
                    />{" "}
                  </a>{" "}
                </figure>
                <div className="product-details">
                  <div className="category-wrap">
                    <div className="category-list">
                      {" "}
                      <a
                        href="#"
                        className="bg-success p-2 rounded-1 text-white"
                      >
                        4.3&nbsp;
                        <i className="fa fa-star" />
                      </a>{" "}
                      (2389){" "}
                    </div>
                  </div>
                  <h3 className="product-title">
                    {" "}
                    <a href="#">
                      iBELL M200-105 IGBT Inverter 2 in 1 Flux Core/Solid Wire
                      MAG Welding Machine with 1 Year Warranty
                    </a>{" "}
                  </h3>
                  {/* End .product-container */}
                  <div className="price-box">
                    {" "}
                    <span className="product-price">$259.00</span>{" "}
                    <del className="old-price">$299.00</del>
                    <div className="category-list">
                      {" "}
                      <a href="#">50% OFF</a>{" "}
                    </div>
                  </div>
                  {/* End .price-box */}
                </div>
                {/* End .product-details */}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* End .main */}
    </>
  );
};

export default ProductsDetailComponent;
