import axios from "axios";
import { MYSERVER } from "../env";
import { Product } from "../models/Product";

export function getAllProds() {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MYSERVER + 'products').then((res) => resolve({ data: res.data }))
  );
}

export function getAllCategoriess() {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MYSERVER + 'category').then((res) => resolve({ data: res.data }))
  );
}

export function addProd(newprod:Product) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MYSERVER + 'products', newprod).then((res) => resolve({ data: res.data }))
  );
}

export function updateProd(newprod:Product) {
  return new Promise<{ data: any }>((resolve) =>
    axios.put(MYSERVER + 'products/' + newprod.id, newprod).then((res) => resolve({ data: res.data }))
  );
}

export function deleteProd(id:number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.delete(MYSERVER + 'products/'+id).then((res) => resolve({ data: res.data }))
  );
}