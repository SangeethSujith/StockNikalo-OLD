import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import productStore from "../../store/product-store";
import userStore from "../../store/user-store";
import RoutePath from "../../global/route-paths";
// import "./style.css";
import swal from "sweetalert";
type ProductsProps = {};

const AuctionComponent: React.FC<any> = (props: ProductsProps) => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const [SearchResult, setSearchResult] = useState([]);
  const [itemPopup, setitemPopup] = useState(true);
  const [isaddtosucc, setisaddtosucc] = useState(true);
  const [itemData, setitemData] = useState(Array);
  const [pid, setPid] = useState("");
  const [price, setPrice] = useState("");
  const [proCategory, setproCategory] = useState([]);
  useEffect(() => {
    const search = location.state?.data;
    if (search != undefined && search.length > 0) {
      setSearchResult(search);
    }
  }, [location.state?.data]);
  useEffect(() => {
    getProductsData();
    getProductCategory();
  }, []);

  const getProductsData = () => {
    productStore.getAuction((values: any) => {
      if (location.state?.data == undefined) {
        setSearchResult(values.data);
      }
    });
  };
const removeCart = () => {
    userStore.removeCart((res: any) => {});
  };
  const addtoCart = () => {
    console.log(itemData,"itemData")
    let qty: any = document.getElementById("cartqty");
    qty = qty.value;
    const data = {
      userId: parseInt(localStorage.getItem("userId")!),
      cartType: 1,
      cartItems: [
        {
          productId: parseInt(pid),
          qty: parseInt(qty),
          productPrice: parseInt(price),
        },
      ],
    };
    productStore.addtocart(data, (res: any) => {
      if (res.status) {
        setisaddtosucc(false);
      }
    });
  };

