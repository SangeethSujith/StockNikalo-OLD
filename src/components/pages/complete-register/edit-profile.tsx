import React, { useState, useEffect } from "react";
import { Form, Button, Input, message, Select } from "antd";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../../store/user-store";
import authStore from "../../store/auth-store";
import RoutePath from "../../global/route-paths";
import "./style.css";
import { Country, State, City } from "country-state-city";
import { Console } from "console";
type EditProfileProps = {};
const EditProfileComponent: React.FC<any> = (props: EditProfileProps) => {
  const { useForm } = Form;
  const [form1] = useForm();
  const [status, setStatus] = useState(true);
  const [form2] = useForm();
  const [form3] = useForm();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [comapnyType, setComapnyType] = useState([]);
  const [businesSegment, setBusinesSegment] = useState([]);
  const [incorporationType, setIncorporationType] = useState([]);

  // useEffect(() => {
  //   setSelectedState("IN");
  //   form2.setFieldsValue({
  //     country: "IN",
  //   });
  // }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await Country.getAllCountries();
        let allCountries: any = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        //const [{ isoCode: firstCountry } = {}] = allCountries;
        const [{ isoCode: firstCountry = "IN" } = {}] = allCountries;
        setCountries(allCountries);
        setSelectedCountry("IN");
        // form2.setFieldsValue({
        //   country: firstCountry,
        // });
      } catch (error) {
        setCountries([]);
      }
    };
    getprofileData();
    getCountries();
    getTypeofCompany();
    getBusinesSegment();
    getIncorporationType();
  }, []);
  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await State.getStatesOfCountry(selectedCountry);
        let allStates: any = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstState = "" } = {}] = allStates;
        setStates(allStates);
        setSelectedState(firstState);
        form2.setFieldsValue({
          company_state: firstState,
        });
      } catch (error) {
        setStates([]);
      }
    };

    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await City.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        let allCities: any = [];

        allCities = result?.map(({ name }) => ({
          name,
        }));
        const [{ name: firstCity = "" } = {}] = allCities;

        setCities(allCities);
        setSelectedCity(firstCity);
        form2.setFieldsValue({
          company_district: firstCity,
        });
      } catch (error) {
        setStates([]);
      }
    };

    getCities();
  }, [selectedState]);

  const getTypeofCompany = () => {
    userStore.getTypeofCompany((res: any) => {
      if (res.status) {
        setComapnyType(res.data);
      }
    });
  };
  const getprofileData = () => {
    let data = { userId: localStorage.getItem("userId") };
    userStore.editprofile(data, (res: any) => {
      if (res.status) {
        const { email, name, company_name, last_name,
          mobile_number, telephone, company_address,
          company_address2, company_business_segment, company_state,company_country,
          company_district, company_gst, company_domain, company_type,
          company_short_desc, company_pincode, company_incorporation,
          ifsc_code, bank_account_number, bank
        } = res.data[0]
        console.log(name);
        let firstname = name;
        let lastname = last_name;
        const fullName = name?.split(" ");
        if (fullName?.length > 1 && last_name.length !== 0) {
          firstname = fullName[0];
          lastname = fullName[fullName.length - 1];
        }
        let formOneData = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          company_name: company_name,
          telephone: mobile_number,
          mobile_number: telephone,
        };

        let formTwoData = {
          address_1: company_address,
          address_2: company_address2,
          country:company_country,
          state: company_state,
          district: company_district,
          pincode: company_pincode,
          website: company_domain,
          partnership: company_incorporation,
          gst: company_gst,
          company_type: company_type,
          company_short_decp: company_short_desc,
          business_segment: company_business_segment,
        };
        //    setSelectedCountry()
        setSelectedState(company_state);
        setSelectedCity(company_district);

        let formThreeData = {
          ifsc: ifsc_code,
          account_number: bank_account_number,
          bank: bank,
        };
        form1.setFieldsValue({ ...formOneData });
        form2.setFieldsValue({ ...formTwoData });
        form3.setFieldsValue({ ...formThreeData });
      }
    });
  };
  const getBusinesSegment = () => {
    userStore.getBusinesSegment((res: any) => {
      if (res.status) {
        setBusinesSegment(res.data);
      }
    });
  };
  const getIncorporationType = () => {
    userStore.getIncorporationType((res: any) => {
      if (res.status) {
        setIncorporationType(res.data);
      }
    });
  };

  const handlebackClick = (idName: string) => {
    console.log(document.getElementById(idName));
    document.getElementById(idName)?.click();
  };

  const formfinalsubmit = () => {
    form3
      .validateFields()
      .then((values) => {
        const data = {
          first_name: form1.getFieldValue("firstname"),
          last_name: form1.getFieldValue("lastname"),
          country: form2.getFieldValue("country"),
          state: form2.getFieldValue("state"),
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
        //console.log(data);
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
  };

  const formtwosubmit = (status: number) => {
    form2
      .validateFields()
      .then((values) => {
        if (status == 3) {
          formfinalsubmit()
        } else {
          document.getElementById("v-pills-messages-tab2")?.click();
        }
      })
      .catch((errorinfo) => {
        console.log(errorinfo);
        if (status == 3) {
          document.getElementById("v-pills-profile-tab1")?.click();
        }
      });
  };

  const CompleteSignupSession = (status: number) => {
    console.log("status isss", status);
    if (status == 1 || status == 3) {
      form1
        .validateFields()
        .then((values) => {
          if (status == 3) {
            alert("hello");
            formtwosubmit(status);
          } else {
            document.getElementById("v-pills-profile-tab1")?.click();
          }
        })
        .catch((errorinfo) => {
          console.log(errorinfo);
          if (status == 3) {
            document.getElementById("v-pills-home-tab")?.click();
          }
        });
    } else if (status == 2 || status == 3) {
      formtwosubmit(status);
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
                  className="nav flex-row nav-pills nav-pills-custom"
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
                                      readOnly
                                      maxLength={70}
                                      placeholder={
                                        localStorage.getItem("userEmail") || ""
                                      }
                                      className="form-control"
                                      value={
                                        localStorage.getItem("userEmail") || ""
                                      }
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
                                {/* <div className="form-group col-md-6">
                                  <label>Login Password</label>
                                  <Form.Item name="login_password">
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Login Password"
                                      className="form-control"
                                      type="password"
                                    />
                                  </Form.Item>
                                </div> */}
                                {/* <div className="form-group col-md-6">
                                  <label>Confirm Password</label>
                                  <Form.Item name="confirm_password">
                                    <Input
                                      maxLength={70}
                                      placeholder="Enter Confirm Password"
                                      className="form-control"
                                      type="password"
                                    />
                                  </Form.Item>
                                </div> */}
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
                            className="btn btn-primary"
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
                                      placeholder="House number and street name"
                                      className="form-control"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-md-6 select-custom">
                                  <label>
                                    Country{" "}
                                    <abbr className="required" title="required">
                                      *
                                    </abbr>
                                  </label>
                                  <Form.Item
                                    name="country"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select your country",
                                      },
                                    ]}
                                  >
                                    <select
                                      className="form-control"
                                      value={selectedCountry}
                                      onChange={(event) =>
                                        setSelectedCountry(event.target.value)
                                      }
                                    >
                                      {countries.map(({ isoCode, name }) => (
                                        <option value={isoCode} key={isoCode}>
                                          {name}
                                        </option>
                                      ))}
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
                                    <select
                                      className="form-control"
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
                                    <select
                                      className="form-control"
                                      value={selectedCity}
                                      onChange={(event) =>
                                        setSelectedCity(event.target.value)
                                      }
                                    >
                                      {cities.length > 0 ? (
                                        cities.map(({ name }) => (
                                          <option value={name} key={name}>
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
                                      {incorporationType.length > 0 ? (
                                        incorporationType.map((item: any) => {
                                          return (
                                            <option
                                              value={item.incorporation_types}
                                              key=""
                                            >
                                              {item.incorporation_types}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option value="0" key="">
                                          No Incorporation Type found
                                        </option>
                                      )}
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

                                {/* <div className="col-md-6 select-custom">
                                  <label>
                                    Area of expertise
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
                                      {comapnyType.length > 0 ? (
                                        comapnyType.map((item: any) => {
                                          return (
                                            <option
                                              value={item.typeof_companies}
                                              key=""
                                            >
                                              {item.typeof_companies}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option value="0" key="">
                                          No Area of expertise found
                                        </option>
                                      )}
                                    </select>
                                  </Form.Item>
                                </div> */}

                                <div className="col-md-6 form-group">
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
                                    <Input
                                      maxLength={70}
                                      className="form-control"
                                    />
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
                                      {businesSegment.length > 0 ? (
                                        businesSegment.map((item: any) => {
                                          return (
                                            <option
                                              value={item.business_segments}
                                              key=""
                                            >
                                              {item.business_segments}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option value="0" key="">
                                          No Business Segment found
                                        </option>
                                      )}
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
                            className="btn btn-primary"
                            onClick={() => {
                              handlebackClick("v-pills-home-tab");
                            }}
                          >
                            Back
                          </button>
                          <Button
                            className="btn btn-primary ml-4"
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

                                <div className="col-md-6 form-group">
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
                                    <Input
                                      maxLength={70}
                                      className="form-control"
                                    />
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
                            className="btn btn-primary"
                            onClick={() => {
                              handlebackClick("v-pills-profile-tab1");
                            }}
                          >
                            Back
                          </button>
                          <Button
                            className="btn btn-primary ml-4"
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
                      <p hidden={status}>User profile updated successfully</p>
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

export default EditProfileComponent;
