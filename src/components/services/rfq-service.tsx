import api from "./api";

class RfqService {
    submitRfq = (url: string, data: any)=>{
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
    } 
   updateRfq = (url: string, data: any)=>{
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
   } 
}

export default new RfqService();