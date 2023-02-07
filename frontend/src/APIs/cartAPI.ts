import axios from "axios";
import { MYSERVER } from "../env";
import { CartItem } from "../models/CartItem";


export function checkout(newprod:CartItem[]) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MYSERVER + 'checkout', newprod).then((res) => resolve({ data: res.data }))
  );
}
