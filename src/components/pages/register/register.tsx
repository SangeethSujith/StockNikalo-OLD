import React from "react";
import swal from "sweetalert";
import { Form, Button, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import RoutePath from "../../global/route-paths";
import userStore from "../../store/user-store";
import "./style.css";
type RegistrationProps = {};
const RegistrationComponent: React.FC<any> = (props: RegistrationProps) => {
  const { useForm } = Form;
  const [form] = useForm();
  const navigate = useNavigate();
  const SignupSession = () => {
    form
      .validateFields()
      .then((values) => {
        // handleModelVisible(false);
        const data = {
          name: values.username,
          email: values.email,
          password: values.password,
          c_password: values.confirmpassword,
          type: 1,
        };

        userStore.addRegistration(data, (res: any) => {
          if (res) {
            message.success("User registration completed successfully");
            form.resetFields();
            swal({
              //title: "Are you sure?",
              text: "User registration completed successfully",
              icon: "success",
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                navigate(RoutePath.login);
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
      <main className="main">
        {/* Demo header*/}
        <div className="container login-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row justify-content-center">
                <div className="col-md-4 mt-5">
                  <div className="heading mb-1">
                    <h2 className="title">Sign up</h2>
                  </div>
                  <Form
                    id="signupForm"
                    form={form}
                    key="signupForm"
                    preserve={false}
                  >
                    <div>
                      <label htmlFor="login-email">
                        Username
                        <span className="required">*</span>
                      </label>
                      <Form.Item
                        className="gm-margin-bottom-sm"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Enter your username",
                          },
                        ]}
                      >
                        <Input
                          maxLength={70}
                          className="form-input form-wide"
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <label htmlFor="login-email" className="mt-1">
                        Email address
                        <span className="required">*</span>
                      </label>
                      <Form.Item
                        className="gm-margin-bottom-sm"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Enter your Email",
                          },
                          {
                            type: "email",
                            message: "Enter your Email Address",
                          },
                        ]}
                      >
                        <Input
                          maxLength={70}
                          className="form-input form-wide"
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <label htmlFor="login-password" className="mt-1">
                        Password
                        <span className="required">*</span>
                      </label>
                      <Form.Item
                        name="password"
                        rules={[
                          { required: true, message: "Enter your Password" },
                        ]}
                      >
                        <Input
                          maxLength={70}
                          className="form-input form-wide"
                          type="password"
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <label htmlFor="login-password" className="mt-1">
                        Confirm Password
                        <span className="required">*</span>
                      </label>
                      <Form.Item
                        name="confirmpassword"
                        rules={[
                          { required: true, message: "Re-enter your password" },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                new Error("Password not matching")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input
                          maxLength={70}
                          className="form-input form-wide"
                          type="password"
                        />
                      </Form.Item>
                    </div>

                    <Button
                      className="btn btn-dark btn-md w-100 mt-4"
                      form="signupForm"
                      key="submit"
                      htmlType="submit"
                      //onClick={saveSession}
                      onClick={() => {
                        SignupSession();
                      }}
                    >
                      SIGN UP
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegistrationComponent;
