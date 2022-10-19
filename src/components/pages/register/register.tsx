import React from "react";

type RegistrationProps = {};

const RegistrationComponent: React.FC<any> = (props: RegistrationProps) => {
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
                  <form action="#">
                    <div>
                      <label htmlFor="login-email">
                        Username
                        <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-input form-wide"
                        id="login-email"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="login-email" className="mt-1">
                        Email address
                        <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-input form-wide"
                        id="login-email"
                        required
                      />
                    </div>
                    <div>
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
                    </div>
                    <div>
                      <label htmlFor="login-password" className="mt-1">
                        Confirm Password
                        <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-input form-wide"
                        id="login-password"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-dark btn-md w-100 mt-4"
                    >
                      SIGN UP
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

export default RegistrationComponent;
