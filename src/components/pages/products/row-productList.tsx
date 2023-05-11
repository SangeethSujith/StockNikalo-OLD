import React from "react";
import { useNavigate } from "react-router-dom";
import RoutePath from "../../global/route-paths";

const RowProductList: React.FC<any> = (props: any) => {
  const navigate = useNavigate();
  const { item, handleClick } = props;
  return (
    <div className="col-lg-12 mx-auto">
      <ul className="list-group shadow">
        <li className="list-group-item table-view">
          <div className="media align-items-lg-center flex-column flex-lg-row p-3">
            <div className="media-body order-2 order-lg-1 col-lg-10 product-default text-center shadow-none border-0">
              <div className="product-details">
                <div className="category-wrap">
                  <div className="category-list">
                    {" "}
                    <a href="#" className="product-category">
                      category
                    </a>{" "}
                  </div>
                </div>

                <h3 className="product-title">
                  {" "}
                  <a href="# ">{item.productName}</a>{" "}
                </h3>

                <div className="ratings-container">
                  <div className="product-ratings">
                    {" "}
                    <span className="ratings" style={{ width: "100%" }} />
                    {/* End .ratings */}
                    <span className="tooltiptext tooltip-top" />
                  </div>
                  {/* End .product-ratings */}
                </div>

                {/* End .product-container */}
                <div className="price-box">
                  {" "}
                  {item.mrp <= item.salePrice ? (
                    ""
                  ) : (
                    <del className="old-price">₹{item.mrp}</del>
                  )}
                  <span className="product-price">₹{item.salePrice}</span>{" "}
                </div>

                {/* End .price-box */}
                <div className="product-action">
                  {/* <a
                                                href="#"
                                                className="btn-icon-wish"
                                                title="wishlist"
                                            >
                                                <i className="icon-heart" />
                                            </a>{" "} */}
                  {/* <a href="#" className="btn-icon btn-add-cart">
                    <i className="fa fa-arrow-right" />
                    <span>SELECT OPTIONS</span>
                  </a> */}
                  <a
                    className="btn-quickview d-block"
                    onClick={(e) => handleClick(item.productId, item.salePrice)}
                    title="Quick View"
                  >
                    <i className="fas fa-eye"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="product-default shadow-none border-0">
                <figure>
                  {" "}
                  <a
                    onClick={() =>
                      navigate(`${RoutePath.product}/${item.productId}`)
                    }
                  >
                    {" "}
                    <img
                      src={
                        item?.images
                          ? item?.images[0]?.image
                          : "/assets/images/products/product-1.jpg"
                      }
                      width={280}
                      height={280}
                      alt="product"
                    />{" "}
                    <img
                      src={
                        item?.images
                          ? item?.images[0]?.image
                          : "/assets/images/products/product-1.jpg"
                      }
                      width={280}
                      height={280}
                      alt="product"
                    />{" "}
                  </a>
                  <div className="label-group">
                    <div className="product-label label-hot">HOT</div>
                    <div className="product-label label-sale">-20%</div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RowProductList;
