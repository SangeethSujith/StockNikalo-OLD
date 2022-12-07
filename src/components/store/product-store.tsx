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

class productStore {
  currentuserId: number | null = JSON.parse(localStorage.getItem("userId")!);
  currentuserToken: string | null = localStorage.getItem("userToken")!;

  getProducts = async (callback: any) => {
    let url = Constant.products;
    productService
      .getProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
      });
  };

  getNewArrivals = async (callback: any) => {
    let url = Constant.newarrivals;
    productService
      .getProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
      });
  };

  getProductCategory = async (callback: any) => {
    let url = Constant.category;
    productService
      .getProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
      });
  };

  getRfqsDetails = async (callback: any) => {
    let url = Constant.getrfq;
    productService
      .getRfqsDetails(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
      });
  };

  getRfqsDetailsByID = async (data: any, callback: any) => {
    let url = Constant.getrfq + "/" + data;
    productService
      .getQuotedRfq(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
      });
  };

  getQuotedRfq = async (data: any, callback: any) => {
    let url = Constant.quotedrfq + "/" + data + "/" + this.currentuserId;
    productService
      .getQuotedRfq(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
      });
  };

  onSearch = async (data: any, callback: any) => {
    let url = Constant.productsearch;
    productService
      .onSearch(url, data)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
      });
  };

  getProductsDetails = async (data: any, callback: any) => {
    let url = Constant.products + "/" + data;
    productService
      .getProducts(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
      });
  };

  addtocart = async (data: any, callback: any) => {
    let url = Constant.addtocart;
    console.log(url);
    productService
      .addtocart(url, data)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
      });
  };

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
}
export default new productStore();
