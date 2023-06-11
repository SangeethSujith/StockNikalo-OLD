/**
 * Manages product data
 *
 * Developed By : Akhil Soman
 * Author: Akhil Soman
 * Created on: 20/10/2022
 * Project: Stocknikalo
 */
import { message } from "antd";
import Constant from "../global/constants";
import productService from "../services/product-service";
import swal from "sweetalert";
import cartService from "../services/cart-service";

class productStore {
  currentuserId: number | null = JSON.parse(localStorage.getItem("userId")!);
  currentuserToken: string | null = localStorage.getItem("userToken")!;

  getProducts = async (callback: any) => {
    let url = Constant.products;
    productService
      .getProducts(url)
      .then((res: any) => {
        console.log("datss isss",res)
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getAuction = async (callback: any) => {
    let url = Constant.get_auctions;
    productService
      .getProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getNewArrivals = async (callback: any) => {
    let url = Constant.newarrivals;
    productService
      .getProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getProductCategory = async (callback: any) => {
    let url = Constant.category;
    productService
      .getProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getRfqsDetails = async (callback: any) => {
    let url = Constant.getrfquser + localStorage.getItem("userId");
    productService
      .getRfqsDetails(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getRfqsDetailsByID = async (callback: any) => {
    let url = Constant.getrfquser + localStorage.getItem("userId");
    productService
      .getQuotedRfq(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getQuotedRfq = async (callback: any) => {
    // let url = Constant.quotedrfq + "/" + this.currentuserId;
    let url = Constant.getrfq;
    productService
      .getQuotedRfq(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  onSearch = async (data: any, callback: any) => {
    let url = Constant.productsearch;
    productService
      .onSearch(url, data)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getProductsDetails = async (data: any, callback: any) => {
    let url = Constant.products + "/" + data;
    productService
      .getProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getRelatedProductDetails = async (data: any, callback: any) => {
    let url = Constant.relatedProduct + "/" + data;
    productService
      .getRelatedProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getBestSellingProduct = async ( callback: any) => {
    let url = Constant.bestSelling;
    productService
      .getBestSellingProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getAuctionDetails = async (data: any, callback: any) => {
    let url = Constant.get_auctions + "/" + data;
    productService
      .getProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  addtocart = async (data: any, callback: any) => {
    let url = Constant.addtocart;
    productService
      .addtocart(url, data)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  updateCart = async(data:any,callback :any)=>{
    let url =Constant.updateCart;
    cartService.updateUserCart(url,data).then((res:any)=>{
      res && callback(res.data);
    }).catch((err)=>{});
  }

  submitRfqsQuote = async (data: any, callback: any) => {
    let url = Constant.submitrfq;
    productService
      .addtocart(url, data)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        swal({
          text: "Oops! Some error occurred",
          icon: "error",
          dangerMode: true,
        });
      });
  };

  getCommission = async(id :any,callback:any)=>{
    let url = Constant.getcommission + id;
    productService.getCommission(url).then((res:any)=>{
      res&&callback(res?.data);
    }).catch((error)=>{
      console.log("error");
    })
  }
}
export default new productStore();
