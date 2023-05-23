import React from "react";
import { useNavigate } from "react-router-dom";
import RoutePath from "../../global/route-paths";

const GridProductList: React.FC<any> = (props: any) => {
  const navigate = useNavigate();
  const { item, handleClick } = props;
  return (
    <div className="col-6 col-sm-4">
      <div className="product-default">
        <figure>
          {" "}
          <a onClick={() => navigate(`${RoutePath.product}/${item.productId}`)}>
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
          {/* <div className="label-group">
            <div className="product-label label-hot">HOT</div>
            <div className="product-label label-sale">-20%</div>
          </div> */}
        </figure>
        <div className="product-details">
          <div className="category-wrap">
            <div className="category-list">
              {" "}
              <a href="#" className="product-category">
                {item?.category}
              </a>{" "}
            </div>
          </div>
          <h3 className="product-title">
            {" "}
            <a href="# ">{item.productName}</a>{" "}
          </h3>
          {/* <div className="ratings-container">
            <div className="product-ratings">
              {" "}
              <span className="ratings" style={{ width: "100%" }} /> */}
              {/* End .ratings */}
              {/* <span className="tooltiptext tooltip-top" />
            </div> */}
            {/* End .product-ratings */}
          {/* </div> */}
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
            <a href="#" className="btn-icon btn-add-cart">
              <i className="fas fa-shopping-cart"></i>
              <span>Details</span>
            </a>
            <a
              className="btn-quickview"
              onClick={(e) => handleClick(item.productId, item.salePrice)}
              title="Quick View"
            >
              <i className="fas fa-eye"></i>
            </a>
          </div>
        </div>
        {/* End .product-details */}
      </div>
    </div>
  );
};

export default GridProductList;
