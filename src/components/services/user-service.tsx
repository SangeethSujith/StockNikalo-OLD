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
class UserService {
  addEvent = (url: string, data: any) => {
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
}

export default new UserService();
