import React from 'react'

const  RfqDetailModal = (props:any) => {
    const {showModal,handleClose,rfqData}=props;
  return (
    <div
              className="product-slide quick-view-popup w-100 Shadows p-4 alert"
              style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.6)" }}
              hidden={showModal}
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
                          {rfqData?.product_name}
                        </span>
                      </div>
                      <div>
                        <p>{rfqData?.note}</p>
                      </div>
                      <ul className="single-info-list">
                        <li>
                          Brand :{" "}
                          <strong>
                            <a href="#" className="product-category">
                              {rfqData?.brand}
                            </a>
                          </strong>
                        </li>
                        <li>
                          Quantity :{" "}
                          <strong>
                            <a href="#" className="product-category">
                              {rfqData?.quantity}
                            </a>
                          </strong>
                        </li>
                        <li>
                          CATEGORY:{" "}
                          <strong>
                            <a href="#" className="product-category">
                              {rfqData?.category}
                            </a>
                          </strong>
                        </li>
                        <li>
                          Buyer Name:{" "}
                          <strong>
                            <a href="#" className="product-category">
                              {rfqData?.name}
                            </a>
                          </strong>
                        </li>
                        <li>
                          Buyer location :{" "}
                          <strong>
                            <a href="#" className="product-category">
                              {rfqData?.buyer_state
                                ? rfqData?.buyer_state
                                : ""}
                            </a>
                          </strong>
                          ,
                          <strong>
                            <a href="#" className="product-category">
                              {rfqData?.buyer_district
                                ? rfqData?.buyer_district
                                : ""}
                            </a>
                          </strong>
                          ,
                          <strong>
                            <a href="#" className="product-category">
                              {rfqData?.buyer_pincode
                                ? rfqData?.buyer_pincode
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
  )
}

export default RfqDetailModal