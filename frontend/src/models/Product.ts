import { Brand } from './Brand'
import { Scale } from './Scale';
export interface Product {
    id?: number;
    title: string
    desc: string
    price: number
    brand: Brand
    scale: Scale
    image?: string
}