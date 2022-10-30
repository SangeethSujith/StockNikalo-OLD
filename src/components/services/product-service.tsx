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
}

export default new productService();
