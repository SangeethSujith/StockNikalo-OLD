import { error } from "console";
import Constant from "../global/constants";
import api from "./api";

/**
 * Authorisation service implemntation
 *
 * Developed By : Akhil Soman
 * Author: Akhil Soman
 * Created on: 20/10/2022
 * Project: Stocknikalo
 * Revision History:
 */
class cartService{
    updateUserCart = (url:string, data :any) => {
        return new Promise((resolve,reject)=>{
          api.tokenpost(url,data).then((response)=>{
            response && resolve(response);
          }).catch((err)=>{
            reject(err);
          })
        })
      }

  removeCartItem = (id:number | string) =>{
    return new Promise((resolve,reject)=>{
        api.get(Constant.removeCartitem + id).then((response)=>{
          response && resolve(response);
        }).catch((err)=>{
          reject(err);
        })
      })
  }  

  removeAllCartItem = (id:number | string) =>{
    return new Promise((resolve,reject)=>{
        api.get(Constant.clearAllCartitems + id).then((response)=>{
          response && resolve(response);
        }).catch((err)=>{
          reject(err);
        })
      })
  }   

}

export default new cartService();