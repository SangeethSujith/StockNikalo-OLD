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

class userStore {
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

  getUserCart = async (callback: any) => {
    let userId = localStorage.getItem("userId");
    let url = Constant.get_user_cart + "/" + userId;
    userService
      .getUserCart(url)
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
}
export default new userStore();
