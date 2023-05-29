import React, { useState, useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import authStore from "../../store/auth-store";
import RoutePath from "../../global/route-paths";
import productStore from "../../store/product-store";
import swal from "sweetalert";
import "./custom.css";
type RfqQuotePriceProps = {};

const RfqQuotePriceComponent: React.FC<any> = (props: RfqQuotePriceProps) => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const { useForm } = Form;
  const [form] = useForm();
  const [RfqsData, setRfqsData] = useState([]);
  const [QuotedRfqsData, setQuotedRfqsData] = useState([]);
  const [rfqDetailsPopup, setRfqDetailsPopup] = useState(true);
  const [popupData, setPopdata] = useState<any>([]);

  useEffect(() => {
    const rfqid = location.state?.id;
    // if (rfqid != undefined) {
    getQuotedRfq();
    // } else {
    //navigate(RoutePath.rfqs);
    //getRfqsDetailsbyID();
    // }
  }, []);

  const getRfqsDetailsbyID = () => {
    productStore.getRfqsDetailsByID((res: any) => {
      console.log("rfq data iss", res.data);
      setRfqsData(res.data);
    });
  };
  const getQuotedRfq = () => {
    productStore.getQuotedRfq((res: any) => {
      console.log(res);
      setQuotedRfqsData(res?.data);
      getRfqsDetailsbyID();
    });
  };

  const submitRfqQuote = () => {
    var data: any = new Array();
    const arr: any = new Array();
    RfqsData?.map((item: any, index: number) => {
      if (form.getFieldValue("price-" + index) != undefined) {
        data = {
          user_id: localStorage.getItem("userId"),
          rfq_id: item.rfqid,
          rfq_perticular_id: item.perticularId,
          quantity_raised: form.getFieldValue("qnty-" + index) ? form.getFieldValue("qnty-" + index) : item?.quantity,
          amount_raised: form.getFieldValue("price-" + index),
        };
        console.log("final data iss", data);
        arr.push(data);
      }
    });

    if (arr.length > 0) {
      const rfqData = {
        rfqData: arr,
      };
      productStore.submitRfqsQuote(rfqData, (res: any) => {
        if (res.status) {
          swal({
            //title: "Are you sure?",
            text: "RFQ sumbmitted successfully",
            icon: "success",
            dangerMode: true,
          }).then((success) => {
            if (success) {
              navigate(RoutePath.home);
            }
          });
        }
      });
    }
  };
  const handleRfqdetails = (id: string | number) => {
    console.log("tesing idd", id);
    if (id) {
      let popDetails: any = RfqsData.find((data: any) => (data?.rfqid
        == id));
      if (popDetails) {
        setPopdata(popDetails);
        setRfqDetailsPopup(false);
      }
      console.log("pop details", popDetails);
    }
  }
  const handleClose = () => {
    setRfqDetailsPopup(true);
  }

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
            <div className="col-12">
              <div className="widget top-widet d-none">
                {/* <h3 className="widget-title">
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
                </h3> */}
                <div className="collapse show" id="widget-body-2">
                  <div className="widget-body">
                    <ul className="cat-list">
                      <li>
                        {" "}
                        <a
                          href="#widget-category-1"
                          data-toggle="collapse"
                          className="collapsed"
                          role="button"
                          aria-expanded="false"
                          aria-controls="widget-category-1"
                        >
                          Accessories
                          <span className="products-count">(3)</span>{" "}
                          <span className="toggle" />{" "}
                        </a>
                        <div className="collapse" id="widget-category-1">
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
                          <span className="toggle" />
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
                          Electronics
                          <span className="products-count">(2)</span>{" "}
                          <span className="toggle" />
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
                          Fashion
                          <span className="products-count">(6)</span>{" "}
                          <span className="toggle" />
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
                        {" "}
                        <a
                          href="#widget-category-4"
                          className="collapsed no-dropdown"
                          // data-toggle="collapse"
                          role="button"
                          aria-expanded="false"
                          aria-controls="widget-category-4"
                        >
                          {" "}
                          Music
                          <span className="products-count">(2)</span>{" "}
                          {/* <span className="toggle" /> */}
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* End .widget-body */}
                </div>
                {/* End .collapse */}
              </div>
            </div>

            <div className="col-lg-12">
              <div
                className="category-banner banner text-uppercase"
                style={{
                  background:
                    'no-repeat 60%/cover url("/assets/images/slider/slide-1.jpg")',
                }}
              >
                {/* <div class="row">
                        <div class="pb-5 pb-md-0 col-sm-5 col-lg-5 offset-1">
                          <h3 class="mb-2 ls-10">Electronic<br>
                            Deals</h3>
                          <a href="#" class="btn btn-dark btn-black ls-10">Get Yours!</a>
                        </div>
                        <div class="col-sm-4 offset-sm-0 offset-1">
                          <div class="coupon-sale-content">
                            <h4 class="m-b-2 coupon-sale-text bg-white ls-10 text-transform-none">Exclusive COUPON </h4>
                            <h5 class="mb-2 coupon-sale-text d-block ls-10 p-0"><i class="ls-0">UP TO</i><b class="text-dark">$100</b> OFF</h5>
                          </div>
                        </div>
                      </div> */}
              </div>
              <div className="wishlist-table-container">
                <Form
                  id="checkout-form"
                  form={form}
                  key="checkout-form"
                  preserve={false}
                >
                  <table className="table table-wishlist mb-0 mt-5 border">
                    <thead>
                      <tr>
                        <th className="">Item Code</th>
                        <th className="">Item Name</th>
                        <th className="">Brand</th>
                        <th>Sku</th>
                        <th className="l">Quantity</th>
                        {/* <th className="">Size</th> */}
                        {/* <th className="">Target Price </th> */}
                        <th className="">Rate </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {RfqsData?.map((item: any, index: number) => {
                        console.log("testing",item?.submited == 1);
                        return(
                        <tr
                          style={{
                            background: QuotedRfqsData.some(function (
                              element: any
                            ) {
                              return (
                                element.rfq_perticular_id === item.perticularId
                              );
                            })
                              ? "#e9ecef"
                              : "",
                          }}
                          className="sk-product-row quote-product-row"
                        >
                          <td>
                            <span className="stock-status">{item?.item_code}</span>
                          </td>
                          <td className="">{item?.product_name}</td>
                          <td>
                            <span className="stock-status">
                              {item?.brand}
                            </span>
                          </td>
                          <td>
                            <span className="stock-status">{item.sku}</span>
                          </td>
                          {/* <td>
                            <span className="stock-status">
                              {item.target_price}
                            </span>
                          </td> */}
                          <td>
                            <Form.Item name={"qnty-" + index}>
                              <Input
                                className="form-control"
                                type="Number"
                                placeholder={
                                  QuotedRfqsData.some(function (element: any) {
                                    return (
                                      element.rfq_perticular_id ===
                                      item.perticularId
                                    );
                                  })
                                    ? "submitted"
                                    : "1"
                                }
                                style={{ width: '60px' }}
                                required
                                disabled={
                                  QuotedRfqsData.some(function (element: any) {
                                    return (
                                      element.rfq_perticular_id ===
                                      item.perticularId
                                    );
                                  })
                                    ? true
                                    : false
                                }
                              />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item name={"price-" + index}>
                              <Input className="form-control"
                                style={{ width: '80px' }}
                                required
                              />
                            </Form.Item>
                          </td>
                          <td className="text-right d-flex justify-content-end">
                             {/* <a
                              
                              onClick={() => submitRfqQuote()}
                              className={"btn btn-sm btn-primary"}
                              
                            >
                              Submit
                            </a> */}
                            <Button type="text" style={{background : "#08c"}} disabled={item?.submited == 1 ? true : false} onClick={(e) =>submitRfqQuote()}>Submit</Button>
                            <a
                              className="btn btn-sm btn-primary mr-2 btn-quickview"
                              title="Quick View"
                            >
                              <i className="fas fa-eye" onClick={(e) => handleRfqdetails(item?.rfqid
                              )}></i>
                            </a> 
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </Form>
              </div>
            </div>
            <div
              className="product-slide quick-view-popup w-100 Shadows p-4 alert"
              style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.6)" }}
              hidden={rfqDetailsPopup}
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
                  <div className="col-sm-12">
                    <div className="col-lg-7 col-md-6 product-single-details">
                      <h4 className="product-title">
                        Details
                      </h4>
                      <hr className="short-divider" />
                      <div className="price-box">
                        <span className="new-price">
                         {popupData?.product_name}
                        </span>
                      </div>
                      <div>
                        <p>{popupData?.note}</p>
                      </div>
                      <ul className="single-info-list">
                        <li>
                         Brand :{" "}
                        <strong>
                            <a href="#" className="product-category">
                              {popupData?.brand}
                            </a>
                          </strong>
                        </li>
                        <li>
                         Quantity :{" "}
                        <strong>
                            <a href="#" className="product-category">
                              {popupData?.quantity}
                            </a>
                          </strong>
                        </li>
                        <li>
                          CATEGORY:{" "}
                          <strong>
                            <a href="#" className="product-category">
                              {popupData?.category}
                            </a>
                          </strong>
                        </li>
                        <li>
                          Buyer Name:{" "}
                          <strong>
                            <a href="#" className="product-category">
                              {popupData?.name}
                            </a>
                          </strong>
                        </li>
                        <li>
                          Buyer location : {" "}
                          <strong>
                            <a href="#" className="product-category">
                              {popupData?.buyer_state ? popupData?.buyer_state : ""}
                            </a>
                          </strong>,
                          <strong>
                            <a href="#" className="product-category">
                              {popupData?.buyer_district ? popupData?.buyer_district : ""}
                            </a>
                          </strong>,
                          <strong>
                          <a href="#" className="product-category">
                            {popupData?.buyer_pincode ? popupData?.buyer_pincode : ""}
                          </a>
                          </strong>
                        </li>
                      </ul>
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
            {/* End .col-lg-9 */}
            <div className="sidebar-overlay" />
            <aside className="sidebar-shop col-lg-12 order-lg-first mobile-sidebar">
              <div className="sidebar-wrapper">
                <div className="widget">
                  <h3 className="widget-title">
                    {" "}
                    <a
                      data-toggle="collapse"
                      href="#widget-body-2"
                      className="collapsed"
                      role="button"
                      aria-expanded="false"
                      aria-controls="widget-body-2"
                    >
                      Categories
                    </a>{" "}
                  </h3>
                  <div className="collapse" id="widget-body-2">
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
                            Accessories
                            <span className="products-count">(3)</span>{" "}
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
                            Dress<span className="products-count">
                              (4)
                            </span>{" "}
                            <span className="toggle" />
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
                            Electronics
                            <span className="products-count">(2)</span>{" "}
                            <span className="toggle" />
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
                            Fashion
                            <span className="products-count">(6)</span>{" "}
                            <span className="toggle" />
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

export default RfqQuotePriceComponent;
