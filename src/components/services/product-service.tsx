/**
 * Authorisation service implemntation
 *
 * Developed By : Akhil Soman
 * Author: Akhil Soman
 * Created on: 20/10/2022
 * Project: Stocknikalo
 * Revision History:
 */
import api from "./api";
class productService {
  getProducts = (url: string) => {
    return new Promise(function (resolve, reject) {
      api
        .get(url)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };
  getRelatedProducts = (url: string) => {
    return new Promise(function (resolve, reject) {
      api
        .get(url)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };
  getBestSellingProducts = (url: string) => {
    return new Promise(function (resolve, reject) {
      api
        .get(url)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  getRfqsDetails = (url: string) => {
    return new Promise(function (resolve, reject) {
      api
        .get(url)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  getQuotedRfq = (url: string) => {
    return new Promise(function (resolve, reject) {
      api
        .tokenget(url)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  addtocart = (url: string, data: any) => {
    return new Promise(function (resolve, reject) {
      api
        .tokenpost(url, data)
        .then((response: any) => {
          response && resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  onSearch = (url: string, data: any) => {
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

  getCommission = (url:string) =>{
    return new Promise((resolve,reject)=>{
      api.get(url).then((response:any)=>{
        response && resolve(response)
      }).catch((err:any)=>{
        reject(err);
      })
    })
  }
}



export default new productService();
