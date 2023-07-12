import React, { useState, useEffect, useRef } from "react";
import {useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import productStore from "../../store/product-store";
import userStore from "../../store/user-store";
import "./style.css";
import swal from "sweetalert";
import GoToTop from "../../gototop";
import Loader from "../../common/loader";
import GridProductList from "./grid-productList";
import RowProductList from "./row-productList";
import settingsStore from "../../store/settings-store";
import ReactPaginate from "react-paginate";
import "react-lazy-load-image-component/src/effects/blur.css";
import ProdctDetailModal from "./ProdctDetailModal";

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
  const location: any = useLocation();
  const [SearchResult, setSearchResult] = useState([]);
  const [itemPopup, setitemPopup] = useState(true);
  const [isaddtosucc, setisaddtosucc] = useState(true);
  const [itemData, setitemData] = useState<any>(Array);
  const [pid, setPid] = useState("");
  const [price, setPrice] = useState("");
  const [proCategory, setproCategory] = useState([]);
  const [isspinner, setisSpinner] = useState(false);
  const [productview, setProductview] = useState("grid");
  const [NewBannerDetails, setNewBannerDetails] = useState<any>([]);
  const [currentSearchObject, setCurrentSearchObject] = useState({
    searchtext: "",
    categorey: "",
  });
  const [showDivIndex, setShowDivIndex] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const priceFilterRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const search = location.state?.data;
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
          setSearchResult(callback.data);
          setisSpinner(false);
        }
      });
    }
  };

  const getUserCart = (e: any) => {
    userStore.getUserCart(
      (res: any) => {
        if (res?.status) {
          console.log("cart response", res);
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
  const handleClick = (id: any, price: any,index:number) => {
    const divIndex = Math.ceil((index + 1) / 4) * 4;
    setShowDivIndex(divIndex);
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
    });
  };

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemsPerPage = 16; // Number of items to show per page
  // ...

  // Calculate the indexes of the data array for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = SearchResult.slice(startIndex, endIndex);
  return (
    <>
      <>
        {/* End .header */}
        <main className="main">
          <div className="container">
            <div className="row">
              <div className="col-lg-10">
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
                    currentData?.map((item: any, index: number) => {
                      return (
                        <>
                          <GridProductList
                            item={item}
                            handleClick={(id:any,price:any)=>handleClick(id,price,index)}
                          />
                          {showDivIndex === index + 1 &&  (
                            <div
                              className="w-100 w-full details"
                              key={`divider-${index}`}
                            >
                              {Array.isArray(itemData) &&
                                itemData?.length > 0 && (
                                  <ProdctDetailModal showModal={itemPopup} productData={itemData} handleClose={handleClose} getUserCart={getUserCart}/>
                                )}
                            </div>
                          )}
                        </>
                      );
                    })
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
                        {currentData.map((item: any) => (
                          <RowProductList
                            item={item}
                            handleClick={handleClick}
                          />
                        ))}
                      </div>
                    )
                  )}
                </div>
                {/* End .row */}
                {/* product-slide start*/}


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
                    <div className="pagination-container" draggable="false">
                      {" "}
                      <ReactPaginate
                        nextLabel="NEXT >"
                        onPageChange={handlePageChange}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={Math.ceil(
                          SearchResult.length / itemsPerPage
                        )}
                        previousLabel="< PREVIOUS"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </nav>
                )}
              </div>
              {/* End .col-lg-9 */}
              <div className="sidebar-overlay" />
              <aside className="sidebar-shop col-lg-2 order-lg-first mobile-sidebar">
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
