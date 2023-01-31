import axios from "axios";
import { MYSERVER } from "../env";
import { Product } from "../models/Product";
import { Profile } from "../models/Profile";
// A mock function to mimic making an async request for data

export function logOut() {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MYSERVER + 'logout').then((res) => resolve({ data: res.data }))
  );
}
export function logIn(username:string, password:string) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MYSERVER + 'login/', {username, password}).then((res) => resolve({ data: res.data }))
  );
}

export function register(username:string, password:string, email:string) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MYSERVER + 'register/', {username, password, email}).then((res) => resolve({ data: res.data }))
  );
}

export function getProfile(myToken:string) {
  return new Promise<{ data: Profile[] }>((resolve) =>
    axios.get(MYSERVER + 'profile', {headers: {Authorization: `Bearer ${myToken}`}}).then((res) => resolve({ data: res.data }))
  );
}

export function updProfile(newProf:FormData, token:string) {
  return new Promise<{ data: any }>((resolve) =>
    axios.patch(MYSERVER + 'products/', newProf).then((res) => resolve({ data: res.data }))
  );
}

export function deleteProd(id:number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.delete(MYSERVER + 'products/'+id).then((res) => resolve({ data: res.data }))
  );
}