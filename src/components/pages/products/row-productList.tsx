import React from "react";
import { useNavigate } from "react-router-dom";
import RoutePath from "../../global/route-paths";

const RowProductList: React.FC<any> = (props: any) => {
  const navigate = useNavigate();
  const { item, handleClick } = props;
  console.log("props is ", props);
  return (
    <div className="col-12 mx-auto product-row">
      <div className="pcol product-img">
        <div className="product-default mb-0 shadow-none border-0">
          <figure>
            {" "}
            <a
              onClick={() => navigate(`${RoutePath.product}/${item.productId}`)}
            >
              {" "}
              <img
                className="img-fluid"
                src={
                  item?.images
                    ? item?.images[0]?.image
                    : "/assets/images/products/product-1.jpg"
                }
                width={100}
                height={100}
                alt="product"
              />{" "}
              <img
                className="ing-fluid"
                src={
                  item?.images
                    ? item?.images[0]?.image
                    : "/assets/images/products/product-1.jpg"
                }
                width={100}
                height={100}
                alt="product"
              />{" "}
            </a>
            {/* <div className="label-group">
                    <div className="product-label label-hot">HOT</div>
                    <div className="product-label label-sale">-20%</div>
                  </div> */}
          </figure>
        </div>
      </div>
      <div className="pcol product-cat">
        {" "}
        <a href="#" className="product-category">
          {item?.category}
        </a>{" "}
      </div>
      <div className="pcol product-name">
        {" "}
        <a href="# ">{item.productName}</a>{" "}
      </div>
      <div className="pcol product-brand">{item?.brand}</div>
      <div className="pcol product-sku">{item?.sku}</div>
      <div className="pcol product-price">
        {" "}
        {item.mrp <= item.salePrice ? (
          ""
        ) : (
          <del className="old-price">₹{item.mrp}</del>
        )}
        <span className="product-price">₹{item.salePrice}</span>{" "}
      </div>
      <div className="pcol product-action">
        <a
          className="btn-quickview d-block"
          onClick={(e) => handleClick(item.productId, item.salePrice)}
          title="Quick View"
        >
          <i className="fas fa-eye"></i>
        </a>
      </div>
    </div>
  );
};

export default RowProductList;
