import { Product } from "./Product"

export interface OrderDetail{
    id:number
    user: number
    product:Product
    createdTime:string
    reviewed:boolean
    address : string  
    city : string  
    zip_code : string  
    billing_address : string  
    billing_city : string 
    billing_zip_code : string  
}