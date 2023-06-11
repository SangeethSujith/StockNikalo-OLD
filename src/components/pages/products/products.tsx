import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import productStore from "../../store/product-store";
import userStore from "../../store/user-store";
import RoutePath from "../../global/route-paths";
import "./style.css";
import swal from "sweetalert";
import GoToTop from "../../gototop";
import Loader from "../../common/loader";
import GridProductList from "./grid-productList";
import RowProductList from "./row-productList";
import settingsStore from "../../store/settings-store";
type ProductsProps = {};

type SearchQueryProps = {
  category_id: string;
  subcategory_id: string;
  childcategory_id: string;
  product_name: string;
  min_rate: string;
  max_rate: string;
  sort_by: string;
  show: string;
  limit: number;
  page: number;
};

const ProductsComponent: React.FC<any> = (props: ProductsProps) => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const [SearchResult, setSearchResult] = useState([]);
  const [itemPopup, setitemPopup] = useState(true);
  const [isaddtosucc, setisaddtosucc] = useState(true);
  const [itemData, setitemData] = useState(Array);
  const [pid, setPid] = useState("");
  const [price, setPrice] = useState("");
  const [proCategory, setproCategory] = useState([]);
  const [productQuantity, setproductQantity] = useState<number>(1);
  const [isspinner, setisSpinner] = useState(false);
  const [productview, setProductview] = useState("grid");
  const [NewBannerDetails, setNewBannerDetails] = useState<any>([]);
  const [currentSearchObject, setCurrentSearchObject] = useState({
    searchtext: "",
    categorey: "",
  });
  const priceFilterRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const search = location.state?.data;
    console.log("search data isss",search);
    const searchQuery: SearchQueryProps = location.state?.searchQuery;
    setisSpinner(true);
    if (search != undefined) {
      setSearchResult(search);
      setCurrentSearchObject({
        searchtext: searchQuery.product_name,
        categorey: searchQuery.category_id,
      });
    }
    let spinnerTime = setTimeout(() => setisSpinner(false), 2000);
    return () => {
      clearTimeout(spinnerTime);
    };
  }, [location.state?.data]);
  useEffect(() => {
    getProductsData();
    getProductCategory();
    getHomeBanner();
  }, []);

  const getProductsData = () => {
    productStore.getProducts((values: any) => {
      if (location.state?.data == undefined) {
        setSearchResult(values.data);
      }
    });
  };
  const removeCart = () => {
    userStore.removeCart((res: any) => {});
  };
  const addtoCart = () => {
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
        console.log("testing", res);
        userStore.getUserCart((res: any) => {});
      }
    });
  };

  const onSearch = (id: any) => {
    if (id != null) {
      setCurrentSearchObject({ ...currentSearchObject, categorey: id });
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
      setisSpinner(true);
      productStore.onSearch(data, (callback: any) => {
        if (callback.status) {
          // navigate(RoutePath.shop, {
          //   state: { data: callback.data },
          // });
          setSearchResult(callback.data);
          setisSpinner(false);
        }
      });
    }
  };

  const onFilterSearch = () => {
    const { searchtext, categorey } = currentSearchObject;

    if (categorey != null) {
      let pricefiltertext = priceFilterRef?.current?.textContent;
      let minrate = pricefiltertext?.split(" ")[0].split(/\W+/)[1];
      let maxrate = pricefiltertext?.split(" ")[2].split(/\W+/)[1];
      console.log(pricefiltertext?.split(" "));
      let data = {
        category_id: categorey,
        subcategory_id: "",
        childcategory_id: "",
        product_name: searchtext,
        min_rate: Number(minrate),
        max_rate: Number(maxrate),
        sort_by: "",
        show: "",
        limit: 10,
        page: 1,
      };
      setisSpinner(true);
      productStore.onSearch(data, (callback: any) => {
        if (callback.status) {
          // navigate(RoutePath.shop, {
          //   state: { data: callback.data },
          // });
          setSearchResult(callback.data);
          setisSpinner(false);
        }
      });
    }
  };

  const getUserCart = (e: any) => {
    userStore.getUserCart(
      (res: any) => {
        // if (res) {
        //  if (res?.data?.length > 0) {
        //     swal({
        //       title: "Are you sure?",
        //       text: "You have items from another seller added to the cart. Do you want to clear the cart and add this item?",
        //       icon: "warning",
        //       buttons: ["No, cancel it!", "Yes, I am sure!"],
        //       dangerMode: true,
        //     }).then(function (isConfirm) {
        //       if (isConfirm) {
        //         removeCart();
        //         addtoCart();

        //         e.target.classList.add("added-to-cart");
        //         swal({
        //           title: "Added to cart",
        //           text: "Product added to cart successfully!",
        //           icon: "success",
        //         }).then(function () {
        //           // form.submit(); // <--- submit form programmatically
        //         });
        //       } else {
        //         // swal("Cancelled", "Your imaginary file is safe :)", "error");
        //       }
        //     });
        //   }
        // } else {
        if (res?.status) {
          console.log("cart response",res)
          if (res?.data?.length > 0) {
            let itemExit: any = res?.data?.find(
              (product: any) => product?.productId == pid
            );
            if (itemExit) {
              //udate cart item
              swal({
                title: "Item exist",
                text: "This item is already in your cart!",
                icon: "warning",
              }).then(function () {
                // form.submit(); // <--- submit form programmatically
              });
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
        }
      }
      //  }
    );
  };

  const handleClick = (id: any, price: any) => {
    console.log(id, "id");
    console.log(price, "price");
    let item = SearchResult?.filter((item: any) => item?.productId == id);
    setitemData(item);
    setPid(id);
    setPrice(price);
    setitemPopup(false);
  };
  const handleClose = () => {
    setitemPopup(true);
  };

  const getProductCategory = () => {
    productStore.getProductCategory((values: any) => {
      setproCategory(values.data);
    });
  };

  const getHomeBanner = () => {
    settingsStore.getSettings((values: any) => {
      setNewBannerDetails(values.data);
      console.log("=>", NewBannerDetails);
    });
  };

  return (
    <>
      <>
        {/* End .header */}
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
                <div
                  className="category-banner banner text-uppercase"
                  style={{
                    background: `no-repeat 60%/cover url(https://qriocty.com/public/images/${NewBannerDetails[0]?.image})`,
                  }}
                >
                  <div className="row">
                    <div className="pb-5 pb-md-0 col-sm-5 col-lg-5 offset-1">
                      <h3 className="mb-2 ls-10">
                        Electronic
                        <br />
                        Deals
                      </h3>
                      <a
                        href={NewBannerDetails && NewBannerDetails[0]?.link}
                        className="btn btn-dark btn-black ls-10"
                      >
                        Get Yours!
                      </a>
                    </div>
                    <div className="col-sm-4 offset-sm-0 offset-1">
                      <div className="coupon-sale-content">
                        <h4 className="m-b-2 coupon-sale-text bg-white ls-10 text-transform-none">
                          Exclusive COUPON{" "}
                        </h4>
                        <h5 className="mb-2 coupon-sale-text d-block ls-10 p-0">
                          <i className="ls-0">UP TO</i>
                          <b className="text-dark">$100</b> OFF
                        </h5>
                      </div>
                    </div>
                  </div>
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
                        <line
                          x1={23}
                          x2={26}
                          y1={16}
                          y2={16}
                          className="cls-1"
                        />
                        <line
                          x1={6}
                          x2={17}
                          y1={16}
                          y2={16}
                          className="cls-1"
                        />
                        <line
                          x1={17}
                          x2={26}
                          y1={23}
                          y2={23}
                          className="cls-1"
                        />
                        <line
                          x1={6}
                          x2={11}
                          y1={23}
                          y2={23}
                          className="cls-1"
                        />
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
                          <option value="menu_order">Default sorting</option>
                          <option value="popularity">Sort by popularity</option>
                          <option value="rating">Sort by average rating</option>
                          <option value="date">Sort by newness</option>
                          <option value="price">
                            Sort by price: low to high
                          </option>
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
                      <a
                        href="#"
                        className={`layout-btn btn-grid ${
                          productview == "grid" ? "active" : ""
                        }`}
                        title="Grid"
                        onClick={() => setProductview("grid")}
                      >
                        {" "}
                        <i className="icon-mode-grid" />{" "}
                      </a>{" "}
                      <a
                        href="#"
                        className={`layout-btn btn-list ${
                          productview == "list" ? "active" : ""
                        }`}
                        title="List"
                        onClick={() => setProductview("list")}
                      >
                        {" "}
                        <i className="icon-mode-list" />{" "}
                      </a>{" "}
                    </div>
                    {/* End .layout-modes */}
                  </div>
                  {/* End .toolbox-right */}
                </nav>
                <div className="row">
                  {isspinner ? (
                    <Loader active={true} />
                  ) : productview == "grid" ? (
                    Array.isArray(SearchResult) &&
                    SearchResult.length > 0 &&
                    SearchResult?.filter((item, index) => index < 6).map(
                      (item: any) => (
                        <GridProductList
                          item={item}
                          handleClick={handleClick}
                        />
                      )
                    )
                  ) : (
                    Array.isArray(SearchResult) &&
                    SearchResult.length > 0 && (
                      <div>
                        {" "}
                        <div className="col-12 mx-auto">
                          <div className="product-row title bg-light">
                            <div className="pcol product-img">Image</div>
                            <div className="pcol product-cat"> Category </div>
                            <div className="pcol product-name">Name </div>
                            <div className="pcol product-brand">Brand</div>
                            <div className="pcol product-sku">SKU</div>
                            <div className="pcol product-prices"> price </div>
                            <div className="pcol product-action">Actions</div>
                          </div>
                        </div>
                        {SearchResult?.filter((item, index) => index < 6).map(
                          (item: any) => (
                            <RowProductList
                              item={item}
                              handleClick={handleClick}
                            />
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
                {/* End .row */}
                {/* product-slide start*/}

                {Array.isArray(itemData) && itemData.length > 0 && (
                  <div
                    className="product-slide quick-view-popup w-100 Shadows p-4 alert"
                    style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.6)" }}
                    hidden={itemPopup}
                  >
                    <button
                      onClick={handleClose}
                      type="button"
                      className="close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <div className="quick-view-inner">
                      <div className="row pt-4">
                        <div className="col-sm-8">
                          {/* <ul
                            className="nav nav-tabs product-single-tabs"
                            role="tablist"
                          >
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
                                      onClick={(e) => {
                                        if (
                                          localStorage.getItem("userId") ==
                                          "null"
                                        ) {
                                          navigate(RoutePath.login);
                                        } else if (
                                          localStorage.getItem("userCmpReg") ==
                                          "0"
                                        ) {
                                          navigate(RoutePath.complete_profile);
                                        } else {
                                          getUserCart(e);
                                        }
                                      }}
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
                          </ul> */}
                          <ul className="nav nav-tabs" role="tablist">
                            <div className="container w-100">
                              <div className="row">
                                {itemData[0]?.images
                                  ?.filter(
                                    (item: any, index: number) => index < 4
                                  )
                                  .map((item: any) => (
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
                                          <img src={item.image} alt="" />
                                        </a>
                                      </li>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </ul>
                        </div>
                        <div className="col-sm-12">
                          <div className="col-lg-7 col-md-6 product-single-details">
                            <h4 className="product-title">
                              {itemData[0]?.productName}
                            </h4>
                            <p>{itemData[0]?.description}</p>

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
                            {/* <div className="ratings-container">
                              <div className="product-ratings">
                                <span
                                  className="ratings"
                                  style={{ width: "60%" }}
                                />
                                {/* End .ratings */}
                            {/* <span className="tooltiptext tooltip-top" />
                              </div> */}
                            {/* End .product-ratings */}
                            {/* <a href="#" className="rating-link">
                                ( 6 Reviews )
                              </a> */}
                            {/*</div> */}
                            {/* End .ratings-container */}
                            <hr className="short-divider" />
                            <div className="price-box">
                              <span className="old-price">
                                ₹{itemData[0]?.mrp}
                              </span>
                              <span className="new-price">
                                ₹{itemData[0]?.salePrice}
                              </span>
                            </div>
                            <ul className="single-info-list">
                              <li>
                                SKU: <strong>{itemData[0]?.sku}</strong>
                              </li>
                              <li>
                                CATEGORY:{" "}
                                <strong>
                                  <a href="#" className="product-category">
                                    {itemData[0]?.category}
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
                              <li>
                                Seller location :{" "}
                                <strong>
                                   <a href="#" className="product-category">
                                    {itemData[0]?.seller_state}
                                   </a>
                                </strong>
                                ,
                                <strong>
                                   <a href="#" className="product-category">
                                    {itemData[0]?.seller_district}
                                   </a>
                                </strong>,
                                <strong>
                                  <a href="#" className="product-category">
                                    {itemData[0]?.seller_pincode}
                                  </a>
                                </strong>
                              </li>
                            </ul>
                            {itemData[0]?.created_by !=
                              localStorage.getItem("userId") && (
                              <div className="product-action">
                                <div className="product-single-qty">
                                  <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                    <span className="input-group-btn input-group-prepend">
                                      <button
                                        className="btn btn-outline btn-down-icon bootstrap-touchspin-down bootstrap-touchspin-injected"
                                        type="button"
                                        onClick={() =>
                                          setproductQantity(productQuantity - 1)
                                        }
                                      />
                                    </span>
                                    <input
                                      id="cartqty"
                                      value={productQuantity}
                                      className="horizontal-quantity form-control"
                                      type="text"
                                    />
                                    <span className="input-group-btn input-group-append">
                                      <button
                                        className="btn btn-outline btn-up-icon bootstrap-touchspin-up bootstrap-touchspin-injected"
                                        type="button"
                                        onClick={() =>
                                          setproductQantity(productQuantity + 1)
                                        }
                                      />
                                    </span>
                                  </div>
                                </div>
                                {/* End .product-single-qty */}
                                <a
                                  onClick={(e) => {
                                    if (
                                      localStorage.getItem("userId") == "null"
                                    ) {
                                      navigate(RoutePath.login);
                                    } else if (
                                      localStorage.getItem("userCmpReg") == "0"
                                    ) {
                                      navigate(RoutePath.complete_profile);
                                    } else {
                                      getUserCart(e);
                                    }
                                  }}
                                  className="btn btn-primary add-cart mr-2"
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
                            )}
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* product-slide end*/}
                {Array.isArray(SearchResult) && SearchResult.length > 0 && (
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
                )}
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
                          {/* <li>
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
                            Caps<span className="products-count">(1)</span>
                          </li>
                          <li>
                            Watches<span className="products-count">(2)</span>
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
                            Clothing<span className="products-count">(4)</span>
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
                            Headphone<span className="products-count">(1)</span>
                          </li>
                          <li>
                            Watch<span className="products-count">(1)</span>
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
                            Shoes<span className="products-count">(4)</span>
                          </li>
                          <li>
                            Bag<span className="products-count">(2)</span>
                          </li>
                        </ul>
                      </div>
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
                                {/* <span className="products-count">(2)</span> */}
                              </li>
                            ))}
                        </ul>
                      </div>
                      {/* End .widget-body */}
                    </div>
                    {/* End .collapse */}
                  </div>
                  {/* End .widget */}
                  <div className="widget">
                    <h3 className="widget-title">
                      {" "}
                      <a
                        data-toggle="collapse"
                        href="#widget-body-3"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-body-3"
                      >
                        Price
                      </a>{" "}
                    </h3>
                    <div className="collapse show" id="widget-body-3">
                      <div className="widget-body pb-0">
                        <form action="#">
                          <div className="price-slider-wrapper">
                            <div id="price-slider" />
                            {/* End #price-slider */}
                          </div>
                          {/* End .price-slider-wrapper */}
                          <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                            <div className="filter-price-text">
                              {" "}
                              Price:{" "}
                              <span
                                id="filter-price-range"
                                ref={priceFilterRef}
                              />{" "}
                            </div>
                            {/* End .filter-price-text */}
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => onFilterSearch()}
                            >
                              Filter
                            </button>
                          </div>
                          {/* End .filter-price-action */}
                        </form>
                      </div>
                      {/* End .widget-body */}
                    </div>
                    {/* End .collapse */}
                  </div>
                  {/* End .widget */}
                  {/* <div className="widget widget-block">
                    <h3 className="widget-title">Custom HTML Block</h3>
                    <h5>This is a custom sub-title.</h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras non placerat mi. Etiam non tellus{" "}
                    </p>
                  </div> */}
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
          <GoToTop />
        </main>
        {/* End .main */}
      </>
    </>
  );
};

export default observer(ProductsComponent);
