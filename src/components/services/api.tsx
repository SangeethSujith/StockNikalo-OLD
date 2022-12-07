/**
 * Axios Api Implementation
 *
 * Developed By : Akhil Soman
 * Author:  Akhil Soman
 * Created on: 20/10/2022
 * Project: Stocknikalo
 */

import axios from "axios";
import Constant from "../global/constants";
class API {
  api: any;
  logout: Boolean = false;
  constructor() {
    this.api = axios.create({
      withCredentials: false,
      baseURL: Constant.SNBaseUrl,
      responseType: "json",
    });

    this.api.defaults.baseURL = Constant.SNBaseUrl;
    // Use this to inject anything with all the request

    this.api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (
          error &&
          error.response &&
          (error.response.status === 403 || error.response.status === 401)
        ) {
          console.log(
            "called logout due to error 401 or 403",
            error,
            "error response: ",
            error.response
          );
          if (!this.logout) {
            this.logout = true;
            // authStore.signOut(() => {
            //   this.logout = false;
            //   if (error?.response?.data?.ResponseMessage) {
            //     message.info(error?.response?.data?.ResponseMessage);
            //   } else {
            //     message.info(t("defaultError"));
            //   }
            // });
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  async get(requestUrl: string, params = {}, data = {}, headers = {}) {
    const config = {
      params: params,
      data: data,
    };
    let url: string = Constant.SNBaseUrl + requestUrl;
    return this.api.get(url, config);
  }

  async post(
    requestUrl: string,
    data = {}
    // params = {},
    // header = {},
    // headers = {}
  ) {
    const config = {
      // params: params,
      ...data,
      // header: header,
      // headers: headers,
    };

    const url: string = Constant.SNBaseUrl + requestUrl;
    return this.api.post(url, config);
  }

  async tokenpost(
    requestUrl: string,
    data = {},
    // params = {},
    // header = {},
    headers = {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    }
  ) {
    const config = {
      // params: params,
      ...data,
      // header: header,
    };
    const config1 = {
      // params: params,

      // header: header,
      headers: headers,
    };
    const url: string = Constant.SNBaseUrl + requestUrl;
    return this.api.post(url, config, config1);
  }

  async tokenget(
    requestUrl: string,
    data = {},
    // params = {},
    // header = {},
    headers = {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    }
  ) {
    const config = {
      // params: params,
      ...data,
      // header: header,
    };
    const config1 = {
      // params: params,

      // header: header,
      headers: headers,
    };
    const url: string = Constant.SNBaseUrl + requestUrl;
    return this.api.get(url, config1);
  }

  async authPost(
    requestUrl: string,
    data = {},
    headerConfig = {}
    // params = {},
    // header = {}
  ) {
    const config = {
      // params: params,
      ...data,
      // header: header,
    };

    const url: string = Constant.SNBaseUrl + requestUrl;
    return this.api.post(url, config, headerConfig);
  }

  async put(requestUrl: string, data = {}, params = {}) {
    const config = {
      params: params,
      data: data,
    };
    const url: string = Constant.SNBaseUrl + requestUrl;

    return this.api.put(url, config);
  }

  async delete(requestUrl: string, data = {}, params = {}) {
    const config = {
      params: params,
      data: data,
    };
    const url: string = Constant.SNBaseUrl + requestUrl;

    return this.api.delete(url, config);
  }
}

export default new API();
