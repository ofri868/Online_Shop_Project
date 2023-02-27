import axios from "axios";
import { MYSERVER } from "../env";


export function checkout(orderDetails:{product:number | undefined, amount:number}[], order:any, myToken:string) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MYSERVER + '/order', {orderDetails, order}, {headers: {Authorization: `Bearer ${myToken}`}}).then((res) => resolve({ data: res.data }))
  );
}
