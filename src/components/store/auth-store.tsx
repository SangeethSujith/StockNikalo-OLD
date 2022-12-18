/**
 * Manages authorisation data
 *
 * Developed By : Akhil Soman
 * Author: Akhil Soman
 * Created on: 21/10/2022
 * Project: Stocknikalo
 */

import { message } from "antd";
import Constant from "../global/constants";
import { observable, action, makeObservable } from "mobx";
import authService from "../services/auth-service";
import swal from "sweetalert";
import userStore from "./user-store";

if (!JSON.parse(localStorage.getItem("userId")!)) {
  localStorage.setItem("userId", JSON.stringify(null));
}
if (!localStorage.getItem("userToken")!) {
  localStorage.setItem("userToken", JSON.stringify(null));
}

type userDetails = {
  userId: string;
  userName: string;
  token: string | null;
  isactive: number | null;
  isRegistrationCompleted: number | null;
  isRegistrationCompletedEqualToZero: number | null;
};

class AuthStore {
  currentuserId: number | null = JSON.parse(localStorage.getItem("userId")!);
  currentuserToken: string | null = localStorage.getItem("userToken")!;
  isUserLoggedIn: boolean = true;
  currentUser: userDetails | null = null;

  login = async (email: string, password: string, callback: any) => {
    let url = Constant.login;
    let data = { email, password };

    await authService
      .login(url, data)
      .then((res: any) => {
        if (res) {
          this.currentUser = {
            userId: res.data?.data?.userId,
            token: res.data?.data?.token,
            userName: res.data?.data?.name,
            isactive: res.data?.data?.isactive,
            isRegistrationCompleted: res.data?.data?.isRegistrationCompleted,
            isRegistrationCompletedEqualToZero:
              res.data?.data?.isRegistrationCompletedEqualToZero,
          };
          localStorage.setItem("userId", res.data?.data?.userId);
          localStorage.setItem("userToken", res.data?.data?.token);
          this.isUserLoggedIn = true;
          userStore.getUserCart(res);
          callback(res);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          message.info(err?.response?.data?.message);
        } else if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          swal({
            //title: "Are you sure?",
            text: "Invalid Username or Password",
            icon: "error",
            dangerMode: true,
          });
        }
        callback(err);
      });
  };

  signOut(data: any, callback?: any) {
    const url = Constant.logout;
    authService
      .logout(url, { token: data })
      .then((res: any) => {
        this.isUserLoggedIn = false;
        this.currentUser = null;
        userStore.cartItem = {};
        localStorage.setItem("userCmpReg", JSON.stringify(null));
        localStorage.setItem("userId", JSON.stringify(null));
        localStorage.setItem("userToken", JSON.stringify(null));
        if (callback) {
          res && callback(res);
        }
      })
      .catch((err) => {
        callback(err);
        //  swal({
        //       //title: "Are you sure?",
        //       text: "Error occured",
        //       icon: "error",
        //       dangerMode: true,
        //     });
      });
  }

  constructor() {
    makeObservable(this, {
      currentUser: observable,
      isUserLoggedIn: observable,
      // error: observable,
      login: action,
      signOut: action,
      // updateCurrentUserRole: action
    });
  }
}

export default new AuthStore();
