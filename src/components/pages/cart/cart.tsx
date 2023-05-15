import React, { useEffect, useState } from "react";
import userStore from "../../store/user-store";
import { Routes, Route, useNavigate } from "react-router-dom";
import RoutePath from "../../global/route-paths";
import GoToTop from "../../gototop";
import useScript from "../../hooks/useScript";
import productStore from "../../store/product-store";
type CartProps = {};

const CartComponent: React.FC<any> = (props: CartProps) => {
  const navigate = useNavigate();
  const [CartQty, setCartQty] = useState<any>("");
  const [CartData, setCartData] = useState<any>([]);
  const [subTotal, setsubTotal] = useState(Number);
  const [ProductInv, setProductInv] = useState();
  useScript("/assets/js/main.min.js", "")

  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "/assets/js/main.min.js";
    // document.body.append(script);
    getUserCart();
  }, []);
  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "/assets/js/main.min.js";
    // document.body.append(script);
  }, [CartData]);

  const getUserCart = () => {
    userStore.getUserCart((res: any) => {
      console.log(res);
      if (res.status) {
        setCartData(res.data);
        incUserCart(res.data[0]?.["productId"]);
        var tot = 0;
        var price = 0;
        res?.data?.map(
          (item: any) => (
            (price = item.qty * item.productPrice), (tot = tot + price)
          )
        );
        setsubTotal(tot);
        setCartQty(res.data[0].qty);
      }
    });
  };

  const deleteCart = (id: any) => {
    userStore.deleteCart(id, (res: any) => {
      console.log(res);
      if (res.status) {
        setCartData([]);
      }
    });
  };

  const handleChange = () => {
    console.log(CartQty, "CartQty");
    console.log(typeof CartQty, "CartQty");
    let qty: any = document.getElementById("cartqty");
    qty = qty.value;
    console.log(qty, "qty");
    console.log(ProductInv, "ProductInv");

    if (parseInt(qty) > parseInt(ProductInv as any)) {
      console.log("hello");
      setCartQty("4");
      let qty: any = document.getElementById("cartqty");
      //qty.value(ProductInv);
      // setCartQty(qty);
    } else {
      // setCartQty(qty);
    }
  };
  const incUserCart = (prid: any) => {
    let qty: any = document.getElementById("cartqty");
    qty = qty.value;
    let id = {
      product_id: prid,
      qty: qty,
    };
    userStore.incUserCart(id, (res: any) => {
      if (res.status) {
        setProductInv(res.data);
      }
    });
  };

  // const inv = () => {
  //   let qty: any = document.getElementById("cartqty");
  //   qty = qty.value;
  //   console.log("uuu");
  //   if (qty > ProductInv) {
  //   }
  // };

  // const cartdecrement = document.querySelector(".bootstrap-touchspin-up");
  // cartdecrement?.addEventListener("click", (event) => {
  //   event.stopPropagation();
  //   inv();
  // });
  const addtoCart = () => {
    let qty: any = document.getElementById("cartqty");
    qty = qty.value;
    console.log("cart data isss", CartData, qty);
    const data = {
      userId: parseInt(localStorage.getItem("userId")!),
      cartType: 1,
      cartItems: [
        {
          productId: parseInt(CartData[0]?.productId),
          qty: parseInt(qty),
          productPrice: parseInt(CartData[0]?.productPrice),
        },
      ],
    };
    console.log("product price isss", data);
    productStore.addtocart(data, (res: any) => {
      if (res.status) {
        //setisaddtosucc(false);
        userStore.getUserCart((res: any) => {
          if (res) {
            navigate(RoutePath.checkout);
          }
        });
      }
    })
  }

  const handleProceedtocheckOut = () => {
    console.log("hanlde proceed to check out");
    addtoCart();

  };

  return (
    <>
      <link rel="stylesheet" href="/assets/css/style.min.css"></link>

      {Array.isArray(CartData) && CartData.length > 0 ? (
        <main className="main">
          <div className="container">
            <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
              <li className="active">
                {" "}
                <a
                  onClick={() => navigate(RoutePath.cart)}
                  style={{ cursor: "pointer" }}
                >
                  Shopping Cart
                </a>{" "}
              </li>
              <li>
                {" "}
                <a
                  onClick={() => navigate(RoutePath.checkout)}
                  style={{ cursor: "pointer" }}
                >
                  Checkout
                </a>{" "}
              </li>
              <li className="disabled">
                {" "}
                <a href="#">Order Complete</a>{" "}
              </li>
            </ul>
            <div className="row">
              <div className="col-lg-8">
                <div className="cart-table-container">
                  <table className="table table-cart">
                    <thead>
                      <tr>
                        <th className="thumbnail-col" />
                        <th className="product-col">Product</th>
                        <th className="price-col">Price</th>
                        <th className="qty-col">Quantity</th>
                        <th className="text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CartData?.map((item: any) => (
                        <tr className="product-row">
                          <td>
                            <figure className="product-image-container">
                              {" "}
                              <a href="#" className="product-image">
                                {" "}
                                <img
                                  src={
                                    CartData[0]?.["images"]
                                      ? CartData[0]?.["images"][0]?.["image"]
                                      : "/assets/images/products/product-1.jpg"
                                  }
                                  alt="product"
                                />{" "}
                              </a>{" "}
                              <a
                                onClick={() => deleteCart(CartData[0]?.["id"])}
                                className="btn-remove icon-cancel"
                                title="Remove Product"
                              />{" "}
                            </figure>
                          </td>
                          <td className="product-col">
                            <h5 className="product-title">
                              {" "}
                              <a href="#">{item.productName} </a>{" "}
                            </h5>
                          </td>
                          <td>₹{item.productPrice}</td>
                          <td>
                            {/* <div className="product-action"> */}
                              <div className="product-single-qty">
                                {/* <input
                                className="horizontal-quantity form-control"
                                type="text"
                                value={item.qty}
                                id="cartqty"
                              /> */}
                                <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                  <span className="input-group-btn input-group-prepend">
                                    <button
                                      className="btn btn-outline btn-down-icon bootstrap-touchspin-down bootstrap-touchspin-injected"
                                      type="button"
                                      onClick={(e:any)=>{setCartQty(parseInt(CartQty) - 1)}}
                                    />
                                  </span>
                                  <input
                                    className="horizontal-quantity form-control"
                                    type="text"
                                    id="cartqty"
                                    value={CartQty}
                                    onChange={(val: any) => setCartQty(val)}
                                  />
                                  <span className="input-group-btn input-group-append">
                                    <button
                                      className="btn btn-outline btn-up-icon bootstrap-touchspin-up bootstrap-touchspin-injected"
                                      type="button"
                                      onClick={(e:any)=>{setCartQty(parseInt(CartQty) + 1)}}
                                    />
                                  </span>
                                </div>
                              </div>
                            {/* </div> */}
                            {/* End .product-single-qty */}
                          </td>
                          <td className="text-right">
                            <span className="subtotal-price">
                              ₹{item.qty * item.productPrice}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={5} className="clearfix">
                          <div className="float-left">
                            <div className="cart-discount">
                              <form action="#">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Coupon Code"
                                    required
                                  />
                                  <div className="input-group-append">
                                    <button
                                      className="btn btn-sm"
                                      type="submit"
                                    >
                                      Apply Coupon
                                    </button>
                                  </div>
                                </div>
                                {/* End .input-group */}
                              </form>
                            </div>
                          </div>
                          {/* End .float-left */}
                          <div className="float-right">
                            <button
                              type="submit"
                              className="btn btn-shop btn-update-cart"
                            >
                              {" "}
                              Update Cart{" "}
                            </button>
                          </div>
                          {/* End .float-right */}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* End .cart-table-container */}
              </div>
              {/* End .col-lg-8 */}
              <div className="col-lg-4">
                <div className="cart-summary">
                  <h3>CART TOTALS</h3>
                  <table className="table table-totals">
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td>₹{subTotal}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total</td>
                        <td>₹{subTotal}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <div className="checkout-methods">
                    {" "}
                    <a
                      onClick={handleProceedtocheckOut}
                      style={{ cursor: "pointer" }}
                      className="btn btn-block btn-dark"
                    >
                      Proceed to Checkout <i className="fa fa-arrow-right" />
                    </a>{" "}
                  </div>
                </div>
                {/* End .cart-summary */}
              </div>
              {/* End .col-lg-4 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
          <div className="mb-6" />
          {/* margin */}
          <GoToTop />
        </main>
      ) : (
        <div className="container">
          <h1>Empty Cart</h1>
        </div>
      )}
      <script src="/assets/js/nouislider.min.js"></script>
    </>
  );
};

export default CartComponent;
