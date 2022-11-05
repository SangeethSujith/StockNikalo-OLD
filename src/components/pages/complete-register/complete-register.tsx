import React, { useState } from "react";
import { Form, Button, Input, message, Select } from "antd";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../../store/user-store";
import RoutePath from "../../global/route-paths";
import "./style.css";
type CompleteRegistrationProps = {};
const CompleteRegistrationComponent: React.FC<any> = (
  props: CompleteRegistrationProps
) => {
  const { useForm } = Form;
  const [form1] = useForm();
  const [status, setStatus] = useState(true);
  const [form2] = useForm();
  const [form3] = useForm();
  const navigate = useNavigate();
  const CompleteSignupSession = (status: number) => {
    if (status == 1) {
      form1
        .validateFields()
        .then((values) => {
          document.getElementById("v-pills-profile-tab1")?.click();
        })
        .catch((errorinfo) => {
          console.log(errorinfo);
        });
    } else if (status == 2) {
      form2
        .validateFields()
        .then((values) => {
          document.getElementById("v-pills-messages-tab2")?.click();
        })
        .catch((errorinfo) => {
          console.log(errorinfo);
        });
    } else if (status == 3) {
      form3
        .validateFields()
        .then((values) => {
          const data = {
            userId: localStorage.getItem("userId"),
            telephone: form1.getFieldValue("telephone"),
            mobile_number: form1.getFieldValue("mobile_number"),
            company_name: form1.getFieldValue("company_name"),
            company_address: form2.getFieldValue("address_1"),
            company_district: form2.getFieldValue("district"),
            company_state: form2.getFieldValue("state"),
            company_pincode: form2.getFieldValue("pincode"),
            company_name2: form1.getFieldValue("company_name"),
            company_address2: form2.getFieldValue("address_1"),
            company_district2: form2.getFieldValue("district"),
            company_state2: form2.getFieldValue("state"),
            company_pincode2: form2.getFieldValue("pincode"),
            company_incorporation: form2.getFieldValue("partnership"),
            company_domain: form2.getFieldValue("website"),
            bank: form3.getFieldValue("bank"),
            company_gst: form2.getFieldValue("gst"),
            company_type: form2.getFieldValue("company_type"),
            company_short_desc: form2.getFieldValue("company_short_decp"),
            company_business_segment: form2.getFieldValue("company_short_decp"),
            bank_account_number: form3.getFieldValue("account_number"),
            ifsc_code: form3.getFieldValue("ifsc"),
          };
          console.log(data);
          userStore.addCompleteRegistration(data, (res: any) => {
            if (res?.statusCode == 200) {
              //message.success("User profile completed successfully");
              localStorage.setItem("userCmpReg", "1");

              form1.resetFields();
              form2.resetFields();
              form3.resetFields();

              swal({
                //title: "Are you sure?",
                text: "User profile updated successfully",
                icon: "success",
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  navigate(RoutePath.home);
                }
              });
            }
          });
        })
        .catch((errorinfo) => {
          console.log(errorinfo);
        });
    }
  };
  return (
    <>
      <main className="main">
        {/* Demo header*/}
        <section className="py-5 header">
          <div className="container py-4">
            <div className="row">
              <div className="col-md-12">
                {/* Tabs nav */}
                <div
                  className="nav flex-column nav-pills nav-pills-custom"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link mb-3 p-3  active col-4"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <i className="fa fa-user-circle-o mr-2" />
                    <span className="font-weight-bold small text-uppercase">
                      Basic Information
                    </span>
                  </a>
                  <a
                    className="nav-link mb-3 p-3 col-4"
                    id="v-pills-profile-tab1"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <i className="fa fa-calendar-minus-o mr-2" />
                    <span className="font-weight-bold small text-uppercase">
                      {" "}
                      Company Information
                    </span>
                  </a>
                  <a
                    className="nav-link mb-3 p-3 col-4"
                    id="v-pills-messages-tab2"
                    data-toggle="pill"
                    href="#v-pills-messages"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <i className="fa fa-user-circle-o mr-2" />
                    <span className="font-weight-bold small text-uppercase">
                      Bank Details
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-md-12">
                {/* Tabs content */}
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade  rounded bg-white show active p-5"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <h4 className="font-italic mb-4">Basic Information</h4>
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="checkout-steps">
                          <li>
                            <Form
                              id="InfoForm1"
                              form={form1}
                              key="InfoForm1"
                              preserve={false}
                            >
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      First name
                                      <abbr
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </abbr>
                                    </label>
                                    <Form.Item
                                      name="firstname"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please enter your first name",
                                        },
                                      ]}
                                    >
                                      <Input
                                        maxLength={70}
                                        placeholder="Enter First Name"
                                        className="form-control"
                                      />
                                    </Form.Item>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      Last name
                                      <abbr
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </abbr>
                                    </label>
                                    <Form.Item
                                      name="lastname"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please enter your last name",
                                        },
                                      ]}
                                    >
                                      <Input
                                        maxLength={70}
                                        placeholder="Enter Last Name"
                                        className="form-control"
                                      />
                                    </Form.Item>
                                  </div>
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Email Address</label>
                                  <Form.Item name="email">
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Email Address"
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="form-group col-md-6">
                                  <label>
                                    Company Name
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>

                                  <Form.Item
                                    name="company_name"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please enter your company name",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Company Name"
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Login Password</label>
                                  <Form.Item name="login_password">
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Login Password"
                                      className="form-control"
                                      type="password"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Confirm Password</label>
                                  <Form.Item name="confirm_password">
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Confirm Password"
                                      className="form-control"
                                      type="password"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="form-group col-md-6">
                                  <label>
                                    Telephone (landline)
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="telephone"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please enter your telephone number",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Telephone Number"
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="form-group col-md-6">
                                  <label>
                                    Mobile number
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="mobile_number"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please enter your mobile number",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Mobile number"
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            </Form>
                          </li>
                        </ul>
                        <hr />
                        <div className="form-footer-right">
                          <Button
                            className="btn btn-primary py-4"
                            form="InfoForm1"
                            key="submit"
                            htmlType="submit"
                            //onClick={saveSession}
                            onClick={() => {
                              CompleteSignupSession(1);
                            }}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade  rounded bg-white p-5"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <h4 className="font-italic mb-4">Company Information</h4>
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="checkout-steps">
                          <li>
                            <Form
                              id="InfoForm2"
                              form={form2}
                              key="InfoForm2"
                              preserve={false}
                            >
                              <div className="row">
                                <div className="col-md-6 form-group mb-1 pb-2">
                                  <label>
                                    Address 1
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="address_1"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter your address",
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
                                <div className="col-md-6 select-custom">
                                  <label>
                                    District{" "}
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="district"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select your district",
                                      },
                                    ]}
                                  >
                                    <select className="form-control">
                                      <option value={6} selected>
                                        Select
                                      </option>
                                      <option value={1}>Madurai</option>
                                      <option value={2}>Selam</option>
                                      <option value={3}>Chennai</option>
                                      <option value={4}>Chennai</option>
                                      <option value={5}>Chennai</option>
                                    </select>
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 select-custom">
                                  <label>
                                    State{" "}
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="state"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select your state",
                                      },
                                    ]}
                                  >
                                    <select className="form-control">
                                      <option value={6} selected>
                                        Select
                                      </option>

                                      <option value={1}>Kerala</option>
                                      <option value={2}>karnataka</option>
                                      <option value={3}>Andhra Pradhesh</option>
                                      <option value={4}>Kerala</option>
                                      <option value={5}>Kerala</option>
                                    </select>
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 form-group">
                                  <label>
                                    Pincode
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="pincode"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter your pincode",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={70}
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 form-group mb-1 pb-2">
                                  <label>
                                    Address 2
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="address_2"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter your address",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={70}
                                      className="form-control"
                                      placeholder="House number and street name"
                                    />
                                  </Form.Item>
                                </div>

                                <div className="col-md-6 form-group">
                                  <label>
                                    Website Domain
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="website"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please enter your website url",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={70}
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 select-custom">
                                  <label>
                                    Incorporation Type
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="partnership"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please select Incorporation Type",
                                      },
                                    ]}
                                  >
                                    <select className="form-control">
                                      <option value={6} selected>
                                        Select
                                      </option>
                                      <option value={1}>Proprietorship</option>
                                      <option value={2}>LLP</option>
                                      <option value={3}>LLC</option>
                                      <option value={4}>
                                        Private Limited Company etc
                                      </option>
                                      <option value={5}>Others</option>
                                    </select>
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 form-group">
                                  <label>
                                    GST IN
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="gst"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter your gst in",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={70}
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 select-custom">
                                  <label>
                                    Type of Company
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="company_type"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select Company Type",
                                      },
                                    ]}
                                  >
                                    <select className="form-control">
                                      <option value={4} selected>
                                        Select
                                      </option>
                                      <option value={1}>
                                        Service Provider
                                      </option>
                                      <option value={2}>Trader</option>
                                      <option value={3}>Others</option>
                                    </select>
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 select-custom">
                                  <label>
                                    Short Company Description
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="company_short_decp"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please select short description",
                                      },
                                    ]}
                                  >
                                    <select className="form-control">
                                      <option value={3} selected>
                                        Select
                                      </option>
                                      <option value={3}>
                                        Product Manufacture
                                      </option>
                                      <option value={1}>
                                        Deals in or end product
                                      </option>
                                      <option value={2}>Others</option>
                                    </select>
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 select-custom">
                                  <label>
                                    Business Segment
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="business_segment"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please select business segment",
                                      },
                                    ]}
                                  >
                                    <select className="form-control">
                                      <option value={6} selected>
                                        Select
                                      </option>
                                      <option value={1}>Pharma</option>
                                      <option value={2}>Food</option>
                                      <option value={3}>Cement</option>
                                      <option value={4}>Power</option>
                                      <option value={5}>Railway</option>
                                      <option value={5}>Others</option>
                                    </select>
                                  </Form.Item>
                                </div>
                              </div>
                            </Form>
                          </li>
                        </ul>
                        <hr />
                        <div className="form-footer-right">
                          <button
                            type="submit"
                            className="btn btn-primary py-4"
                          >
                            Back
                          </button>
                          <Button
                            className="btn btn-primary py-4"
                            form="InfoForm2"
                            key="submit"
                            htmlType="submit"
                            //onClick={saveSession}
                            onClick={() => {
                              CompleteSignupSession(2);
                            }}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade   rounded bg-white p-5"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <h4 className="font-italic mb-4"> Bank Details</h4>
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="checkout-steps">
                          <li>
                            <Form
                              id="InfoForm3"
                              form={form3}
                              key="InfoForm3"
                              preserve={false}
                            >
                              <div className="row">
                                <div className="col-md-6 form-group mb-1 pb-2">
                                  <label>
                                    Account Number
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="account_number"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please enter your account number",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Account Number"
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 select-custom">
                                  <label>
                                    Bank
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="bank"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select your bank",
                                      },
                                    ]}
                                  >
                                    <select className="form-control">
                                      <option value={6} selected>
                                        Select
                                      </option>
                                      <option value={1}>SBI</option>
                                      <option value={2}>CUB</option>
                                      <option value={3}>TMB</option>
                                      <option value={4}>ICICI</option>
                                      <option value={5}>Railway</option>
                                      <option value={5}>Others</option>
                                    </select>
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 form-group mb-1 pb-2">
                                  <label>
                                    IFSC Code
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>

                                  <Form.Item
                                    name="ifsc"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter ifsc code",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Code"
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            </Form>
                          </li>
                        </ul>
                        <hr />
                        <div className="form-footer-right">
                          <button
                            type="submit"
                            className="btn btn-primary py-4"
                          >
                            Back
                          </button>
                          <Button
                            className="btn btn-primary py-4"
                            form="InfoForm3"
                            key="submit"
                            htmlType="submit"
                            //onClick={saveSession}
                            onClick={() => {
                              CompleteSignupSession(3);
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                      <p hidden={status}>User profile completed successfully</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CompleteRegistrationComponent;
