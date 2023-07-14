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
import RfqDetailModal from "./RfqDetailModal";
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
  const [currentData,setCurrentData] = useState([]);
  const [QuotedRfqsData, setQuotedRfqsData] = useState<any>([]);
  const [rfqDetailsPopup, setRfqDetailsPopup] = useState(true);
  const [popupData, setPopdata] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [prices, setPrices] = useState([]);
  const [quantities,setQuantity] = useState([]);
  const itemsPerPage = 10; // Number of items to show per page
  useEffect(() => {
    const rfqid = location.state?.id;
    getQuotedRfq();
  }, []);

  const getRfqsDetailsbyID = () => {
    productStore.getRfqsDetailsByID((res: any) => {
      if(res.data){
        setRfqsData(res.data);
        getRfqdataPerPage(res.data,currentPage);
      }
    });
  };
  const getRfqdataPerPage = (data:any,currentPage:number)=>{
    
    // Calculate the indexes of the data array for the current page
    console.log("currentage",currentPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log("start index",startIndex,endIndex);
    let updatedPrices:any = [];
    let updatedQuantity:any = [];
    const currentRfqData = data?.slice(startIndex, endIndex);
    currentRfqData?.forEach((item:any)=>{
      updatedPrices.push(item?.amount_raised);
      updatedQuantity.push(item.quantity_raised);
    });
    setPrices(updatedPrices);
    setQuantity(updatedQuantity);
    setCurrentData(currentRfqData);
  }
  const getQuotedRfq = () => {
    productStore.getQuotedRfq((res: any) => {
      setQuotedRfqsData(res?.data);
      getRfqsDetailsbyID();
    });
  };

  const submitRfqQuote = (rfqData:any,index:number): void => {
    //const submittedData: any[] = [];
    const price: any = prices[index];
    const quantity :any = quantities[index];
    const data: any = {
      user_id: localStorage.getItem("userId"),
      rfq_id: rfqData.rfqid,
      rfq_perticular_id: rfqData.perticularId,
      quantity_raised: quantity,
       // form.getFieldValue(`qnty-${index}`) || rfqData?.quantity,
      amount_raised: price,
    };

      if (authStore?.isRegistrationCompleted) {
        productStore.submitRfqsQuote(data, (res: any) => {
          if (res.status) {
            getQuotedRfq();
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
    
  };

  const updateRfqQuote = (rfqData:any,index:number): void => {
    const price: any = prices[index];
    //const quantity :any = form.getFieldValue(`qnty-${index}`) || rfqData?.quantity;
    const quantity :any = quantities[index];
    const data: any = {
            amount_raised: price,
            quantity_raised: quantity,
            userId: localStorage.getItem("userId"),
          };
      if (authStore?.isRegistrationCompleted) {
        productStore.updateRfqsQuote(data, rfqData?.quotedId, (res: any) => {
          if (res.status) {
            getRfqsDetailsbyID();
            swal({
              text: "RFQ updated successfully",
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
  };

  const handleRfqdetails = (id: string | number) => {
    if (id) {
      let popDetails: any = RfqsData.find((data: any) => data?.rfqid == id);
      if (popDetails) {
        setPopdata(popDetails);
        setRfqDetailsPopup(false);
      }
    }
  };
  const handleClose = () => {
    setRfqDetailsPopup(true);
  };

  const handlePageChange = (selectedPage: any) => {
    console.log("inside page change iss",selectedPage);
    setCurrentPage(selectedPage.selected);
    getRfqdataPerPage(RfqsData,selectedPage.selected);
  };

  // Reduce the jsonData to create an array of unique categories
  const uniqueCategories = RfqsData.reduce((unique: string[], item: any) => {
    if (!unique.includes(item.category)) {
      unique.push(item.category);
    }
    return unique;
  }, []);

  // Filter the data based on the selected category
  const categorizedData: RfqsDataType[] = RfqsData.filter(
    (item: RfqsDataType) => item.category === selectedCategory
  );
  const handlePriceChange = (index:number, value:any) => {
    const updatedPrices:any = [...prices];
    updatedPrices[index] = value;
    setPrices(updatedPrices);
  };
  const handleQuantityChange = (index:number, value:any) =>{
    const updatedQuantity:any = [...quantities];
    updatedQuantity[index] = value;
    setQuantity(updatedQuantity);
  }

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
                        ? currentData.map((item: any, index: number) => {
                          return(
                            <tr
                              style={{
                                background: [QuotedRfqsData]?.some(function (
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
                                {/* <Form.Item name={"qnty-" + index}> */}
                                  <Input
                                    className="form-control"
                                    type="Number"
                                    //defaultValue={item.quantity_raised}
                                    style={{ width: "60px" }}
                                    required
                                    disabled={
                                      [QuotedRfqsData]?.some(function (
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
                                    value={quantities[index]}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                  />
                                {/* </Form.Item> */}
                              </td>
                              <td>
                                {/* <Form.Item name={"price-" + index}> */}
                                  <Input
                                    //placeholder={item.amount_raised}
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    value={prices[index]}
                                    onChange={(e) => handlePriceChange(index, e.target.value)}
                                    required
                                  />
                                {/* </Form.Item> */}
                              </td>
                              <td className="text-right d-flex justify-content-end">
                                {item?.submited == 0 ? (
                                  <Button
                                    type="text"
                                    style={{ background: "#08c" }}
                                    onClick={(e) => submitRfqQuote(item,index)}
                                  >
                                    Submit
                                  </Button>
                                ) : (
                                  <Button
                                    type="text"
                                    style={{ background: "#F2BE22" }}
                                    onClick={(e) => updateRfqQuote(item,index)}
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
                          )})
                        : categorizedData.map((item: any, index: number) => (
                            <tr
                              style={{
                                background: [QuotedRfqsData]?.some(function (
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
                                    style={{ width: "60px" }}
                                    required
                                    disabled={
                                      [QuotedRfqsData]?.some(function (
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
                                    onClick={(e) => submitRfqQuote(item,index)}
                                  >
                                    Submit
                                  </Button>
                                ) : (
                                  <Button
                                    type="text"
                                    style={{ background: "#F2BE22" }}
                                    onClick={(e) => updateRfqQuote(item,index)}
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
                                    onClick={(e) =>{
                                      console.log("hello")
                                      handleRfqdetails(item?.rfqid)
                                    }
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
            <RfqDetailModal showModal={rfqDetailsPopup} handleClose={handleClose} rfqData={popupData}/>
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
