import React, { useState, useEffect } from "react";
import productStore from "../../store/product-store";
import RoutePath from "../../global/route-paths";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import userStore from "../../store/user-store";
import swal from "sweetalert";
type AuctionProps = {};

const AuctionDetailComponent: React.FC<any> = (props: AuctionProps) => {
  const navigate = useNavigate();
  const [CartQty, setCartQty] = useState();
  const [ProductsData, setProductsData] = useState([]);
  const [isaddtosucc, setisaddtosucc] = useState(true);
  const [ProductName, setProductName] = useState("Product");
  const urlParams = useParams();
  const { id } = useParams();
  const product = String(id)
  const addtoCart = () => {
    let qty: any = document.getElementById("cartqty");
    qty = qty.value;
    const data = {
      userId: parseInt(localStorage.getItem("userId")!),
      cartType: 1,
      cartItems: [
        {
          productId: parseInt(product),
          qty: parseInt(qty),
          productPrice: parseInt(ProductsData[0]?.["salePrice"]),
        },
      ],
    };
    productStore.addtocart(data, (res: any) => {
      if (res.status) {
        setisaddtosucc(false);
      }
    });
  };

  const getProductDetails = () => {
    productStore.getAuctionDetails(product, (res: any) => {
      if (res?.status) {
        setProductsData(res?.data);
        setProductName(res?.data[0]?.productName);
      } else {
        navigate(RoutePath.home);
      }
    });
  };

  const removeCart = () => {
    userStore.removeCart((res: any) => {});
  };

  const getUserCart = (e:any) => {
    userStore.getUserCart((res: any) => {
      console.log(res);
      if (res.status) {
        if (res?.data?.length > 0) {
          swal({
            title: "Are you sure?",
            text: "You have items from another seller added to the cart. Do you want to clear the cart and add this item?",
            icon: "warning",
            buttons: ["No, cancel it!", "Yes, I am sure!"],
            dangerMode: true,
          }).then(function (isConfirm) {
            if (isConfirm) {
              removeCart();
              addtoCart();
              
              e.target.classList.add("added-to-cart");
              swal({
                title: "Added to cart",
                text: "Product added to cart successfully!",
                icon: "success",
              }).then(function () {
                // form.submit(); // <--- submit form programmatically
              });
            } else {
              // swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
        }
      } else {
        addtoCart();
      }
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/assets/js/main.min.js";
    document.body.append(script);
    getProductDetails();
  }, [product]);
  return (
    <>
      <main className="main">
  <div className="container">
    <div className="container">
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="demo4.html">
              <i className="icon-home" />
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Products</a>
          </li>
        </ol>
      </nav>
      <div className="product-single-container product-single-default">
        <div className="cart-message d-none">
          <strong className="single-cart-notice">
            “Men Black Sports Shoes”
          </strong>
          <span>has been added to your cart.</span>
        </div>
        <div className="row">
          <div className="col-lg-5 col-md-6 product-single-gallery">
            <div className="product-slider-container">
              <div className="label-group">
                <div className="product-label label-hot">HOT</div>
                <div className="product-label label-sale">-16%</div>
              </div>
              <div className="product-single-carousel owl-carousel owl-theme show-nav-hover">
                <div className="product-item">
                  <img
                    className="product-single-image"
                    src="/assets/images/products/product-1.jpg"
                    data-zoom-image="/assets/images/products/zoom/product-1-big.jpg"
                    width={468}
                    height={468}
                    alt="product"
                  />
                </div>
                <div className="product-item">
                  <img
                    className="product-single-image"
                    src="/assets/images/products/product-1.jpg"
                    data-zoom-image="/assets/images/products/zoom/product-2-big.jpg"
                    width={468}
                    height={468}
                    alt="product"
                  />
                </div>
                <div className="product-item">
                  <img
                    className="product-single-image"
                    src="/assets/images/products/product-1.jpg"
                    data-zoom-image="/assets/images/products/zoom/product-3-big.jpg"
                    width={468}
                    height={468}
                    alt="product"
                  />
                </div>
                <div className="product-item">
                  <img
                    className="product-single-image"
                    src="/assets/images/products/product-1.jpg"
                    data-zoom-image="/assets/images/products/zoom/product-4-big.jpg"
                    width={468}
                    height={468}
                    alt="product"
                  />
                </div>
                <div className="product-item">
                  <img
                    className="product-single-image"
                    src="/assets/images/products/product-1.jpg"
                    data-zoom-image="/assets/images/products/zoom/product-5-big.jpg"
                    width={468}
                    height={468}
                    alt="product"
                  />
                </div>
              </div>
              {/* End .product-single-carousel */}
            </div>
            <div className="prod-thumbnail owl-dots">
              <div className="owl-dot">
                <img
                  src="/assets/images/products/product-2.jpg"
                  width={110}
                  height={110}
                  alt="product-thumbnail"
                />
              </div>
              <div className="owl-dot">
                <img
                  src="/assets/images/products/product-2.jpg"
                  width={110}
                  height={110}
                  alt="product-thumbnail"
                />
              </div>
              <div className="owl-dot">
                <img
                  src="/assets/images/products/product-2.jpg"
                  width={110}
                  height={110}
                  alt="product-thumbnail"
                />
              </div>
              <div className="owl-dot">
                <img
                  src="/assets/images/products/product-2.jpg"
                  width={110}
                  height={110}
                  alt="product-thumbnail"
                />
              </div>
              <div className="owl-dot">
                <img
                  src="/assets/images/products/product-2.jpg"
                  width={110}
                  height={110}
                  alt="product-thumbnail"
                />
              </div>
            </div>
          </div>
          {/* End .product-single-gallery */}
          <div className="col-lg-7 col-md-6 product-single-details">
            <h1 className="product-title">{ProductsData[0]?.["title"]}</h1>
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
                        style={{ paddingTop: 0 }}
                      />
                      <span>Circled Ultimate 3D Speaker</span>
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
                        src="/assets/images/products/product-1.jpg"
                        style={{ paddingTop: 0 }}
                      />
                      <span>Blue Backpack for the Young</span>
                    </span>
                  </span>
                </a>
              </div>
            </div>
            {/* End .ratings-container */}
            <hr className="short-divider" />
            <table>
              <tbody>
                <tr>
                  <th />
                </tr>
              </tbody>
            </table>
            {/* End .price-box */}
            <div className="row">
              <div className="col">
                <ul className="single-info-list">
                  <li>ITEM #</li>
                  <li>VIN/SERIAL #</li>
                  <li>LOCATION</li>
                  <li>AUCTION DATE</li>
                  <li>TIME</li>
                </ul>
              </div>
              <div className="col">
                <ul className="single-info-list">
                  <li>1047</li>
                  <li>0122-165-0001</li>
                  <li>India</li>
                  <li>Thursday, May 12 2022</li>
                  <li>9:00 PM</li>
                </ul>
              </div>
            </div>
            <div className="row price">
              <div className="col cart">
                <h3 className="rupee"> IND {ProductsData[0]?.["price"]}</h3>
              </div>
              <div className="col cart">
                <i className="fa fa-eye" />
                <i className="fa fa-plus" />
              </div>
            </div>
            <div className="row m-3">
              <div className="col offer">
                <form className="offer">
                  <input
                    className="w-100"
                    type="text"
                    placeholder="IND ₹ Your Offer"
                  />
                </form>
              </div>
              <div className="col">
                <button type="button" className="btn btn-primary submit">
                  submit
                </button>
              </div>
            </div>
            <hr className="divider mb-0 mt-0" />
            <div className="mt-3">
              <h3>Description</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sapiente repellendus voluptatum debitis sint harum corrupti.{" "}
              </p>
            </div>
          </div>
          {/* End .product single-share */}
        </div>
        {/* End .product-single-details */}
      </div>
      {/* End .row */}
    </div>
  </div>
</main>

    </>
  );
};

export default AuctionDetailComponent;
