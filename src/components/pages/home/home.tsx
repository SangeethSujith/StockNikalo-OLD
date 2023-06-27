import React, { Component, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RoutePath from "../../global/route-paths";
import { State } from "country-state-city";
import GoToTop from "../../gototop";
import swal from "sweetalert";
import useScript from "../../hooks/useScript";
import productStore from "../../store/product-store";
import settingsStore from "../../store/settings-store";
import HomeBestSelling from "./home-bestSelling";
import { Form, Input, message } from "antd";
import userStore from "../../store/user-store";
import { type } from "os";

const Home: React.FC<any> = () => {
  const navigate = useNavigate();
  const [enquiryForm] = Form.useForm();
  const { TextArea } = Input;
  const [products, setProducts] = useState([]);
  const [auction, setAuction] = useState([]);
  const [NewBannerDetails, setNewBannerDetails] = useState<any>([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [NewArrivals, setNewArrivals] = useState([]);
  const [BestSelling, setBestSelling] = useState([]);
  const [auctionData, setAuctionData] = useState<any>([]);
  const [BestSellingSelectTab, setBestSellingSelectTab] = useState();
  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "/assets/js/main.min.js";
    // document.body.append(script);
    getProductsData();
    getNewArrivals();
    getHomeBanner();
    getStates();
  }, []);

  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "/assets/js/main.min.js";
    // document.body.append(script);
  }, [products, auction]);

  const getProductsData = () => {
    productStore.getProducts((values: any) => {
      setProducts(values.data);
    });
    productStore.getAuction((values: any) => {
      setAuction(values.data);
      setAuctionData([values?.data[0]]);
    });
    productStore.getBestSellingProduct((values: any) => {
      setBestSelling(values.data);
      if (values.data.length > 0) {
        setBestSellingSelectTab(values.data[0]);
      }
    });
  };
  const getNewArrivals = () => {
    productStore.getNewArrivals((values: any) => {
      setNewArrivals(values.data);
    });
  };
  const getHomeBanner = () => {
    settingsStore.getSettings((values: any) => {
      setNewBannerDetails(values.data);
    });
  };

  const getStates = async () => {
    try {
      const result = await State.getStatesOfCountry("IN");
      let allStates: any = [];
      allStates = result?.map(({ isoCode, name }) => ({
        isoCode,
        name,
      }));
      const [{ isoCode: firstState = "" } = {}] = allStates;
      setStates(allStates);
      setSelectedState(firstState);
    } catch (error) {
      setStates([]);
    }
  };

  const onActionsTabClick = (auctionData: any) => {
    if (auctionData) {
      setAuctionData([auctionData]);
    } else {
      setAuctionData([auction[0]]);
    }
  };

  const handleAddenquiry = () => {
    enquiryForm.validateFields().then((values) => {
      userStore.addEnquiry(values, (res: any) => {
        if (res) {
          swal({
            //title: "Are you sure?",
            text: "Enquiry sumbitted successfully",
            icon: "success",
            dangerMode: true,
          }).then(() => {
            enquiryForm.resetFields();
          });
        }
      });
    });
  };

  const bestSellingTab = (index: number) => {
    setBestSellingSelectTab(BestSelling[index]);
  };
  useScript("/assets/js/main.min.js", "");

  return (
    <>
      <main className="main home">
        <div className="home-top-container mt-lg-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-12 mb-2">
                {NewBannerDetails && NewBannerDetails.length > 0 && (
                  <div
                    className="home-slider owl-carousel owl-theme owl-carousel-lazy h-100 slide-animate"
                    data-owl-options="{
								'dots': true,
								'nav': false,
								'loop': false
							}"
                  >
                    <div className="home-slide home-slide1 banner banner-md-vw h-100">
                      <figure>
                        {" "}
                        <img
                          className="slide-bg"
                          src={NewBannerDetails[0]?.image}
                          style={{ backgroundColor: "#555" }}
                          alt="slider image"
                          width={835}
                          height={445}
                        />{" "}
                      </figure>
                      <div className="banner-layer banner-layer-middle intro-banner">
                        <div
                          className="appear-animate"
                          data-animation-name="fadeInLeftShorter"
                          data-animation-delay={200}
                        >
                          {NewBannerDetails[0]?.banner.length > 0 && (
                            <h4 className="">
                              {NewBannerDetails && NewBannerDetails[0]?.banner}
                            </h4>
                          )}
                          <h2
                            className="m-b-1 "
                            style={{
                              color: "white",
                              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.9)",
                            }}
                          >
                            {NewBannerDetails &&
                              NewBannerDetails[0]?.description}
                          </h2>
                          <h1 className="text-uppercase m-b-3 text-white">
                            {NewBannerDetails && NewBannerDetails[0]?.slug}
                          </h1>
                          {/* <h5 className="text-uppercase d-inline-block mb-1 pb-1 ls-n-20 align-text-bottom">
                          {" "}
                          Starting At{" "}
                          <b className="coupon-sale-text bg-secondary text-white d-inline-block">
                            $ <em>199</em>99
                          </b>{" "}
                        </h5> */}
                          <a
                            href={NewBannerDetails && NewBannerDetails[0]?.link}
                            className="btn btn-dark btn-md ls-10 align-bottom"
                          >
                            Shop Now!
                          </a>{" "}
                        </div>
                      </div>
                      {/* End .banner-layer */}
                    </div>

                    {/* End .home-slide */}

                    <div className="home-slide home-slide2 banner banner-md-vw h-100">
                      <figure>
                        {" "}
                        <img
                          className="slide-bg"
                          src={NewBannerDetails[1]?.image}
                          style={{ backgroundColor: "#555" }}
                          alt="slider image"
                          width={835}
                          height={445}
                        />{" "}
                      </figure>
                      <div className="banner-layer banner-layer-middle intro-banner">
                        <div
                          className="appear-animate"
                          data-animation-name="fadeInLeftShorter"
                          data-animation-delay={200}
                        >
                          <h4 className="">{NewBannerDetails[1]?.banner}</h4>
                          <h2 className="m-b-1">
                            {NewBannerDetails[1]?.description}
                          </h2>
                          <h3 className="text-uppercase m-b-3">
                            {NewBannerDetails[1]?.slug}
                          </h3>
                          {/* <h5 className="text-uppercase d-inline-block mb-1 pb-1 ls-n-20 align-text-bottom">
                                {" "}
                                Starting At{" "}
                                <b className="coupon-sale-text bg-secondary text-white d-inline-block">
                                  $ <em>199</em>99
                                </b>{" "}
                              </h5> */}
                          <a
                            href={NewBannerDetails[1].link}
                            className="btn btn-dark btn-md ls-10 align-bottom"
                          >
                            Shop Now!
                          </a>{" "}
                        </div>
                      </div>
                    </div>

                    {/* End .home-slide */}
                  </div>
                )}
                {/* End .home-slider */}
              </div>
              {/* End .col-lg-9 */}
              <div className="col-lg-3 top-banners">
                <div className="row">
                  <div className=" col-md-4 col-lg-12">
                    <div
                      onClick={() => navigate(RoutePath.quoteprice)}
                      style={{ cursor: "pointer" }}
                      className=" banner banner1 banner-md-vw-large banner-sm-vw-large mb-2"
                    >
                      <div className=" banner-layer banner-layer-middle text-left">
                        {" "}
                        <a
                          style={{ cursor: "pointer" }}
                          className="text-dark text-uppercase ls-10 py-1"
                        >
                          Quote The Price&nbsp;
                          <i className="icon-right-open" />
                        </a>{" "}
                      </div>
                      <img
                        src="../../assets/images/icon1.png"
                        alt="banner"
                        className=" float-right p-5"
                        width={96}
                      />{" "}
                    </div>
                    {/* End .banner */}
                  </div>
                  <div className="col-md-4 col-lg-12">
                    <div
                      onClick={() => navigate(RoutePath.auctionpage)}
                      style={{ cursor: "pointer" }}
                      className="banner banner2 banner-md-vw-large banner-sm-vw-large mb-2"
                    >
                      <div className="banner-layer banner-layer-middle text-left">
                        {" "}
                        <a
                          className="text-dark text-uppercase ls-10 py-1"
                          style={{ cursor: "pointer" }}
                        >
                          Auction Price&nbsp;
                          <i className="icon-right-open" />
                        </a>{" "}
                      </div>
                      <img
                        src="../../assets/images/icon2.png"
                        alt="banner"
                        className=" float-right p-3"
                        width={96}
                      />{" "}
                    </div>
                    {/* End .banner */}
                  </div>
                  <div className="col-md-4 col-lg-12">
                    <div
                      onClick={() => navigate(RoutePath.shop)}
                      className="banner banner3 banner-md-vw-large banner-sm-vw-large mb-2"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="banner-layer banner-layer-middle">
                        {" "}
                        <a
                          style={{ cursor: "pointer" }}
                          className="text-dark text-uppercase ls-10 pb-1"
                        >
                          Buy Product&nbsp;
                          <i className="icon-right-open" />
                        </a>{" "}
                      </div>
                      <img
                        src="../../assets/images/icon3.png"
                        alt="banner"
                        className=" float-right p-5"
                        width={96}
                      />{" "}
                    </div>
                    {/* End .banner */}
                  </div>
                </div>
              </div>
              {/* End .col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        <section className=" mb-2 mt-3 bg-grey pt-5">
          <div className="container">
            <h3>Auctions</h3>
            <div className="tabs tabs-default">
              <ul className="nav nav-tabs" role="tablist">
                {auction &&
                  auction?.map((item: any, index: number) => (
                    <li className="nav-item">
                      {" "}
                      <a
                        className={`nav-link ${index == 0 ? "active" : " "}`}
                        id="tab-customer"
                        data-toggle="tab"
                        href="#customer-content"
                        role="tab"
                        aria-controls="customer-content"
                        aria-selected="true"
                        onClick={() => onActionsTabClick(item)}
                      >
                        {item.category}
                      </a>{" "}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="row">
              <div className="product-section1 mt-3 w-100">
                {auction?.length > 0 && (
                  <div
                    className="products-slider owl-carousel owl-theme dots-top dots-small m-b-1 pb-1 appear-animate mt-3 mb-3 p-3 pl-0 pr-0"
                    data-animation-name="fadeInUpShorter"
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
                      'items': 4
                  }
              }
          }"
                  >
                    {auctionData &&
                      auctionData?.map((item: any) => {
                        return (
                          <div className="product-default inner-quickview inner-icon bg-white p-3">
                            <figure className="img-effect">
                              {" "}
                              <a
                                onClick={() =>
                                  navigate(`${RoutePath.auction}/${item.id}`)
                                }
                              >
                                {" "}
                                <img
                                  src="../../assets/images/img1.png"
                                  width={205}
                                  height={205}
                                  alt="product"
                                />{" "}
                                {/* <img
                              src="../../assets/images/products/product-2.jpg"
                              width={205}
                              height={205}
                              alt="product"
                            />{" "} */}
                              </a>
                              <div className="label-group">
                                <div className="product-label label-hot">
                                  Auction {item.id}
                                </div>
                              </div>
                              {/* End .product-countdown-container */}
                            </figure>
                            <div className="product-details">
                              <h3 className="product-title">
                                {" "}
                                <a href="# ">{item?.title}</a>{" "}
                              </h3>
                              <div className="category-wrap">
                                <div className="category-list">
                                  {" "}
                                  <a href="# " className="product-category">
                                    {item?.category}
                                  </a>{" "}
                                </div>
                              </div>
                              {/* <p>Auction Single - 6' Experiment</p> */}
                              {/* End .product-container */}
                              <div className="info-box info-box-icon-left col-lg-4 p-0">
                                <div className="info-box-content">
                                  {" "}
                                  <i className="icon-support" />
                                  <p className="text-body">Starts On</p>
                                  <h4>
                                    {item?.start_date ? item?.start_date : ""}
                                  </h4>
                                  <p className="text-body">End On</p>
                                  <h4>
                                    {item?.end_date ? item?.end_date : ""}
                                  </h4>
                                  {/* End .info-box-content */}
                                </div>
                                {/* End .info-box */}
                              </div>
                              <div className="price-box w-100">
                                {" "}
                                <a
                                  onClick={() =>
                                    navigate(`${RoutePath.auction}/${item.id}`)
                                  }
                                  className="btn btn-primary btn-md text-white w-100"
                                  title="Bid Now"
                                >
                                  Bid Now
                                </a>{" "}
                              </div>
                              {/* End .price-box */}
                            </div>
                            {/* End .product-details */}
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* End .featured-proucts */}
              </div>
            </div>
          </div>
        </section>
        {/* <section
          className="product-section1"
          style={{ backgroundColor: "#FFF" }}
        >
          <div className="container">
            <h2
              className="title title-underline pb-1 appear-animate"
              data-animation-name="fadeInLeftShorter"
            >
              Best Value Deal{" "}
              <span className="span-bg">
                <i className="fa fa-clock" />
                &nbsp;24:07:55 Left
              </span>
            </h2>

            <>
              {products.length > 0 && (
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
                  {products?.map((item: any) => (
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        {" "}
                        <a
                          onClick={() =>
                            navigate(`${RoutePath.product}/${item.productId}`)
                          }
                        >
                          {" "}
                          <img
                            src={
                              item?.images
                                ? item?.images[0]?.image
                                : "/assets/images/products/product-1.jpg"
                            }
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
                              href="# "
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
                          <a href="# ">{item.productName}</a>{" "}
                        </h3>
                        {/* End .product-container */}
        {/* <div className="price-box">
                          {" "}
                          <span className="product-price">
                            ₹{item.salePrice}
                          </span>{" "}
                          <del className="old-price">₹{item.mrp}</del>
                          <div className="category-list">
                            {" "}
                            <a href="# ">50% OFF</a>{" "}
                          </div>
                        </div> */}
        {/* End .price-box */}
        {/* </div> */}
        {/* End .product-details */}
        {/* </div>
                  ))}
                </div>
              )}
            </>
          </div> */}
        {/* </section>  */}
        <section className="simple-section mt-5">
          <div className="container">
            <h3>Our Best Selling Global Industrial® Products</h3>
            <div className="tabs tabs-default">
              <ul className="nav nav-tabs" role="tablist">
                {BestSelling.map((item: any, index: number) => (
                  <li className="nav-item">
                    {" "}
                    <a
                      className={`nav-link ${index == 0 ? "active" : " "}`}
                      id="tab-customer"
                      data-toggle="tab"
                      href="#customer-content"
                      role="tab"
                      aria-controls="customer-content"
                      aria-selected="true"
                      onClick={() => bestSellingTab(index)}
                    >
                      {item.category}
                    </a>{" "}
                  </li>
                ))}
              </ul>
              <div className="tab-content">
                {BestSellingSelectTab && (
                  <HomeBestSelling data={BestSellingSelectTab} />
                )}
              </div>
            </div>
          </div>
        </section>
        <section
          className="product-section1 mt-3"
          style={{ backgroundColor: "#FFF" }}
        >
          <div className="container">
            <h2
              className="title title-underline pb-1 appear-animate"
              data-animation-name="fadeInLeftShorter"
            >
              New Arrivals
            </h2>

            {NewArrivals.length > 0 && (
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
                {" "}
                {NewArrivals?.map((item: any) => (
                  <div className="product-default inner-quickview inner-icon">
                    <figure>
                      {" "}
                      <a
                        onClick={() =>
                          navigate(`${RoutePath.product}/${item.productId}`)
                        }
                      >
                        {" "}
                        <img
                          src={
                            item?.images
                              ? item?.images[0]?.image
                              : "/assets/images/products/product-1.jpg"
                          }
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
                            href="# "
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
                        <a href="# ">{item.productName}</a>{" "}
                      </h3>
                      {/* End .product-container */}
                      <div className="price-box">
                        {" "}
                        <span className="product-price">
                          ₹{item?.mrp ? item.mrp : 200}
                        </span>{" "}
                        <del className="old-price">
                          ₹{item?.mrp ? item.mrp : 200}
                        </del>
                        <div className="category-list">
                          {" "}
                          <a href="# ">50% OFF</a>{" "}
                        </div>
                      </div>
                      {/* End .price-box */}
                    </div>
                    {/* End .product-details */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header">
                    <h5>Machinery Transport</h5>
                  </div>
                  <div className="card-body">
                    <div className="crd-machinery">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          Wanted Equipment <a href="# ">View All</a>
                        </li>
                        <li className="list-group-item">
                          Need used 5KL to 9KL 316 prefable....{" "}
                          <small>20-07-2022 01:04 PM</small>
                        </li>
                        <li className="list-group-item">
                          Need used 5KL to 9KL 316 prefable....{" "}
                          <small>20-07-2022 01:04 PM</small>
                        </li>
                        <li className="list-group-item">
                          Need used 5KL to 9KL 316 prefable....{" "}
                          <small>20-07-2022 01:04 PM</small>
                        </li>
                        <li className="list-group-item">
                          Need used 5KL to 9KL 316 prefable....{" "}
                          <small>20-07-2022 01:04 PM</small>
                        </li>
                        <button
                          className="btn btn-primary bg-dark border-0 text-capitalize"
                          data-toggle="modal"
                          data-target="#addEquipmentModal"
                        >
                          + Add Wanted Equipment
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card crd-statistics">
                  <div className="card-header">
                    <h5>Statistics</h5>
                  </div>
                  <div className="card-body text-center">
                    <ul className="list-group list-group-flush list-wrp">
                      <li className="list-group-item p-4">
                        <strong>4,071</strong> new machinery items this week
                      </li>
                      <li className="list-group-item p-4">
                        up to <strong>2 Mio</strong>. visitors monthly
                      </li>
                      <li className="list-group-item p-4">
                        <strong>47,797</strong> registered sellers
                      </li>
                      <li className="list-group-item p-4">
                        <strong>175,285</strong> buyers worldwide
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5>Contact Form</h5>
                  </div>
                  <Form id="enquiryForm" form={enquiryForm}>
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-md-6">
                          <Form.Item
                            name="name"
                            rules={[
                              { required: true, message: "Please enter name" },
                            ]}
                          >
                            <Input
                              className="form-control "
                              placeholder="Name"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-6">
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                type: "email",
                                message: "Please enter a valid email.",
                              },
                              {
                                required: true,
                                message: "please enter email.",
                              },
                            ]}
                          >
                            <Input
                              className="form-control "
                              placeholder="Email"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 ">
                          <Form.Item
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Please enter phone number.",
                              },
                            ]}
                          >
                            <Input
                              maxLength={12}
                              className="form-control"
                              placeholder="Phone"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-6">
                          <Form.Item
                            name="state"
                            rules={[
                              {
                                required: true,
                                message: "Please select your state",
                              },
                            ]}
                          >
                            <select
                              className="form-select form-control"
                              value={selectedState}
                              onChange={(event) =>
                                setSelectedState(event.target.value)
                              }
                            >
                              {states.length > 0 ? (
                                states.map(({ isoCode, name }) => (
                                  <option value={isoCode} key={isoCode}>
                                    {name}
                                  </option>
                                ))
                              ) : (
                                <option value="0" key="">
                                  No state found
                                </option>
                              )}
                            </select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="form-group">
                        <Form.Item
                          name="message"
                          required
                          rules={[
                            {
                              required: true,
                              message: "Please enter message.",
                            },
                          ]}
                        >
                          <TextArea
                            className="form-control"
                            rows={1}
                            defaultValue={""}
                          />
                        </Form.Item>
                      </div>
                      <button
                        className="btn btn-primary text-white text-capitalize w-100"
                        onClick={handleAddenquiry}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div
          className="modal fade"
          id="addEquipmentModal"
          aria-labelledby="addEquipmentModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Wanted Equipment</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-check mb-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <label
                    className="form-check-label ml-3"
                    htmlFor="defaultCheck1"
                  >
                    5KL to 9KL 316 prefable
                  </label>
                </div>
                <div className="form-check mb-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck2"
                  />
                  <label
                    className="form-check-label  ml-3"
                    htmlFor="defaultCheck2"
                  >
                    5KL to 9KL 316 prefable
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck3"
                  />
                  <label
                    className="form-check-label ml-3"
                    htmlFor="defaultCheck3"
                  >
                    5KL to 9KL 316 prefable
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End .container */}
        <GoToTop />
      </main>
    </>
  );
};

export default Home;
