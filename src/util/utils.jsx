
import axios from 'axios';
import global from '../../providers/global.static.jsx';

class Utils {
   doQuery(url,data = null) {
      return new Promise((resolve,reject)=>{
         let obj = {
            method: 'post',
            url: global.URLBASESERVICE+url
         };
         if (data !== null){
            obj.data = data;
         }
         axios(obj)
         .then((response) => {
            resolve(response.data);
         }).catch(()=>{
            resolve(null);
         });

      });
   }
}
export default Utils;
