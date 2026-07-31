export { categories } from './categories';
import { womenProducts } from './products/womenProducts.js';
import { menProducts } from './products/menProducts.js';
import { kidsProducts } from './products/kidsProducts.js';
import { beautyProducts } from './products/beautyProducts.js';
import { electronicsProducts } from './products/electronicsProducts.js';
import { homeKitchenProducts } from './products/homeKitchenProducts.js';
import { groceryProducts } from './products/groceryProducts.js';
import { jewelleryProducts } from './products/jewelleryProducts.js';
import { footwearProducts } from './products/footwearProducts.js';
import { bagsProducts } from './products/bagsProducts.js';
import { accessoriesProducts } from './products/accessoriesProducts.js';
import { booksProducts } from './products/booksProducts.js';
import { petsProducts } from './products/petsProducts.js';
import { autoProducts } from './products/autoProducts.js';
import { toysProducts } from './products/toysProducts.js';

export const allProducts = [
    ...womenProducts,
    ...menProducts,
    ...kidsProducts,
    ...beautyProducts,
    ...electronicsProducts,
    ...homeKitchenProducts,
    ...groceryProducts,
    ...jewelleryProducts,
    ...footwearProducts,
    ...bagsProducts,
    ...accessoriesProducts,
    ...booksProducts,
    ...petsProducts,
    ...autoProducts,
    ...toysProducts
];