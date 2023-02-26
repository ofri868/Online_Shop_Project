import { Product } from "./Product"

export interface OrderDetail{
    user: number
    product:Product
    createdTime:string
    address : string  
    city : string  
    zip_code : string  
    billing_address : string  
    billing_city : string 
    billing_zip_code : string  
}