import axios from "axios";
import Constant from "../global/constants"
import api from "./api";

class AuctionSerive{

    submitAuction = (data:any )=>{
        const url = Constant.auction;
        console.log("url is",url);
        return new Promise(function (resolve, reject) {
           api.post(url,data).then((resposne)=>{
            resposne && resolve(resposne);
           }).catch((error)=>{
             reject(error);
           })
        })
    }

  updateAuction = (data:any,auctionId:number|string)=>{
    const url = Constant.updateAction + auctionId;
    return new Promise(function (resolve, reject) {
      api.post(url,data).then((resposne)=>{
       resposne && resolve(resposne);
      }).catch((error)=>{
        reject(error);
      })
   })
  }

}

export default new AuctionSerive;