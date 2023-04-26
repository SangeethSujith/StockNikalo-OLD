
import Constant from "../global/constants";
import { observable, action, makeObservable, toJS } from "mobx";
import settingsService from "../services/settings-service";
class settingsStore {
    settings: any = {};
  
    getSettings = async (callback: any) => {
      let userId = localStorage.getItem("userId");
      let url = Constant.getHomeBanner;
      settingsService
        .getSettings(url)
        .then((res: any) => {
          this.settings = toJS(res?.data?.data);
          callback(res?.data);
        })
        .catch((err) => {});
    };
 
    constructor() {
      makeObservable(this, {
        settings: observable,
        getSettings: action,
      });
    }
  }
  export default new settingsStore();