import { API_URL } from "./constants.js";
export default class ListService{
     callApi(uri,method,data){
          return axios({
               url: API_URL + "/" + uri,
               method,
               data,
          });
     }
}