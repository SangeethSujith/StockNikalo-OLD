import React from "react";

type LoginProps = {};

const LoginComponent: React.FC<any> = (props: LoginProps) => {
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
                  <form action="#">
                    <label htmlFor="login-email">
                      Username or email address
                      <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-input form-wide"
                      id="login-email"
                      required
                    />
                    <label htmlFor="login-password" className="mt-1">
                      Password
                      <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-input form-wide"
                      id="login-password"
                      required
                    />
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
                    <button type="submit" className="btn btn-dark btn-md w-100">
                      LOG IN
                    </button>
                  </form>
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
