import axios from "axios";
import { MYSERVER } from "../env";


export function checkout(newprod:{product:number | undefined, amount:number}[], myToken:string) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MYSERVER + 'order', newprod, {headers: {Authorization: `Bearer ${myToken}`}}).then((res) => resolve({ data: res.data }))
  );
}
