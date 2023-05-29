import React, { useState } from 'react'
interface cartItemflatlist{
    data:any;
    key:number;
    deleteCart : any;
}

const CartItemFlatlist : React.FC<any> = (props : cartItemflatlist) => {
   const {data,key,deleteCart} = props;
   const [CartQty, setCartQty] = useState<any>(0);
  const [CartData, setCartData] = useState<any>([]);
    return (
            <tr className="sk-product-row" key={key}>
                <td>
                    <figure className="product-image-container">
                        {" "}
                        <a href="#" className="product-image">
                            {" "}
                            <img
                                src={
                                    data[0]?.["images"]
                                        ? data[0]?.["images"][0]?.["image"]
                                        : "/assets/images/products/product-1.jpg"
                                }
                                alt="product"
                            />{" "}
                        </a>{" "}
                        <a
                            onClick={() => deleteCart(data?.id)}
                            className="btn-remove icon-cancel"
                            title="Remove Product"
                        />{" "}
                    </figure>
                </td>
                <td className="product-col">
                    <h5 className="product-title">
                        {" "}
                        <a href="#">{data.productName} </a>{" "}
                    </h5>
                </td>
                <td>₹{data.productPrice}</td>
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
                                    onClick={(e: any) => { setCartQty(parseInt(CartQty) - 1) }}
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
                                    onClick={(e: any) => { setCartQty(parseInt(CartQty) + 1) }}
                                />
                            </span>
                        </div>
                    </div>
                    {/* </div> */}
                    {/* End .product-single-qty */}
                </td>
                <td className="text-right">
                    <span className="subtotal-price">
                        ₹{data.qty * data.productPrice}
                    </span>
                </td>
            </tr>
    )
}

export default CartItemFlatlist;