/**
 * Manages authorisation data
 *
 * Developed By : Akhil Soman
 * Author: Akhil Soman
 * Created on: 20/10/2022
 * Project: Stocknikalo
 */
import { message } from "antd";
import Constant from "../global/constants";
import userService from "../services/user-service";
import swal from "sweetalert";
import { observable, action, makeObservable, toJS } from "mobx";

class userStore {
  cartItem: any = {};

  addRegistration = async (data: any, callback: any) => {
    let url = Constant.registration;
    userService
      .addEvent(url, data)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          swal({
            //title: "Are you sure?",
            text: "Oops! Some error occurred",
            icon: "error",
            dangerMode: true,
          });
        }
      });
  };
  addCompleteRegistration = async (data: any, callback: any) => {
    let url = Constant.comp_registration;
    userService
      .completeReg(url, data)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          swal({
            //title: "Are you sure?",
            text: "Oops! Some error occurred",
            icon: "error",
            dangerMode: true,
          });
        }
      });
  };

  createOrder = async (data: any, callback: any) => {
    let url = Constant.create_order;
    userService
      .completeReg(url, data)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          swal({
            //title: "Are you sure?",
            text: "Oops! Some error occurred",
            icon: "error",
            dangerMode: true,
          });
        }
      });
  };

  removeCart = async (callback: any) => {
    let userId = localStorage.getItem("userId");
    let data = {
      user_id: userId,
    };
    let url = Constant.removecart;
    userService
      .removeCart(url, data)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  getUserCart = async (callback: any) => {
    let userId = localStorage.getItem("userId");
    let url = Constant.get_user_cart + "/" + userId;
    userService
      .getUserCart(url)
      .then((res: any) => {
        this.cartItem = toJS(res?.data?.data);
        callback(res?.data);
      })
      .catch((err) => {});
  };

  getUserAddress = async (callback: any) => {
    let userId = localStorage.getItem("userId");
    let url = Constant.user_address + "/" + userId;
    userService
      .getUserAddrss(url)
      .then((res: any) => {
        res && callback(res?.data);
      })
      .catch((err) => {});
  };

  // getUserCart = () => {
  //   userStore.getUserCart((res: any) => {
  //     console.log(res);
  //     if (res.status) {
  //       setCartData(res.data);
  //       var tot = 0;
  //       var price = 0;
  //       res?.data?.map(
  //         (item: any) => (
  //           (price = item.qty * item.productPrice), (tot = tot + price)
  //         )
  //       );
  //       setsubTotal(tot);
  //     }
  //   });
  // };

  constructor() {
    makeObservable(this, {
      cartItem: observable,
      getUserCart: action,
    });
  }
}
export default new userStore();
