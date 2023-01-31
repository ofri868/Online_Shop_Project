import { Category } from './Category'
export class Product {
    id?: number;
    desc: string = '';
    price: number = 0;
    category: Category = { desc: '' }
    image?: string
}