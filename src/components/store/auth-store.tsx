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
import authService from "../services/auth-service";

type userDetails = {
  userId: string;
  userName: string;
  token: string | null;
  isactive: number | null;
  isRegistrationCompleted: number | null;
  isRegistrationCompletedEqualToZero: number | null;
};

class AuthStore {
  isUserLoggedIn: boolean | null = null;
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
          this.isUserLoggedIn = true;
          callback(res);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          message.info(err?.response?.data?.message);
        } else if (err?.response?.data?.ResponseMessage) {
          message.info(err?.response?.data?.ResponseMessage);
        } else {
          message.info("Oops! Some error occurred");
        }
        callback(err);
      });
  };
}

export default new AuthStore();
