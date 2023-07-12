import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RoutePath from '../../global/route-paths';
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProdctDetailModal =(props:any) =>{
    const navigate = useNavigate();
    const [productQuantity, setproductQantity] = useState<number>(1);
    const {showModal,handleClose,productData,getUserCart} = props;
  return (
    <div
    className="product-slide w-100 Shadows p-4 alert"
    style={{
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.6)",
    }}
    hidden={showModal}
  >
    <button
      onClick={()=>{handleClose()
      setproductQantity(1)
    }}
      type="button"
      className="close"
    >
      <span aria-hidden="true">×</span>
    </button>
    <div className="quick-view-inner">
      <div className="row pt-4">
        <div className="col-sm-8">
          <ul
            className="nav nav-tabs"
            role="tablist"
          >
            <div className="container w-100">
              <div className="row">
                {productData[0]?.images
                  ?.filter(
                    (
                      item: any,
                      index: number
                    ) => index < 4
                  )
                  .map((item: any) => (
                    <div className="col-sm-3">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="product-tab-desc"
                          data-toggle="tab"
                          href="#product-desc-content"
                          role="tab"
                          aria-controls="product-desc-content"
                          aria-selected="true"
                        >
                          <LazyLoadImage
                            src={item.image}
                            effect="blur"
                            alt="product-img"
                            width={80}
                            height={80}
                          />
                        </a>
                      </li>
                    </div>
                  ))}
              </div>
            </div>
          </ul>
        </div>
        <div className="col-sm-12">
          <div className="col-lg-7 col-md-6 product-single-details">
            <h4 className="product-title">
              {productData[0]?.productName}
            </h4>
            <p>{productData[0]?.description}</p>

            <div className="product-nav">
              <div className="product-prev">
                <a href="#">
                  <span className="product-link" />
                  <span className="product-popup">
                    <span className="box-content">
                      <img
                        alt="product"
                        width={150}
                        height={150}
                        src="/assets/images/products/product-1.jpg"
                        style={{
                          paddingTop: 0,
                        }}
                      />
                      <span>
                        Circled Ultimate 3D
                        Speaker
                      </span>
                    </span>
                  </span>
                </a>
              </div>
              <div className="product-next">
                <a href="#">
                  <span className="product-link" />
                  <span className="product-popup">
                    <span className="box-content">
                      <img
                        alt="product"
                        width={150}
                        height={150}
                        src="/assets/images/products/product-2.jpg"
                        style={{
                          paddingTop: 0,
                        }}
                      />
                      <span>
                        Blue Backpack for the
                        Young
                      </span>
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <hr className="short-divider" />
            <div className="price-box">
              <span className="old-price">
                ₹{productData[0]?.mrp}
              </span>
              <span className="new-price">
                ₹{productData[0]?.salePrice}
              </span>
            </div>
            <ul className="single-info-list">
              <li>
                SKU:{" "}
                <strong>
                  {productData[0]?.sku}
                </strong>
              </li>
              <li>
                CATEGORY:{" "}
                <strong>
                  <a
                    href="#"
                    className="product-category"
                  >
                    {productData[0]?.category}
                  </a>
                </strong>
              </li>
              <li>
                TAGs:{" "}
                <strong>
                  <a
                    href="#"
                    className="product-category"
                  >
                    CLOTHES
                  </a>
                </strong>
                ,
                <strong>
                  <a
                    href="#"
                    className="product-category"
                  >
                    SWEATER
                  </a>
                </strong>
              </li>
              <li>
                Seller location :{" "}
                <strong>
                  <a
                    href="#"
                    className="product-category"
                  >
                    {productData[0]?.seller_state}
                  </a>
                </strong>
                ,
                <strong>
                  <a
                    href="#"
                    className="product-category"
                  >
                    {
                      productData[0]
                        ?.seller_district
                    }
                  </a>
                </strong>
                ,
                <strong>
                  <a
                    href="#"
                    className="product-category"
                  >
                    {
                      productData[0]
                        ?.seller_pincode
                    }
                  </a>
                </strong>
              </li>
            </ul>
            {productData[0]?.created_by !=
              localStorage.getItem(
                "userId"
              ) && (
              <div className="product-action">
                <div className="product-single-qty">
                  <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                    <span className="input-group-btn input-group-prepend">
                      <button
                        className="btn btn-outline btn-down-icon bootstrap-touchspin-down bootstrap-touchspin-injected"
                        type="button"
                        onClick={() =>
                          setproductQantity(
                            productQuantity - 1
                          )
                        }
                      />
                    </span>
                    <input
                      id="cartqty"
                      value={productQuantity}
                      className="horizontal-quantity form-control"
                      type="text"
                    />
                    <span className="input-group-btn input-group-append">
                      <button
                        className="btn btn-outline btn-up-icon bootstrap-touchspin-up bootstrap-touchspin-injected"
                        type="button"
                        onClick={() =>
                          setproductQantity(
                            productQuantity + 1
                          )
                        }
                      />
                    </span>
                  </div>
                </div>
                {/* End .product-single-qty */}
                <a
                  onClick={(e) => {
                    if (
                      localStorage.getItem(
                        "userId"
                      ) == "null"
                    ) {
                      navigate(RoutePath.login);
                    } else if (
                      localStorage.getItem(
                        "userCmpReg"
                      ) == "0"
                    ) {
                      navigate(
                        RoutePath.complete_profile
                      );
                    } else {
                      getUserCart(e);
                    }
                  }}
                  className="btn btn-primary add-cart mr-2"
                  title="Add to Cart"
                >
                  Add to Cart
                </a>
                <a
                  href="cart.html"
                  className="btn btn-gray view-cart d-none"
                >
                  View cart
                </a>
              </div>
            )}
            <hr className="divider mb-0 mt-0" />
            <div className="product-single-share mb-3">
              <label className="sr-only">
                Share:
              </label>
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

export default ProdctDetailModal