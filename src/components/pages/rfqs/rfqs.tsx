import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import authStore from "../../store/auth-store";
import RoutePath from "../../global/route-paths";
import swal from "sweetalert";
import "./custom.css";
type RfqsProps = {};

const RfqsComponent: React.FC<any> = (props: RfqsProps) => {
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
              {/* <li class="breadcrumb-item"><a href="#">Air Handling</a></li> */}
              <li className="breadcrumb-item active" aria-current="page">
                RFQs
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-9">
              <div
                className="category-banner banner text-uppercase"
                style={{
                  background:
                    'no-repeat 60%/cover url("assets/images/slider/slide-1.jpg")',
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
              <div className="rfq-table-container">
                <table className="table table-rfq mb-0 mt-5 border">
                  <thead>
                    <tr>
                      <th className="">Sl No</th>
                      <th className="">Submitted By</th>
                      <th className="l">Submitted On</th>
                      <th className="">No of Items</th>
                      <th className=""> </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr className="product-row">
                      <td>
                        <span className="rfq-serial">#001</span>
                      </td>
                      <td className="">iBELL M200-105 IGBT Inverter</td>
                      <td>
                        <span className="rfq-date">12-11-2022 </span>
                      </td>
                      <td>
                        <span className="rfq-qty">75</span>
                      </td>
                      <td>
                        <span className="rfq-btn">
                          {" "}
                          <button className="btn btn-success btn-add-cart product-type-simple btn-shop">
                            View
                          </button>
                        </span>
                      </td>
                    </tr>
                    <tr className="product-row">
                      <td>
                        <span className="rfq-serial">#001</span>
                      </td>
                      <td className="">iBELL M200-105 IGBT Inverter</td>
                      <td>
                        <span className="rfq-date">12-11-2022 </span>
                      </td>
                      <td>
                        <span className="rfq-qty">75</span>
                      </td>
                      <td>
                        <span className="rfq-btn">
                          {" "}
                          <button className="btn btn-success btn-add-cart product-type-simple btn-shop">
                            View
                          </button>
                        </span>
                      </td>
                    </tr>
                    <tr className="product-row">
                      <td>
                        <span className="rfq-serial">#001</span>
                      </td>
                      <td className="">iBELL M200-105 IGBT Inverter</td>
                      <td>
                        <span className="rfq-date">12-11-2022 </span>
                      </td>
                      <td>
                        <span className="rfq-qty">75</span>
                      </td>
                      <td>
                        <span className="rfq-btn">
                          {" "}
                          <button className="btn btn-success btn-add-cart product-type-simple btn-shop">
                            View
                          </button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                            Fashion<span className="products-count">
                              (6)
                            </span>{" "}
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

export default RfqsComponent;
