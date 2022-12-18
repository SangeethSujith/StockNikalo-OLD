import React, { useEffect, useState } from "react";
import { Form, Button, Input, message, Select } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import RoutePath from "../../global/route-paths";
import userStore from "../../store/user-store";
import swal from "sweetalert";
import "./style.css";
type CartProps = {};

const CheckoutComponent: React.FC<any> = (props: CartProps) => {
  const navigate = useNavigate();
  const { useForm } = Form;
  const [form] = useForm();
  const [CartData, setCartData] = useState([]);
  const [BillingAddress, setBillingAddress] = useState([]);
  const [BillingAddressId, setBillingAddressId] = useState(0);
  const [subTotal, setsubTotal] = useState(Number);
  const [TotalQty, setTotalQty] = useState(Number);
  const [CartId, setCartId] = useState([]);

  useEffect(() => {
    getUserCart();
    getUserAddress();
  }, []);
  const getUserAddress = () => {
    userStore.getUserAddress((res: any) => {
      if (res.status) {
        setBillingAddress(res.data);
      }
    });
  };
  const handleClick = (e: any, index: any) => {
    let element = document.getElementsByClassName("billing-col");
    for (var i = 0; i < element.length; i++) {
      element[i].classList.remove("active");
    }
    e.currentTarget.classList.toggle("active");
    setBillingAddressId(BillingAddress[index]?.["id"]);

    form.setFieldsValue({
      first_name: BillingAddress[index]?.["first_name"],
      last_name: BillingAddress[index]?.["last_name"],
      appartment: BillingAddress[index]?.["appartment"],
      street: BillingAddress[index]?.["street"],
      email: BillingAddress[index]?.["email"],
      town: BillingAddress[index]?.["town"],
      country: BillingAddress[index]?.["country"],
      state: BillingAddress[index]?.["state"],
      zip: BillingAddress[index]?.["zip"],
      phone: BillingAddress[index]?.["phone"],
    });
  };

  const getUserCart = () => {
    userStore.getUserCart((res: any) => {
      if (res.status) {
        setCartData(res.data);
        console.log(res.data);
        var tot = 0;
        var price = 0;
        var qty = 0;
        const arr: any = new Array();
        res?.data?.map(
          (item: any) => (
            (price = item.qty * item.productPrice),
            (tot = tot + price),
            (qty = qty + parseInt(item.qty)),
            arr.push(item.id)
          )
        );
        setsubTotal(tot);
        setTotalQty(qty);
        setCartId(Array.from(new Set(arr)));
      }
    });
  };
  const placeOrder = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          user_id: parseInt(localStorage.getItem("userId")!),
          total: subTotal,
          paid_amount: subTotal,
          total_items: CartData.length,
          total_quantity: TotalQty,
          is_new_billing_address: BillingAddressId,
          billing_address: {
            ...values,
          },
          cart_id: CartId,
        };

        userStore.createOrder(data, (res: any) => {
          if (res.status) {
            swal({
              //title: "Are you sure?",
              text: "Order Created successfully",
              icon: "success",
              dangerMode: true,
            }).then((success) => {
              if (success) {
                navigate(RoutePath.home);
              }
            });
          }
        });
      })
      .catch((errorinfo) => {
        console.log(errorinfo);
      });
  };
  return (
    <>
      <link rel="stylesheet" href="/assets/css/style.min.css"></link>
      <main className="main main-test">
        <div className="container checkout-container">
          <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
            <li>
              <a
                onClick={() => navigate(RoutePath.cart)}
                style={{ cursor: "pointer" }}
              >
                Shopping Cart
              </a>
            </li>
            <li className="active">
              <a
                onClick={() => navigate(RoutePath.checkout)}
                style={{ cursor: "pointer" }}
              >
                Checkout
              </a>
            </li>
            <li className="disabled">
              <a href="#">Order Complete</a>
            </li>
          </ul>
          <div className="login-form-container">
            {/* <h4>
              Returning customer?
              <button
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                className="btn btn-link btn-toggle"
              >
                Login
              </button>
            </h4> */}
            <div id="collapseOne" className="collapse">
              <div className="login-section feature-box">
                <div className="feature-box-content">
                  <form action="#" id="login-form">
                    <p>
                      If you have shopped with us before, please enter your
                      details below. If you are a new customer, please proceed
                      to the Billing &amp; Shipping section.
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="mb-0 pb-1">
                            Username or email{" "}
                            <span className="required">*</span>
                          </label>
                          <input type="email" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="mb-0 pb-1">
                            Password <span className="required">*</span>
                          </label>
                          <input type="password" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn">
                      LOGIN
                    </button>
                    <div className="form-footer mb-1">
                      <div className="custom-control custom-checkbox mb-0 mt-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="lost-password"
                        />
                        <label
                          className="custom-control-label mb-0"
                          htmlFor="lost-password"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="forgot-password.html"
                        className="forget-password"
                      >
                        Lost your password?
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="checkout-discount">
            <h4>
              Select your delivery address
              {/* <button
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseOne"
                className="btn btn-link btn-toggle"
              >
                ENTER YOUR CODE
              </button> */}
            </h4>
            <div id="collapseTwo" className="collapse">
              <div className="feature-box">
                <div className="feature-box-content">
                  <p>If you have a coupon code, please apply it below.</p>
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-sm w-auto"
                        placeholder="Coupon code"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-sm mt-0" type="submit">
                          Apply Coupon
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {BillingAddress?.length > 0 &&
            BillingAddress?.map((item: any, index: any) => (
              <div className="row">
                <div className="col-lg-5">
                  <div
                    className="order-summary billing-col"
                    onClick={(e) => handleClick(e, index)}
                  >
                    <h3>Address {index + 1}</h3>
                    <div className="paymsents-methods">
                      <p className="">
                        Name : {item.first_name} {item.last_name}
                      </p>
                      <p className="">Street : {item.street}</p>
                      <p className="">Town : {item.town}</p>
                      <p className="">Apartment : {item.appartment}</p>
                      <p className="">Country : {item.country}</p>
                      <p className="">Zip : {item.zip}</p>
                      <p className="">Contact Number : {item.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="row">
            <div className="col-lg-7">
              <ul className="checkout-steps">
                <li>
                  <h2 className="step-title">Billing details</h2>
                  <Form
                    id="checkout-form"
                    form={form}
                    key="checkout-form"
                    preserve={false}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            First name
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Form.Item
                            name="first_name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your first name",
                              },
                            ]}
                          >
                            <Input maxLength={70} className="form-control" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Last name
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <Form.Item
                            name="last_name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your last name",
                              },
                            ]}
                          >
                            <Input maxLength={70} className="form-control" />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Company name (optional)</label>
                      <Form.Item name="company_name">
                        <Input maxLength={70} className="form-control" />
                      </Form.Item>
                    </div>
                    <div className="select-custom">
                      <label>
                        Country / Region
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <Form.Item
                        name="country"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your country",
                          },
                        ]}
                      >
                        <select name="orderby" className="form-control">
                          <option value="0" selected>
                            Select
                          </option>
                          <option value={1}>Brunei</option>
                          <option value={2}>Bulgaria</option>
                          <option value={3}>Burkina Faso</option>
                          <option value={4}>Burundi</option>
                          <option value={5}>Cameroon</option>
                        </select>
                      </Form.Item>
                    </div>
                    <div className="form-group mb-1 pb-2">
                      <label>
                        Street address
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <Form.Item
                        name="street"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your street name",
                          },
                        ]}
                      >
                        <Input
                          maxLength={70}
                          placeholder="House number and street name"
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <Form.Item
                        name="appartment"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your apartment name",
                          },
                        ]}
                      >
                        <Input
                          maxLength={70}
                          placeholder="Apartment, suite, unite, etc. (optional)"
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <label>
                        Town / City
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <Form.Item
                        name="town"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your town name",
                          },
                        ]}
                      >
                        <Input maxLength={70} className="form-control" />
                      </Form.Item>
                    </div>
                    <div className="select-custom">
                      <label>
                        State / County{" "}
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <Form.Item
                        name="state"
                        rules={[
                          {
                            required: true,
                            message: "Please select state",
                          },
                        ]}
                      >
                        <select name="orderby" className="form-control">
                          <option value="0" selected>
                            Select
                          </option>
                          <option value={1}>Brunei</option>
                          <option value={2}>Bulgaria</option>
                          <option value={3}>Burkina Faso</option>
                          <option value={4}>Burundi</option>
                          <option value={5}>Cameroon</option>
                        </select>
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <label>
                        Postcode / Zip
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <Form.Item
                        name="zip"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your zip code",
                          },
                        ]}
                      >
                        <Input maxLength={70} className="form-control" />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <label>
                        Phone{" "}
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your phone number",
                          },
                        ]}
                      >
                        <Input
                          type="tel"
                          maxLength={70}
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <label>
                        Email address
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email id",
                          },
                        ]}
                      >
                        <Input
                          type="email"
                          maxLength={70}
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group mb-1">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="create-account"
                        />
                        <label
                          className="custom-control-label"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-controls="collapseThree"
                          htmlFor="create-account"
                        >
                          Create an account?
                        </label>
                      </div>
                    </div>
                    <div id="collapseThree" className="collapse">
                      <div className="form-group">
                        <label>
                          Create account password
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input
                          type="password"
                          placeholder="Password"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox mt-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="different-shipping"
                        />
                        <label
                          className="custom-control-label"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-controls="collapseFour"
                          htmlFor="different-shipping"
                        >
                          Ship to a different address?
                        </label>
                      </div>
                    </div>
                    <div id="collapseFour" className="collapse">
                      <div className="shipping-info">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                First name{" "}
                                <abbr className="required" title="required">
                                  *
                                </abbr>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Last name{" "}
                                <abbr className="required" title="required">
                                  *
                                </abbr>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Company name (optional)</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="select-custom">
                          <label>
                            Country / Region <span className="required">*</span>
                          </label>
                          <select name="orderby" className="form-control">
                            <option value="" selected>
                              Vanuatu
                            </option>
                            <option value={1}>Brunei</option>
                            <option value={2}>Bulgaria</option>
                            <option value={3}>Burkina Faso</option>
                            <option value={4}>Burundi</option>
                            <option value={5}>Cameroon</option>
                          </select>
                        </div>
                        <div className="form-group mb-1 pb-2">
                          <label>
                            Street address{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="House number and street name"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Apartment, suite, unit, etc. (optional)"
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            Town / City{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="select-custom">
                          <label>
                            State / County{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <select name="orderby" className="form-control">
                            <option value="" selected>
                              NY
                            </option>
                            <option value={1}>Brunei</option>
                            <option value={2}>Bulgaria</option>
                            <option value={3}>Burkina Faso</option>
                            <option value={4}>Burundi</option>
                            <option value={5}>Cameroon</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>
                            Postcode / ZIP{" "}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="order-comments">
                        Order notes (optional)
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        defaultValue={""}
                      />
                    </div>
                  </Form>
                </li>
              </ul>
            </div>
            {/* End .col-lg-8 */}
            <div className="col-lg-5">
              <div className="order-summary">
                <h3>YOUR ORDER</h3>
                <table className="table table-mini-cart">
                  <thead>
                    <tr>
                      <th colSpan={2}>Product</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CartData?.map((item: any) => (
                      <tr>
                        <td className="product-col">
                          <h3 className="product-title">
                            {item.productName} ×
                            <span className="product-qty">{item.qty}</span>
                          </h3>
                        </td>
                        <td className="price-col">
                          <span>₹{item.qty * item.productPrice}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="cart-subtotal">
                      <td>
                        <h4>Subtotal</h4>
                      </td>
                      <td className="price-col">
                        <span>₹{subTotal}</span>
                      </td>
                    </tr>
                    <tr className="order-shipping">
                      <td className="text-left" colSpan={2}>
                        <h4 className="m-b-sm">Shipping</h4>
                        <div className="form-group form-group-custom-control">
                          <div className="custom-control custom-radio d-flex">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="radio"
                              defaultChecked
                            />
                            <label className="custom-control-label">
                              Local Pickup
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .form-group */}
                        <div className="form-group form-group-custom-control mb-0">
                          <div className="custom-control custom-radio d-flex mb-0">
                            <input
                              type="radio"
                              name="radio"
                              className="custom-control-input"
                            />
                            <label className="custom-control-label">
                              Flat Rate
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .form-group */}
                      </td>
                    </tr>
                    <tr className="order-total">
                      <td>
                        <h4>Total</h4>
                      </td>
                      <td>
                        <b className="total-price">
                          <span>₹{subTotal}</span>
                        </b>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                {/* <div className="payment-methods">
                  <h4 className="">Payment methods</h4>
                  <div className="info-box with-icon p-0">
                    <p>
                      Sorry, it seems that there are no available payment
                      methods for your state. Please contact us if you require
                      assistance or wish to make alternate arrangements.
                    </p>
                  </div>
                </div> */}
                <button
                  onClick={placeOrder}
                  className="btn btn-dark btn-place-order"
                >
                  Place order
                </button>
              </div>
              {/* End .cart-summary */}
            </div>
            {/* End .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </main>
    </>
  );
};

export default CheckoutComponent;
