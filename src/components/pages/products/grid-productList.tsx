import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoutePath from "../../global/route-paths";
import cartService from "../../services/cart-service";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const GridProductList: React.FC<any> = (props: any) => {
  const navigate = useNavigate();
  const { item, handleClick } = props;
  const [wishList, setWishList] = useState<any>([]);
  useEffect(() => {
    getWishList();
  }, []);

  const getWishList = () => {
    cartService
      .getWishlist(localStorage.getItem("userId"))
      .then((response: any) => {
        if (response?.data) {
          setWishList(response?.data?.data);
        }
      });
  };

  const handleWishListClick = (id: number | string) => {
    if (wishListCheck(id)) {
      let wishlistId = wishList.find((item: any) => item.productId == id).id;
      cartService.removeWishlistItem(wishlistId).then((response: any) => {
        if (response?.data) {
          getWishList();
        }
      });
    } else {
      let wishlistdata = {
        userId: localStorage.getItem("userId"),
        productId: id,
      };
      cartService.addWishlist(wishlistdata).then((response: any) => {
        if (response?.data) {
          getWishList();
        }
      });
    }
  };

  const wishListCheck = (id: any) => {
    if (wishList?.length > 0) {
      return wishList?.some(
        (value: any) =>
          value.hasOwnProperty("productId") && value["productId"] == id
      );
    }
  };

  return (
    <div className="col-6 col-sm-3 grid-product">
      <div className="product-default">
        <div
          className={`wishlist-toggle ${
            wishListCheck(item?.productId) ? "active" : ""
          }`}
          onClick={() => handleWishListClick(item?.productId)}
        >
          <i className="fas fa-heart"></i>
        </div>
        <figure>
          <a onClick={() => navigate(`${RoutePath.product}/${item.productId}`)}>
            <LazyLoadImage
              effect="blur"
              alt="product-img"
              width={280}
              height={280}
              src={
                item?.images
                  ? item?.images[0]?.image
                  : "/assets/images/products/product-1.jpg"
              }
            />
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
          <ul className="single-info-list w-100">
            <li>
              SKU: <span>{item.sku}</span>
            </li>
            <li>
              Category:{" "}
              <span>
                <a href="#" className="product-category">
                  {item.category}
                </a>
              </span>
            </li>
            <li>
              Seller location :{" "}
              <span>
                <a href="#" className="product-category">
                  {item.seller_district}
                </a>
              </span>
            </li>
          </ul>
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
              {/* <i className="fas fa-caret-square-down"></i> */}
            </a>
          </div>
        </div>
        {/* End .product-details */}
      </div>
    </div>
  );
};

export default GridProductList;
