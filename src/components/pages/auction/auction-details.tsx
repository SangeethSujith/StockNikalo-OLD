import React, { useState, useEffect } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import productStore from "../../store/product-store";
import RoutePath from "../../global/route-paths";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import useScript from "../../hooks/useScript";
import AuctionSerive from "../../services/auction-service";
import { Button, Tooltip, message } from "antd";
import authStore from "../../store/auth-store";
import { observer } from "mobx-react-lite";
import { error } from "console";
type AuctionProps = {};

const AuctionDetailComponent: React.FC<any> = (props: AuctionProps) => {
  const navigate = useNavigate();
  const [ProductsData, setProductsData] = useState<any>([]);
  const [initialBidPrice,setInitialBidPrice]=useState(0);
  const [isSubmitted,setIsSubmitted]=useState<boolean>(false);
  //const initialBidPrice = 15000;
  const [bidPrice, setBidPrice] = useState(0);
  const { id } = useParams();
  const product = String(id);
  
  useEffect(() => {
    getAuctionDetails();
    getAuctionByUserId();
  }, [product]);


  const getAuctionDetails = () => {
    const userId = localStorage.getItem("userId");
    productStore.getAuctionDetails(product,userId, (res: any) => {
      if (res?.status) {
        console.log("auction data",res.data);
        setProductsData(res?.data);
        setBidPrice(parseInt(res?.data[0]?.["bidPrice"]));
        setInitialBidPrice(parseInt(res?.data[0]?.["price"]));
        if(res?.data[0]?.["submited"]!=0){
          setIsSubmitted(true);
        }
      } else {
        navigate(RoutePath.home);
      }
    });
  };

  const getAuctionByUserId = () =>{
    const userId = localStorage.getItem("userId");
    if(userId){
      AuctionSerive.getAuctionById(userId).then((res:any)=>{
       if(res.data){
        updateBidStatus(res.data);
       }
      }).catch((error)=>{
        console.log("eror iss", error);
      });
    }
  }
 const updateBidStatus = (data:any)=>{
  if(data){
    let auction = data?.find((item:any)=>item.id == product);
    console.log("auction",auction);
    if(auction.submited == 1){
      setIsSubmitted(true);
    }
   }
}

  const updateAuction = ()=>{
    let price: any = document.getElementById("bid-price");
    let data: any = {
      userId: localStorage.getItem("userId"),
      bidPrice: price.value,
    };
    if(data){
      AuctionSerive.updateAuction(data,ProductsData[0]?.id)
      .then((res: any) => {
        if (res.data) {
          message.success("successfull");
        }
      })
      .catch((error) => {
        console.log("eror iss", error);
      });
    }
  }


  const handleSubmit = () => {
    let price: any = document.getElementById("bid-price");
    const date = new Date();
    let data: any = {
      userId: localStorage.getItem("userId"),
      auctionId: ProductsData[0]?.id,
      bidPrice: price.value,
      bidDate: date,
    };

    if (authStore.isRegistrationCompleted) {
      AuctionSerive.submitAuction(data)
        .then((res: any) => {
          if (res.data) {
            getAuctionDetails();
            message.success("successfull");
          }
        })
        .catch((error) => {
          console.log("eror iss", error);
        });
    } else {
      swal({
        //title: "Are you sure?",
        text: "Please complete your registration to proceed this action",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  useScript("/assets/js/main.min.js", "");

  console.log("bid price",initialBidPrice,bidPrice);
  return (
    <>
      <main className="main">
        <div className="container">
          <div className="container">
            {/* <nav aria-label="breadcrumb" className="breadcrumb-nav">
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
            </nav> */}
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
                    {/* <div className="label-group">
                      <div className="product-label label-hot">HOT</div>
                      <div className="product-label label-sale">-16%</div>
                    </div> */}
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
                        <li>model no</li>
                        <li>capacity</li>
                        <li>weight</li>
                        <li>make year</li>
                        <li>seller state</li>
                        <li>seller pincode</li>
                      </ul>
                    </div>
                    <div className="col">
                      <ul className="single-info-list">
                        <li>{ProductsData[0]?.["manufacturer"]}</li>
                        <li>{ProductsData[0]?.["model_no"]}</li>
                        <li>{ProductsData[0]?.["capacity"]}</li>
                        <li>{ProductsData[0]?.["weight"]}</li>
                        <li>{ProductsData[0]?.["make_year"]}</li>
                        <li>{ProductsData[0]?.["sellecr_state"]}</li>
                        <li>{ProductsData[0]?.["seller_pincode"]}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="row price">
                    <div className="col cart">
                      <h3 className="rupee">
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
                          disabled
                          className="w-100"
                          id="bid-price"
                          type="number"
                          value={bidPrice}
                          placeholder="INR ₹ Your Offer"
                        />
                      </form>
                    </div>
                    <Tooltip title="Reduce Bid P rice">
                      <Button
                        disabled={bidPrice <= initialBidPrice}
                        onClick={() =>
                          setBidPrice((prevBidPrice) =>
                            prevBidPrice > initialBidPrice
                              ? prevBidPrice - parseInt(ProductsData[0]?.["increment_amount"])
                              : prevBidPrice
                          )
                        }
                        // type="danger"
                        // shape="circle"
                        icon={<MinusOutlined />}
                      />
                    </Tooltip>
                    <Tooltip title="Increase Bid Price">
                      <Button
                        onClick={() =>
                          setBidPrice((prevBidPrice) => prevBidPrice + parseInt(ProductsData[0]?.["increment_amount"]))
                        }
                        // type="danger"
                        // shape="circle"
                        icon={<PlusOutlined />}
                      />
                    </Tooltip>
                    <div className="col">
                      {isSubmitted ?   <button
                        type="button"
                        className="btn btn-primary submit"
                        onClick={updateAuction}
                      >
                        update
                      </button>:<button
                        type="button"
                        className="btn btn-primary submit"
                        onClick={handleSubmit}
                      >
                        submit
                      </button>
                      }
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

export default observer(AuctionDetailComponent);
