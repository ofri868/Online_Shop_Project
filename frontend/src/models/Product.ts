import { Category } from './Category'
import { Review } from './Review';
export interface Product {
    id?: number;
    desc: string
    price: number
    category: Category 
    image?: string
}