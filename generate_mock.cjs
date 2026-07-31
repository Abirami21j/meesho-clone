const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'src', 'assets', 'images', 'products');
let uploadedImages = [];
if (fs.existsSync(imgDir)) {
    uploadedImages = fs.readdirSync(imgDir).filter(f => f.match(/\.(jpg|jpeg|png|webp|avif)$/i));
}

const categories = [
    { id: "women", name: "Women's Fashion", file: "womenProducts.js" },
    { id: "men", name: "Men's Fashion", file: "menProducts.js" },
    { id: "kids", name: "Kids", file: "kidsProducts.js" },
    { id: "beauty", name: "Beauty", file: "beautyProducts.js" },
    { id: "electronics", name: "Electronics", file: "electronicsProducts.js" },
    { id: "home-kitchen", name: "Home & Kitchen", file: "homeKitchenProducts.js" },
    { id: "grocery", name: "Grocery", file: "groceryProducts.js" },
    { id: "jewellery", name: "Jewellery", file: "jewelleryProducts.js" },
    { id: "footwear", name: "Footwear", file: "footwearProducts.js" },
    { id: "bags", name: "Bags", file: "bagsProducts.js" },
    { id: "accessories", name: "Accessories", file: "accessoriesProducts.js" },
    { id: "books", name: "Books", file: "booksProducts.js" },
    { id: "pets", name: "Pets", file: "petsProducts.js" },
    { id: "auto", name: "Auto", file: "autoProducts.js" },
    { id: "toys", name: "Toys", file: "toysProducts.js" }
];

const externalUrls = [
    "https://images.meesho.com/images/products/646192388/gej0n_512.avif?width=360",
    "https://images.meesho.com/images/products/860970950/ivzlb_512.avif?width=512",
    "https://images.meesho.com/images/products/562869970/xrzdg_512.avif?width=512"
];

const brands = ["Meesho Basics", "Trendy", "Fashion Hub", "Daily Wear", "Premium", "Elite", "SuperMart"];
const titles = ["Classic", "Modern", "Stylish", "Elegant", "Casual", "Formal", "Party", "Comfortable"];

const oldCategoryImgs = {
    women: ["women.jpg", "red kurti.webp", "kurti.png", "anarkali dress.png", "saree.png"],
    men: ["men.jpg", "mens dress.png"],
    kids: ["kids.jpg", "kids dress .png"],
    beauty: ["beauty.jpg"],
    electronics: ["electronics.jpg", "m1.png", "airpods.png"],
    "home-kitchen": ["home.jpg", "light.png"],
    jewellery: ["diamond earings.png", "jwellry.png", "neckless.png"],
    footwear: ["nike shoe.png"],
    bags: ["handbag.png"],
    accessories: ["watch image .png", "specs.png"]
};

let globalId = 1;

