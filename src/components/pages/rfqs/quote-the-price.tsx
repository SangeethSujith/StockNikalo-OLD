import React, { useState, useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import authStore from "../../store/auth-store";
import RoutePath from "../../global/route-paths";
import productStore from "../../store/product-store";
import swal from "sweetalert";
import "./custom.css";
import { observer } from "mobx-react-lite";
import ReactPaginate from "react-paginate";
type RfqQuotePriceProps = {};
interface RfqsDataType {
  category: string;
  // Add other properties if there are any
}
const RfqQuotePriceComponent: React.FC<any> = (props: RfqQuotePriceProps) => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const { useForm } = Form;
  const [form] = useForm();
  const [RfqsData, setRfqsData] = useState([]);
  const [QuotedRfqsData, setQuotedRfqsData] = useState([]);
  const [rfqDetailsPopup, setRfqDetailsPopup] = useState(true);
  const [popupData, setPopdata] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log("selectedCategory : ", selectedCategory);
  useEffect(() => {
    const rfqid = location.state?.id;
    getQuotedRfq();
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

  const submitRfqQuote = (): void => {
    const submittedData: any[] = [];

    RfqsData?.forEach((item: any, index: number) => {
      const price: any = form.getFieldValue(`price-${index}`);

      if (price !== undefined) {
        const data: any = {
          user_id: localStorage.getItem("userId"),
          rfq_id: item.rfqid,
          rfq_perticular_id: item.perticularId,
          quantity_raised:
            form.getFieldValue(`qnty-${index}`) || item?.quantity,
          amount_raised: price,
        };

        console.log("final data is", data);
        submittedData.push(data);
      }
    });

    if (submittedData.length > 0) {
      const rfqData: any = {
        rfqData: submittedData,
      };

      console.log("current user is", authStore?.isRegistrationCompleted);

      if (authStore?.isRegistrationCompleted) {
        productStore.submitRfqsQuote(rfqData, (res: any) => {
          if (res.status) {
            swal({
              text: "RFQ submitted successfully",
              icon: "success",
              dangerMode: true,
            });
          }
        });
      } else {
        swal({
          text: "Please complete your registration to proceed with this action",
          icon: "warning",
          dangerMode: true,
        }).then((success: any) => {
          if (success) {
            navigate(RoutePath.home);
          }
        });
      }
    }
  };

  const updateRfqQuote = (): void => {
    const submittedData: any[] = [];
    
    RfqsData?.forEach((item: any, index: number) => {
      const price: any = form.getFieldValue(`price-${index}`);
      
      if (price !== undefined) {
        const data: any = {
          quotedId:item.quotedId,
          amount_raised: price,
          quantity_raised: form.getFieldValue(`qnty-${index}`) || item?.quantity,
          user_id: localStorage.getItem("userId"),
        };
        
        console.log("final data is", data);
        submittedData.push(data);
      }
    });
  
    if (submittedData.length > 0) {
      const rfqData: any = {
        rfqData: submittedData,
      };
      
      console.log("current user is", authStore?.isRegistrationCompleted);
      
      // if (authStore?.isRegistrationCompleted) {
      //   productStore.submitRfqsQuote(rfqData, (res: any) => {
      //     if (res.status) {
      //       swal({
      //         text: "RFQ submitted successfully",
      //         icon: "success",
      //         dangerMode: true,
      //       });
      //     }
      //   });
      // } else {
      //   swal({
      //     text: "Please complete your registration to proceed with this action",
      //     icon: "warning",
      //     dangerMode: true,
      //   }).then((success: any) => {
      //     if (success) {
      //       navigate(RoutePath.home);
      //     }
      //   });
      // }
    }
  };
  
  const handleRfqdetails = (id: string | number) => {
    console.log("tesing idd", id);
    if (id) {
      let popDetails: any = RfqsData.find((data: any) => data?.rfqid == id);
      if (popDetails) {
        setPopdata(popDetails);
        setRfqDetailsPopup(false);
      }
      console.log("pop details", popDetails);
    }
  };
  const handleClose = () => {
    setRfqDetailsPopup(true);
  };

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemsPerPage = 4; // Number of items to show per page
  // ...

  // Calculate the indexes of the data array for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = RfqsData.slice(startIndex, endIndex);
  console.log("RfqsData", RfqsData);

  // Reduce the jsonData to create an array of unique categories
  const uniqueCategories = RfqsData.reduce((unique: string[], item: any) => {
    if (!unique.includes(item.category)) {
      unique.push(item.category);
    }
    return unique;
  }, []);
  console.log("uniqueCategories", uniqueCategories);

  // Filter the data based on the selected category
  const categorizedData: RfqsDataType[] = RfqsData.filter(
    (item: RfqsDataType) => item.category === selectedCategory
  );
  console.log("Categorized data : ", categorizedData);
  return (
    <>
      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="widget top-widet d-none">
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
              ></div>
              <div className="wishlist-table-container">
                <Form
                  id="checkout-form"
                  form={form}
                  key="checkout-form"
                  preserve={false}
                  // initialValues={{
                  //   "qty-1": 10,
                  // }}
                >
                  <table className="table table-wishlist mb-0 mt-5 border">
                    <thead>
                      <tr>
                        <th className="">Item Code</th>
                        <th className="">Item Name</th>
                        <th className="">Brand</th>
                        <th>Sku</th>
                        <th className="l">Quantity</th>
                        <th className="">Rate </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {selectedCategory === ""
                        ? currentData.map((item: any, index: number) => (
                            <tr
                              style={{
                                background: QuotedRfqsData.some(function (
                                  element: any
                                ) {
                                  return (
                                    element.rfq_perticular_id ===
                                    item.perticularId
                                  );
                                })
                                  ? "#e9ecef"
                                  : "",
                              }}
                              className="sk-product-row quote-product-row"
                            >
                              <td>
                                <span className="stock-status">
                                  {item?.item_code}
                                </span>
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
                              <td>
                                <Form.Item name={"qnty-" + index}>
                                  <Input
                                    className="form-control"
                                    type="Number"
                                    defaultValue={item.quantity_raised}
                                    // placeholder={
                                    // item.quantity_raised
                                    // QuotedRfqsData.some(function (
                                    //   element: any
                                    // ) {
                                    //   return (
                                    //     element.rfq_perticular_id ===
                                    //     item.perticularId
                                    //   );
                                    // })
                                    //   ? "submitted"
                                    //   : "1"
                                    // }
                                    style={{ width: "60px" }}
                                    required
                                    disabled={
                                      QuotedRfqsData.some(function (
                                        element: any
                                      ) {
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
                                  <Input
                                    placeholder={item.amount_raised}
                                    defaultValue={item.amount_raised}
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    required
                                  />
                                </Form.Item>
                              </td>
                              <td className="text-right d-flex justify-content-end">
                                {item?.submited == 0 ? (
                                  <Button
                                    type="text"
                                    style={{ background: "#08c" }}
                                    onClick={(e) => submitRfqQuote()}
                                  >
                                    Submit
                                  </Button>
                                ) : (
                                  <Button
                                    type="text"
                                    style={{ background: "#F2BE22" }}
                                    onClick={(e) => updateRfqQuote()}
                                  >
                                    Update
                                  </Button>
                                )}

                                <a
                                  className="btn btn-sm btn-primary mr-2 btn-quickview"
                                  title="Quick View"
                                >
                                  <i
                                    className="fas fa-eye"
                                    onClick={(e) =>
                                      handleRfqdetails(item?.rfqid)
                                    }
                                  ></i>
                                </a>
                              </td>
                            </tr>
                          ))
                        : categorizedData.map((item: any, index: number) => (
                            <tr
                              style={{
                                background: QuotedRfqsData.some(function (
                                  element: any
                                ) {
                                  return (
                                    element.rfq_perticular_id ===
                                    item.perticularId
                                  );
                                })
                                  ? "#e9ecef"
                                  : "",
                              }}
                              className="sk-product-row quote-product-row"
                            >
                              <td>
                                <span className="stock-status">
                                  {item?.item_code}
                                </span>
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
                              <td>
                                <Form.Item name={"qnty-" + index}>
                                  <Input
                                    className="form-control"
                                    type="Number"
                                    defaultValue={item.quantity_raised}
                                    // placeholder={
                                    // item.quantity_raised
                                    // QuotedRfqsData.some(function (
                                    //   element: any
                                    // ) {
                                    //   return (
                                    //     element.rfq_perticular_id ===
                                    //     item.perticularId
                                    //   );
                                    // })
                                    //   ? "submitted"
                                    //   : "1"
                                    // }
                                    style={{ width: "60px" }}
                                    required
                                    disabled={
                                      QuotedRfqsData.some(function (
                                        element: any
                                      ) {
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
                                  <Input
                                    placeholder={item.amount_raised}
                                    defaultValue={item.amount_raised}
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    required
                                  />
                                </Form.Item>
                              </td>
                              <td className="text-right d-flex justify-content-end">
                                {item.quantity == "" ? (
                                  <Button
                                    type="text"
                                    style={{ background: "#08c" }}
                                    onClick={(e) => submitRfqQuote()}
                                  >
                                    Submit
                                  </Button>
                                ) : (
                                  <Button
                                    type="text"
                                    style={{ background: "#F2BE22" }}
                                    onClick={(e) => updateRfqQuote()}
                                  >
                                    Update
                                  </Button>
                                )}

                                <a
                                  className="btn btn-sm btn-primary mr-2 btn-quickview"
                                  title="Quick View"
                                >
                                  <i
                                    className="fas fa-eye"
                                    onClick={(e) =>
                                      handleRfqdetails(item?.rfqid)
                                    }
                                  ></i>
                                </a>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                  <div
                    hidden={selectedCategory !== ""}
                    className="pagination-container"
                    draggable="false"
                    style={{ marginTop: "20px" }}
                  >
                    <ReactPaginate
                      nextLabel="NEXT >"
                      onPageChange={handlePageChange}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={Math.ceil(RfqsData.length / itemsPerPage)}
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
                </Form>
              </div>
            </div>
            <div
              className="product-slide quick-view-popup w-100 Shadows p-4 alert"
              style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.6)" }}
              hidden={rfqDetailsPopup}
            >
              <button onClick={handleClose} type="button" className="close">
                <span aria-hidden="true">×</span>
              </button>
              <div className="quick-view-inner">
                <div className="row pt-4">
                  <div className="col-sm-12">
                    <div className="col-lg-7 col-md-6 product-single-details">
                      <h4 className="product-title">Details</h4>
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
                          Buyer location :{" "}
                          <strong>
                            <a href="#" className="product-category">
                              {popupData?.buyer_state
                                ? popupData?.buyer_state
                                : ""}
                            </a>
                          </strong>
                          ,
                          <strong>
                            <a href="#" className="product-category">
                              {popupData?.buyer_district
                                ? popupData?.buyer_district
                                : ""}
                            </a>
                          </strong>
                          ,
                          <strong>
                            <a href="#" className="product-category">
                              {popupData?.buyer_pincode
                                ? popupData?.buyer_pincode
                                : ""}
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
                        {uniqueCategories?.map((item: any, index: number) => {
                          return (
                            <li
                              className="category-button"
                              onClick={() => {
                                setSelectedCategory(`${item}`);
                              }}
                            >
                              {item}
                            </li>
                          );
                        })}
                        <li
                          className="category-button"
                          onClick={() => setSelectedCategory("")}
                          style={{ color: "#FF6666" }}
                        >
                          Reset Filter
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

export default observer(RfqQuotePriceComponent);
