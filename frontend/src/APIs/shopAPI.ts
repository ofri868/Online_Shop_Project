import axios from "axios";
import { MYSERVER } from "../env";
import { Product } from "../models/Product";
import { Review } from "../models/Review";

export function getInitData() {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MYSERVER + '/init').then((res) => resolve({ data: res.data }))
  );
}

export function getProds() {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MYSERVER + '/products').then((res) => resolve({ data: res.data }))
  );
}

export function getBrands() {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MYSERVER + '/brand').then((res) => resolve({ data: res.data }))
  );
}

export function getScales() {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MYSERVER + '/scale').then((res) => resolve({ data: res.data }))
  );
}

export function addProd(newprod:Product) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MYSERVER + '/products', newprod).then((res) => resolve({ data: res.data }))
  );
}

export function updateProd(newprod:Product) {
  return new Promise<{ data: any }>((resolve) =>
    axios.put(MYSERVER + '/products/' + newprod.id, newprod).then((res) => resolve({ data: res.data }))
  );
}

export function deleteProd(id:number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.delete(MYSERVER + '/products/'+id).then((res) => resolve({ data: res.data }))
  );
}

export function getReviews(product:number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MYSERVER + '/review/' + product).then((res) => resolve({ data: res.data }))
  );
}

export function addReview(newReview:Review, reviewedOrder:number, myToken:string) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MYSERVER + '/review', {newReview, reviewedOrder}, {headers: {Authorization: `Bearer ${myToken}`}}).then((res) => resolve({ data: res.data }))
  );
}