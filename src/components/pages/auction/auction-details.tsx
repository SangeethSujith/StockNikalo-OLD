import React, { useState, useEffect } from "react";
import productStore from "../../store/product-store";
import RoutePath from "../../global/route-paths";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import userStore from "../../store/user-store";
import swal from "sweetalert";
import useScript from "../../hooks/useScript";
import AuctionSerive from "../../services/auction-service";
import { message } from "antd";
type AuctionProps = {};

const AuctionDetailComponent: React.FC<any> = (props: AuctionProps) => {
  const navigate = useNavigate();
  const [CartQty, setCartQty] = useState();
  const [ProductsData, setProductsData] = useState<any>([]);
  const [isaddtosucc, setisaddtosucc] = useState(true);
  const [ProductName, setProductName] = useState("Product");
  const urlParams = useParams();
  const { id } = useParams();
  const product = String(id);
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
        console.log("response",res.data);
        setProductName(res?.data[0]?.productName);
      } else {
        navigate(RoutePath.home);
      }
    });
  };

  const removeCart = () => {
    userStore.removeCart((res: any) => {});
  };

  const handleSubmit = () => {
    let price:any = document.getElementById('bid-price');
    console.log("bid price",price.value);
    const date = new Date();
    let data :any = {
      userId : localStorage.getItem('userId'),
      auctionId : ProductsData[0]?.id,
      bidPrice : price.value ,
      bidDate : date
    }
    console.log("data iaaa",data)

    AuctionSerive.submitAuction(data).then((res:any)=>{
      console.log("auction response",res);
      if(res.data){
        message.success("successfull")
      }
    }).catch((error)=>{console.log("eror iss",error)});

  }

  useScript("/assets/js/main.min.js","")
  
  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "/assets/js/main.min.js";
    // document.body.append(script);
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
                          src="/assets/images/img1.png"
                          data-zoom-image="/assets/images/products/zoom/product-1-big.jpg"
                          width={300}
                          height={300}
                          alt="product"
                        />
                      </div>
                      <div className="product-item">
                        <img
                          className="product-single-image"
                          src="/assets/images/img1.png"
                          data-zoom-image="/assets/images/products/zoom/product-2-big.jpg"
                          width={300}
                          height={300}
                          alt="product"
                        />
                      </div>
                      <div className="product-item">
                        <img
                          className="product-single-image"
                          src="/assets/images/img1.png"
                          data-zoom-image="/assets/images/products/zoom/product-3-big.jpg"
                          width={300}
                          height={300}
                          alt="product"
                        />
                      </div>
                      <div className="product-item">
                        <img
                          className="product-single-image"
                          src="/assets/images/img1.png"
                          data-zoom-image="/assets/images/products/zoom/product-4-big.jpg"
                          width={300}
                          height={300}
                          alt="product"
                        />
                      </div>
                      <div className="product-item">
                        <img
                          className="product-single-image"
                          src="/assets/images/img1.png"
                          data-zoom-image="/assets/images/products/zoom/product-5-big.jpg"
                          width={300}
                          height={300}
                          alt="product"
                        />
                      </div>
                    </div>
                    {/* End .product-single-carousel */}
                  </div>
                  <div className="prod-thumbnail owl-dots">
                    <div className="owl-dot">
                      <img
                        src="/assets/images/img1.png"
                        width={110}
                        height={110}
                        alt="product-thumbnail"
                      />
                    </div>
                    <div className="owl-dot">
                      <img
                        src="/assets/images/img1.png"
                        width={110}
                        height={110}
                        alt="product-thumbnail"
                      />
                    </div>
                    <div className="owl-dot">
                      <img
                        src="/assets/images/img1.png"
                        width={110}
                        height={110}
                        alt="product-thumbnail"
                      />
                    </div>
                    <div className="owl-dot">
                      <img
                        src="/assets/images/img1.png"
                        width={110}
                        height={110}
                        alt="product-thumbnail"
                      />
                    </div>
                    <div className="owl-dot">
                      <img
                        src="/assets/images/img1.png"
                        width={110}
                        height={110}
                        alt="product-thumbnail"
                      />
                    </div>
                  </div>
                </div>
                {/* End .product-single-gallery */}
                <div className="col-lg-7 col-md-6 product-single-details">
                  <h1 className="product-title">
                    {ProductsData[0]?.["title"]}
                  </h1>
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
                        <li>manufacturer</li>
                        <li>model_no</li>
                        <li>capacity</li>
                        <li>weight</li>
                        <li>make_year</li>
                      </ul>
                    </div>
                    <div className="col">
                      <ul className="single-info-list">
                        <li>{ProductsData[0]?.["manufacturer"]}</li>
                        <li>{ProductsData[0]?.["model_no"]}</li>
                        <li>{ProductsData[0]?.["capacity"]}</li>
                        <li>{ProductsData[0]?.["weight"]}</li>
                        <li>{ProductsData[0]?.["make_year"]}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="row price">
                    <div className="col cart">
                      <h3 className="rupee">
                        {" "}
                        Asking Price INR {ProductsData[0]?.["price"]}
                      </h3>
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
                          id="bid-price"
                          type="text"
                          placeholder="INR ₹ Your Offer"
                        />
                      </form>
                    </div>
                    <div className="col">
                      <button type="button" className="btn btn-primary submit" onClick={handleSubmit}>
                        submit
                      </button>
                    </div>
                  </div>
                  <hr className="divider mb-0 mt-0" />
                  <div className="mt-3">
                    <h3>Description</h3>
                    <p>{ProductsData[0]?.["description"]}</p>
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
