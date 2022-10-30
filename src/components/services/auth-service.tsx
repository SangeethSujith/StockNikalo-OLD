/**
 * Authorisation service implemntation
 *
 * Developed By : Akhil Soman
 * Author: Akhil Soman
 * Created on: 21/10/2022
 * Project: Stocknikalo
 */



import api from "./api";

//import config from '../Global/Config';
//import api from './api'

class AuthService {

  login = (url: string, data: any) => {
    const currentURL = window?.location?.href;
    return new Promise(function (resolve, reject) {
      // let headersData = { headers: { "Content-Type": 'application/json' } }
      api
        .authPost(url, data, {})
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  getProfile = (params: any, data: any, headers: any, url: string) => {
    return new Promise(function (resolve, reject) {
      api
        .get(url, params, data, headers)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  forgotPassword = (data: any, url: string) => {
    return new Promise(function (resolve, reject) {
      api
        .post(url, data)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  changePassword = (data: any, url: string) => {
    return new Promise(function (resolve, reject) {
      api
        .post(url, data)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  checkUserLoggedIn = (url: string, params: any = {}) => {
    return new Promise(function (resolve, reject) {
      api
        .get(url, params)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  logout = async (url: string) => {
    return new Promise(function (resolve, reject) {
      api
        .post(url)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };
}

export default new AuthService();