const onSearch = (id: any) => {
    if (id != null) {
      let data = {
        category_id: id,
        subcategory_id: "",
        childcategory_id: "",
        product_name: "",
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


  const getUserCart = (e: any) => {
     console.log("add to")
    userStore.getUserCart((res: any) => {
      console.log(res);
      if (res.status) {
        if (res?.data?.length > 0) {
          swal({
            title: "Are you sure?",
            text: "You have items from another seller added to the cart. Do you want to clear the cart and add this item?",
            icon: "warning",
            buttons: ["No, cancel it!", "Yes, I am sure!"],
            dangerMode: true,
          }).then(function (isConfirm) {
            if (isConfirm) {
              removeCart();
              addtoCart();
              
              e.target.classList.add("added-to-cart");
              swal({
                title: "Added to cart",
                text: "Product added to cart successfully!",
                icon: "success",
              }).then(function () {
                // form.submit(); // <--- submit form programmatically
              });
            } else {
              // swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
        }
      } else {
        addtoCart();
        swal({
                title: "Added to cart",
                text: "Product added to cart successfully!",
                icon: "success",
              }).then(function () {
                // form.submit(); // <--- submit form programmatically
              });
      }
    });
  };

  const handleClick = (id:any,price:any) =>
  {
    let item = SearchResult?.filter((item: any) => item?.productId == id);
    setitemData(item);
    setPid(id);
    setPrice(price);
    setitemPopup(false);
  }
  const handleClose = () =>
  {
    setitemPopup(true);
    }

  const getProductCategory = () => {
    productStore.getProductCategory((values: any) => {
      setproCategory(values.data);
    });
  };

  return (
    <>
 
  <main className="main">
    <div className="container">
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">
              <i className="icon-home" />
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Air Handling</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Accessories
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-lg-9">
          <div className="d-flex">
            <input
              type="search"
              className="form-control"
              name="q"
              id="q"
              placeholder="Search..."
              required
            />
            {/* End .select-custom */}
            <button className="btn icon-magnifier" type="submit" />
          </div>
          <nav
            className="toolbox sticky-header mt-2"
            data-sticky-options="{'mobile': true}"
          >
            <div className="toolbox-left">
              {" "}
              <a href="#" className="sidebar-toggle">
                <svg
                  data-name="Layer 3"
                  id="Layer_3"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1={15} x2={26} y1={9} y2={9} className="cls-1" />
                  <line x1={6} x2={9} y1={9} y2={9} className="cls-1" />
                  <line x1={23} x2={26} y1={16} y2={16} className="cls-1" />
                  <line x1={6} x2={17} y1={16} y2={16} className="cls-1" />
                  <line x1={17} x2={26} y1={23} y2={23} className="cls-1" />
                  <line x1={6} x2={11} y1={23} y2={23} className="cls-1" />
                  <path
                    d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z"
                    className="cls-2"
                  ></path>
                  <path
                    d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z"
                    className="cls-2"
                  />
                  <path
                    d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z"
                    className="cls-3"
                  />
                  <path
                    d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z"
                    className="cls-2"
                  ></path>
                </svg>
                <span>Filter</span>{" "}
              </a>
              <div className="toolbox-item toolbox-sort">
                <label>Sort By:</label>
                <div className="select-custom">
                  <select name="orderby" className="form-control">
                    <option value="menu_order">
                      Default sorting
                    </option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="rating">Sort by average rating</option>
                    <option value="date">Sort by newness</option>
                    <option value="price">Sort by price: low to high</option>
                    <option value="price-desc">
                      Sort by price: high to low
                    </option>
                  </select>
                </div>
                {/* End .select-custom */}
              </div>
              {/* End .toolbox-item */}
            </div>
            {/* End .toolbox-left */}
            <div className="toolbox-right">
              <div className="toolbox-item toolbox-show">
                <label>Show:</label>
                <div className="select-custom">
                  <select name="count" className="form-control">
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                  </select>
                </div>
                {/* End .select-custom */}
              </div>
              {/* End .toolbox-item */}
              <div className="toolbox-item layout-modes">
                {" "}
                <a href="#" className="layout-btn btn-grid active" title="Grid">
                  {" "}
                  <i className="icon-mode-grid" />{" "}
                </a>{" "}
                <a href="#" className="layout-btn btn-list" title="List">
                  {" "}
                  <i className="icon-mode-list" />{" "}
                </a>{" "}
              </div>
              {/* End .layout-modes */}
            </div>
            {/* End .toolbox-right */}
          </nav>
              <div className="row">
                

                {Array.isArray(SearchResult) && SearchResult.length > 0 &&
                  SearchResult?.map((item: any) => (
                    <div className="col-6 col-sm-4">
                      <div className="product-default">
                        <figure>
                          {" "}
                          <a href={`/auction?id=${item.id}`}>
                            {" "}
                            <img
                              src="/assets/images/products/product-1.jpg"
                              width={280}
                              height={280}
                              alt="product"
                            />{" "}
                            <img
                              src="/assets/images/products/product-2.jpg"
                              width={280}
                              height={280}
                              alt="product"
                            />{" "}
                          </a>
                          <div className="label-group">
                            <div className="product-label label-hot">HOT</div>
                            <div className="product-label label-sale">-20%</div>
                          </div>
                        </figure>
                        <div className="product-head">
                          <div className="category-wrap">
                            <div className="product-list">
                              {" "}
                              <a href="#" className="product-category">
                                category
                              </a>{" "}
                            </div>
                          </div>
                          <p className="product-header">
                            {" "}
                            <a href="#">{item.title}</a>{" "}
                          </p>
                          <section className="location">
                            <div>
                              <p>Location</p>
                            </div>
                            <div>
                              <p>India</p>
                            </div>
                          </section>
                          {/* End .product-container */}
                          {/* End .price-box */}
                          <div className="product-move">
                            <a href="search-detail.html">
                              <span className="view">View Details</span>
                            </a>
                          </div>
                        </div>
                        {/* End .product-details */}
                      </div>
                    </div>
                  ))}
            {/* End .col-sm-4 */}
            
            
          </div>
          {/* End .row */}
          {/* product-slide start*/}
          <div
            className="product-slide w-100 Shadows p-5"
            style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.6)" }} hidden={true}
          >
            <button type="button" className="close">
              <span aria-hidden="true">×</span>
            </button>
            <div className="row">
              <div className="col-sm-8">
                <ul className="nav nav-tabs product-single-tabs" role="tablist">
                  <div className="container w-100">
                    <div className="row">
                      <div className="col-sm-3">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="product-tab-desc"
                            data-toggle="tab"
                            href="#product-desc-content"
                            role="tab"
                            aria-controls="product-desc-content"
                            aria-selected="true"
                          >
                            {" "}
                            View More Info
                          </a>
                        </li>
                      </div>
                      <div className="col-sm-3">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="product-tab-size"
                            data-toggle="tab"
                            href="#product-size-content"
                            role="tab"
                            aria-controls="product-size-content"
                            aria-selected="true"
                          >
                            Make an Offer
                          </a>
                        </li>
                      </div>
                      <div className="col-sm-3">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="product-tab-tags"
                            data-toggle="tab"
                            href="#product-tags-content"
                            role="tab"
                            aria-controls="product-tags-content"
                            aria-selected="false"
                          >
                            {" "}
                            Add to Cart{" "}
                          </a>
                        </li>
                      </div>
                      <div className="col-sm-3">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="product-tab-reviews"
                            data-toggle="tab"
                            href="#product-reviews-content"
                            role="tab"
                            aria-controls="product-reviews-content"
                            aria-selected="false"
                          >
                            {" "}
                            Print
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </ul>
                <ul className="nav nav-tabs" role="tablist">
                  <div className="container w-100">
                    <div className="row">
                      <div className="col-sm-3">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="product-tab-desc"
                            data-toggle="tab"
                            href="#product-desc-content"
                            role="tab"
                            aria-controls="product-desc-content"
                            aria-selected="true"
                          >
                            <img
                              src="/assets/images/products/product-1.jpg"
                              alt=""
                            />
                          </a>
                        </li>
                      </div>
                      <div className="col-sm-3">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="product-tab-size"
                            data-toggle="tab"
                            href="#product-size-content"
                            role="tab"
                            aria-controls="product-size-content"
                            aria-selected="true"
                          >
                            <img
                              src="/assets/images/products/product-1.jpg"
                              alt=""
                            />
                          </a>
                        </li>
                      </div>
                      <div className="col-sm-3">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="product-tab-tags"
                            data-toggle="tab"
                            href="#product-tags-content"
                            role="tab"
                            aria-controls="product-tags-content"
                            aria-selected="false"
                          >
                            <img
                              src="/assets/images/products/product-1.jpg"
                              alt=""
                            />
                          </a>
                        </li>
                      </div>
                      <div className="col-sm-3">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="product-tab-reviews"
                            data-toggle="tab"
                            href="#product-reviews-content"
                            role="tab"
                            aria-controls="product-reviews-content"
                            aria-selected="false"
                          >
                            <img
                              src="/assets/images/products/product-1.jpg"
                              alt=""
                            />
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </ul>
                <div className="col-sm-12">
                  <table className="table table-size">
                    <thead>
                      <tr>
                        <th>SIZE</th>
                        <th>CHEST (in.)</th>
                        <th>WAIST (in.)</th>
                        <th>HIPS (in.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>XS</td>
                        <td>34-36</td>
                        <td>27-29</td>
                        <td>34.5-36.5</td>
                      </tr>
                      <tr>
                        <td>S</td>
                        <td>36-38</td>
                        <td>29-31</td>
                        <td>36.5-38.5</td>
                      </tr>
                      <tr>
                        <td>M</td>
                        <td>38-40</td>
                        <td>31-33</td>
                        <td>38.5-40.5</td>
                      </tr>
                      <tr>
                        <td>L</td>
                        <td>40-42</td>
                        <td>33-36</td>
                        <td>40.5-43.5</td>
                      </tr>
                      <tr>
                        <td>XL</td>
                        <td>42-45</td>
                        <td>36-40</td>
                        <td>43.5-47.5</td>
                      </tr>
                      <tr>
                        <td>XLL</td>
                        <td>45-48</td>
                        <td>40-44</td>
                        <td>47.5-51.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="col-lg-7 col-md-6 product-single-details">
                  <h4 className="product-title">Men Black Sports Shoes</h4>
                  <div className="product-nav">
                    <div className="product-prev">
                      <a href="#">
                        <span className="product-link" />
                        <span className="product-popup">
                          <span className="box-content">
                            <img
                              alt="product"
                              width={150}
                              height={150}
                              src="/assets/images/products/product-1.jpg"
                              style={{ paddingTop: 0 }}
                            />
                            <span>Circled Ultimate 3D Speaker</span>
                          </span>
                        </span>
                      </a>
                    </div>
                    <div className="product-next">
                      <a href="#">
                        <span className="product-link" />
                        <span className="product-popup">
                          <span className="box-content">
                            <img
                              alt="product"
                              width={150}
                              height={150}
                              src="/assets/images/products/product-2.jpg"
                              style={{ paddingTop: 0 }}
                            />
                            <span>Blue Backpack for the Young</span>
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="ratings-container">
                    <div className="product-ratings">
                      <span className="ratings" style={{ width: "60%" }} />
                      {/* End .ratings */}
                      <span className="tooltiptext tooltip-top" />
                    </div>
                    {/* End .product-ratings */}
                    <a href="#" className="rating-link">
                      ( 6 Reviews )
                    </a>
                  </div>
                  {/* End .ratings-container */}
                  <hr className="short-divider" />
                  <div className="price-box">
                    <span className="old-price"> ₹1,999.00</span>
                    <span className="new-price"> ₹1,699.00</span>
                  </div>
                  {/* End .price-box */}
                  <div className="product-desc">
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas.
                    </p>
                  </div>
                  {/* End .product-desc */}
                  <ul className="single-info-list">
                    <li>
                      SKU: <strong>654613612</strong>
                    </li>
                    <li>
                      CATEGORY:{" "}
                      <strong>
                        <a href="#" className="product-category">
                          SHOES
                        </a>
                      </strong>
                    </li>
                    <li>
                      TAGs:{" "}
                      <strong>
                        <a href="#" className="product-category">
                          CLOTHES
                        </a>
                      </strong>
                      ,
                      <strong>
                        <a href="#" className="product-category">
                          SWEATER
                        </a>
                      </strong>
                    </li>
                  </ul>
                  <div className="product-action">
                    <div className="product-single-qty">
                      <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                        <span className="input-group-btn input-group-prepend" />
                        <input
                          className="horizontal-quantity form-control"
                          type="text"
                        />
                        <span className="input-group-btn input-group-append" />
                      </div>
                    </div>
                    {/* End .product-single-qty */}
                    <a
                      href="javascript:;"
                      className="btn btn-dark add-cart mr-2"
                      title="Add to Cart"
                    >
                      Add to Cart
                    </a>
                    <a
                      href="cart.html"
                      className="btn btn-gray view-cart d-none"
                    >
                      View cart
                    </a>
                  </div>
                  {/* End .product-action */}
                  <hr className="divider mb-0 mt-0" />
                  <div className="product-single-share mb-3">
                    <label className="sr-only">Share:</label>
                    <div className="social-icons mr-2">
                      <a
                        href="#"
                        className="social-icon social-facebook icon-facebook"
                        target="_blank"
                        title="Facebook"
                      />
                      <a
                        href="#"
                        className="social-icon social-twitter icon-twitter"
                        target="_blank"
                        title="Twitter"
                      />
                      <a
                        href="#"
                        className="social-icon social-linkedin fab fa-linkedin-in"
                        target="_blank"
                        title="Linkedin"
                      />
                      <a
                        href="#"
                        className="social-icon social-gplus fab fa-google-plus-g"
                        target="_blank"
                        title="Google +"
                      />
                      <a
                        href="#"
                        className="social-icon social-mail icon-mail-alt"
                        target="_blank"
                        title="Mail"
                      />
                    </div>
                    {/* End .social-icons */}
                    <a
                      href="wishlist.html"
                      className="btn-icon-wish add-wishlist"
                      title="Add to Wishlist"
                    >
                      <i className="icon-wishlist-2" />
                      <span>Add to Wishlist</span>
                    </a>
                  </div>
                  {/* End .product single-share */}
                </div>
              </div>
            </div>
          </div>
          {/* product-slide end*/}
          <nav className="toolbox toolbox-pagination">
            <div className="toolbox-item toolbox-show">
              <label>Show:</label>
              <div className="select-custom">
                <select name="count" className="form-control">
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                </select>
              </div>
              {/* End .select-custom */}
            </div>
            {/* End .toolbox-item */}
            <ul className="pagination toolbox-item">
              <li className="page-item disabled">
                {" "}
                <a className="page-link page-link-btn" href="#">
                  <i className="icon-angle-left" />
                </a>{" "}
              </li>
              <li className="page-item active">
                {" "}
                <a className="page-link" href="#">
                  1 <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <span className="page-link">...</span>
              </li>
              <li className="page-item">
                {" "}
                <a className="page-link page-link-btn" href="#">
                  <i className="icon-angle-right" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* End .col-lg-9 */}
        <div className="sidebar-overlay" />
        <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar">
          <div className="sidebar-wrapper">
            <div className="widget">
              <h3 className="widget-title">
                {" "}
                <a
                  data-toggle="collapse"
                  href="#widget-body-2"
                  role="button"
                  aria-expanded="true"
                  aria-controls="widget-body-2"
                >
                  Categories
                </a>{" "}
              </h3>
              <div className="collapse show" id="widget-body-2">
                <div className="widget-body">
                  <ul className="cat-list">
                    <li>
                      {" "}
                      <a
                        href="#widget-category-1"
                        data-toggle="collapse"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-category-1"
                      >
                        {" "}
                        Accessories<span className="products-count">
                          (3)
                        </span>{" "}
                        <span className="toggle" />{" "}
                      </a>
                      <div className="collapse show" id="widget-category-1">
                        <ul className="cat-sublist">
                          <li>
                            Caps
                            <span className="products-count">
                              <label className="switch">
                                <input className="d-none" type="checkbox" />
                                <span className="slider round" />
                              </label>
                            </span>
                          </li>
                          <li>
                            Watches
                            <span className="products-count">
                              <label className="switch">
                                <input className="d-none" type="checkbox" />
                                <span className="slider round" />
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <a
                        href="#widget-category-2"
                        className="collapsed"
                        data-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="widget-category-2"
                      >
                        {" "}
                        Dress<span className="products-count">(4)</span>{" "}
                        <span className="toggle" />{" "}
                      </a>
                      <div className="collapse" id="widget-category-2">
                        <ul className="cat-sublist">
                          <li>
                            Clothing
                            <span className="products-count">
                              <label className="switch">
                                <input className="d-none" type="checkbox" />
                                <span className="slider round" />
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <a
                        href="#widget-category-3"
                        className="collapsed"
                        data-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="widget-category-3"
                      >
                        {" "}
                        Electronics<span className="products-count">
                          (2)
                        </span>{" "}
                        <span className="toggle" />{" "}
                      </a>
                      <div className="collapse" id="widget-category-3">
                        <ul className="cat-sublist">
                          <li>
                            <span className="pull-left">Headphone</span>
                            <label className="switch pull-right">
                              <input className="d-none" type="checkbox" />
                              <span className="slider round" />
                            </label>
                          </li>
                          <li>
                            Watch
                            <span className="products-count">
                              <label className="switch">
                                <input className="d-none" type="checkbox" />
                                <span className="slider round" />
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      {" "}
                      <a
                        href="#widget-category-4"
                        className="collapsed"
                        data-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="widget-category-4"
                      >
                        {" "}
                        Fashion<span className="products-count">(6)</span>{" "}
                        <span className="toggle" />{" "}
                      </a>
                      <div className="collapse" id="widget-category-4">
                        <ul className="cat-sublist">
                          <li>
                            Shoes
                            <span className="products-count">
                              <label className="switch">
                                <input className="d-none" type="checkbox" />
                                <span className="slider round" />
                              </label>
                            </span>
                          </li>
                          <li>
                            Bag
                            <span className="products-count">
                              <label className="switch">
                                <input className="d-none" type="checkbox" />
                                <span className="slider round" />
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a href="#">Music</a>
                      <span className="products-count">(2)</span>
                    </li>
                  </ul>
                </div>
                {/* End .widget-body */}
              </div>
              {/* End .collapse */}
            </div>
            {/* End .widget */}
            {/* End .widget */}
          </div>
          {/* End .sidebar-wrapper */}
        </aside>
        {/* End .col-lg-3 */}
      </div>
      {/* End .row */}
    </div>
    {/* End .container */}
    <div className="mb-4" />
    {/* margin */}
  </main>
  {/* End .main */}
</>

  );
};

export default AuctionComponent;
