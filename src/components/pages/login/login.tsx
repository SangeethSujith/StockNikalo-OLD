import React from "react";
import { Form, Button, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import authStore from "../../store/auth-store";
import RoutePath from "../../global/route-paths";
type LoginProps = {};

const LoginComponent: React.FC<any> = (props: LoginProps) => {
  const { useForm } = Form;
  const [form] = useForm();
  const navigate = useNavigate();
  const LoginSession = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          email: values.email,
          password: values.password,
        };

        authStore.login(data.email, data.password, (res: any) => {
          if (res) {
            form.resetFields();
            navigate(RoutePath.home);
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
                <div className="col-md-4 mt-10">
                  <div className="heading mb-1">
                    <h2 className="title">Log in</h2>
                  </div>
                  <Form
                    id="LoginForm"
                    form={form}
                    key="LoginForm"
                    preserve={false}
                  >
                    <label htmlFor="login-email">
                      Username or email address
                      <span className="required">*</span>
                    </label>

                    <Form.Item
                      className=""
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
                      <Input maxLength={70} className="form-input form-wide" />
                    </Form.Item>
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
                      <Input maxLength={70} className="form-input form-wide" />
                    </Form.Item>
                    <div className="form-footer mb-3">
                      <div className="custom-control custom-checkbox ">
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
                        className="forget-password text-dark form-footer-right"
                      >
                        Forgot Password?
                      </a>
                    </div>

                    <Button
                      className="btn btn-dark btn-md w-100"
                      form="LoginForm"
                      key="submit"
                      htmlType="submit"
                      //onClick={saveSession}
                      onClick={() => {
                        LoginSession();
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

export default LoginComponent;