categories.forEach(cat => {
    const products = [];
    let imgImports = [];
    
    let pool = [];
    
    // Find matching new images for this category
    let matchingNew = uploadedImages.filter(f => f.toLowerCase().includes(cat.id.split('-')[0]));
    
    // Fix: exact matches to avoid 'women' matching 'men'
    if (cat.id === "men") matchingNew = uploadedImages.filter(f => f.toLowerCase().startsWith('men-'));
    if (cat.id === "women") matchingNew = uploadedImages.filter(f => f.toLowerCase().startsWith('women-'));

    if (cat.id === "books") matchingNew = uploadedImages.filter(f => f.toLowerCase().includes('book'));
    if (cat.id === "pets") matchingNew = uploadedImages.filter(f => f.toLowerCase().includes('pet') || f.toLowerCase().includes('dog'));
    if (cat.id === "auto") matchingNew = uploadedImages.filter(f => f.toLowerCase().includes('car') || f.toLowerCase().includes('bike'));
    if (cat.id === "toys") matchingNew = uploadedImages.filter(f => f.toLowerCase().includes('toy') || f.toLowerCase().includes('game') || f.toLowerCase().includes('puzzle'));
    
    if (cat.id === "jewellery") matchingNew = uploadedImages.filter(f => f.toLowerCase().includes('jewel'));
    if (cat.id === "footwear") matchingNew = uploadedImages.filter(f => f.toLowerCase().includes('footwear') || f.toLowerCase().includes('shoe'));
    if (cat.id === "bags") matchingNew = uploadedImages.filter(f => f.toLowerCase().includes('bag'));
    if (cat.id === "accessories") matchingNew = uploadedImages.filter(f => f.toLowerCase().includes('watch') || f.toLowerCase().includes('sunglasses') || f.toLowerCase().includes('wallet'));
    
    pool.push(...matchingNew.map(f => `products/${f}`));
    
    // Add old images
    if (oldCategoryImgs[cat.id]) {
        pool.push(...oldCategoryImgs[cat.id]);
    }
    
    // If pool is still empty, grab some generic random images so they don't repeat the same 1 image
    if (pool.length === 0) {
        if (uploadedImages.length > 0) {
            for(let k=0; k<10; k++) {
                pool.push(`products/${uploadedImages[Math.floor(Math.random() * uploadedImages.length)]}`);
            }
        }
    }
    
    for (let i = 0; i < 10; i++) {
        const pId = `p${globalId++}`;
        const price = Math.floor(Math.random() * 1500) + 150;
        const originalPrice = price + Math.floor(Math.random() * 500) + 200;
        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        
        let localImgPath = null;
        if (pool.length > 0) {
             localImgPath = pool[i % pool.length];
        }
        
        if (localImgPath) {
            imgImports.push(`import img${i} from ${JSON.stringify(`@/assets/images/${localImgPath}`)};`);
        }
        
        const extUrl = externalUrls[Math.floor(Math.random() * externalUrls.length)];
        
        let subcat = "General";
        if (localImgPath && localImgPath.includes('-')) {
            subcat = localImgPath.split('/').pop().split('-')[1]?.split('.')[0] || "General";
            subcat = subcat.charAt(0).toUpperCase() + subcat.slice(1);
        } else if (localImgPath) {
            subcat = localImgPath.split('/').pop().replace(/\.(png|webp|jpg)$/i, '');
            subcat = subcat.charAt(0).toUpperCase() + subcat.slice(1);
        }
        
        products.push(`
    {
        id: "${pId}",
        slug: "${cat.id}-product-${i+1}",
        title: "${titles[Math.floor(Math.random() * titles.length)]} ${subcat !== 'General' ? subcat : cat.name}",
        category: "${cat.id}",
        subcategory: "${subcat}",
        brand: "${brands[Math.floor(Math.random() * brands.length)]}",
        price: ${price},
        originalPrice: ${originalPrice},
        discount: ${discount},
        rating: ${(Math.random() * 2 + 3).toFixed(1)},
        reviews: ${Math.floor(Math.random() * 2000)},
        description: "High quality ${cat.name.toLowerCase()} item perfect for daily use.",
        images: [${localImgPath ? `img${i}` : `"${extUrl}"`}],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White", "Blue"],
        stock: ${Math.floor(Math.random() * 100) + 10},
        deliveryTime: "${Math.floor(Math.random() * 5) + 2} Days",
        seller: "Meesho Verified Seller",
        returnPolicy: "7 Days Easy Return",
        specifications: { material: "Premium", occasion: "Casual" },
        featured: ${Math.random() > 0.8},
        newArrival: ${Math.random() > 0.7},
        bestSeller: ${Math.random() > 0.85}
    }`);
    }
    
    const exportName = cat.file.replace('.js', '');
    
    const fileContent = `
${imgImports.join('\n')}

export const ${exportName} = [
${products.join(',')}
];
`;
    fs.writeFileSync(path.join(__dirname, 'src', 'data', 'products', cat.file), fileContent.trim());
});

const indexContent = `
export { categories } from './categories';
${categories.map(cat => `import { ${cat.file.replace('.js', '')} } from './products/${cat.file}';`).join('\n')}

export const allProducts = [
    ${categories.map(cat => `...${cat.file.replace('.js', '')}`).join(',\n    ')}
];
`;
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'index.js'), indexContent.trim());

console.log("Mock data files and index generated successfully.");
