import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ProductCard from '@/components/common/ProductCard';
import { DataContext } from '@/context/DataContext';
import offer80 from '@/assets/images/products/logo/offers/80percentage offer.png';
import freeDelivery from '@/assets/images/products/logo/offers/free delivery image .png';
import boatLogo from '@/assets/images/products/logo/boat logo.jpg';
import lakmeLogo from '@/assets/images/products/logo/lakeme logo.jpg';
import mamaearthLogo from '@/assets/images/products/logo/mamaearth logo .jpg';
import himalayaLogo from '@/assets/images/products/logo/himalaya logo jpg.jpg';
import bataLogo from '@/assets/images/products/logo/bata logo jpg.jpg';
import miLogo from '@/assets/images/products/logo/mi logo .jpg';
import niveaLogo from '@/assets/images/products/logo/nivea logo.jpg';
import vivoLogo from '@/assets/images/products/logo/vivo logo.jpg';
import plumLogo from '@/assets/images/products/logo/plum logo.jpg';
import wildStoneLogo from '@/assets/images/products/logo/wild stone logo.jpg';
import './Categories.css';

import imgWomen from '@/assets/images/products/categorieslogo/women.png';
import imgMen from '@/assets/images/products/categorieslogo/men.png';
import imgKids from '@/assets/images/products/categorieslogo/kids.png';
import imgBeauty from '@/assets/images/products/categorieslogo/beauty.png';
import imgElectronics from '@/assets/images/products/categorieslogo/electronics.png';
import imgHome from '@/assets/images/products/categorieslogo/Home.png';
import imgGrocery from '@/assets/images/products/categorieslogo/grocery.png';
import imgJewellery from '@/assets/images/products/categorieslogo/Jewellery.png';
import imgFootwear from '@/assets/images/products/categorieslogo/Footwear.png';
import imgBags from '@/assets/images/products/categorieslogo/Bags.png';
import imgAccessories from '@/assets/images/products/categorieslogo/accessories.png';
import imgBooks from '@/assets/images/products/categorieslogo/Books.png';
import imgPets from '@/assets/images/products/categorieslogo/Pets.png';
import imgAuto from '@/assets/images/products/categorieslogo/auto.png';
import imgToys from '@/assets/images/products/categorieslogo/Toys.png';

const Categories = () => {
    const navigate = useNavigate();
    const { allProducts, loadingData } = useContext(DataContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const mainCategories = [
        { name: "Women", img: imgWomen, link: "women" },
        { name: "Men", img: imgMen, link: "men" },
        { name: "Kids", img: imgKids, link: "kids" },
        { name: "Beauty", img: imgBeauty, link: "beauty" },
        { name: "Electronics", img: imgElectronics, link: "electronics" },
        { name: "Home", img: imgHome, link: "home-kitchen" },
        { name: "Grocery", img: imgGrocery, link: "grocery" },
        { name: "Jewellery", img: imgJewellery, link: "jewellery" },
        { name: "Footwear", img: imgFootwear, link: "footwear" },
        { name: "Bags", img: imgBags, link: "bags" },
        { name: "Accessories", img: imgAccessories, link: "accessories" },
        { name: "Books", img: imgBooks, link: "books" },
        { name: "Pets", img: imgPets, link: "pets" },
        { name: "Auto", img: imgAuto, link: "auto" },
        { name: "Toys", img: imgToys, link: "toys" }
    ];

    const subCategories = {
        Women: ["Sarees", "Kurtis", "Dresses", "Tops", "Jeans", "Leggings", "Ethnic Wear", "Nightwear", "Innerwear", "Handbags", "Jewellery", "Footwear"],
        Men: ["Shirts", "T-Shirts", "Jeans", "Trousers", "Hoodies", "Jackets", "Watches", "Shoes", "Wallets", "Sunglasses"],
        Kids: ["Baby Clothing", "Boys Wear", "Girls Wear", "School Bags", "Toys", "Baby Care", "Footwear"],
        Beauty: ["Face Wash", "Makeup", "Lipstick", "Foundation", "Perfume", "Hair Care", "Skin Care", "Nail Polish"],
        Electronics: ["Mobiles", "Earbuds", "Smart Watches", "Speakers", "Chargers", "Power Banks", "Laptop Accessories", "Smart Home"],
        "Home & Kitchen": ["Bedsheets", "Curtains", "Cookware", "Storage", "Kitchen Tools", "Home Decor", "Lighting", "Furniture"]
    };
    
    const priceBuckets = [
        { label: "Under ₹199", query: "199" },
        { label: "₹200–₹499", query: "499" },
        { label: "₹500–₹999", query: "999" },
        { label: "₹1000+", query: "1000plus" }
    ];

    const topBrands = [
        { name: "Boat", img: boatLogo },
        { name: "Lakme", img: lakmeLogo },
        { name: "Mamaearth", img: mamaearthLogo },
        { name: "Himalaya", img: himalayaLogo },
        { name: "Bata", img: bataLogo },
        { name: "Mi", img: miLogo },
        { name: "Nivea", img: niveaLogo },
        { name: "Vivo", img: vivoLogo },
        { name: "Plum", img: plumLogo },
        { name: "Wild Stone", img: wildStoneLogo }
    ];

    // Realistic data slices
    const newArrivals = allProducts.filter(p => p.newArrival).slice(0, 4);
    const bestSellers = allProducts.filter(p => p.bestSeller).slice(0, 4);
    const trendingProducts = allProducts.filter(p => p.featured).slice(0, 6);

    if (loadingData) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f8' }}>Loading Categories...</div>;
    }

    return (
        <MainLayout pageClass="Categories-page" activeTab="categories">
            
            {/* Search Bar */}
            <div className="cat-search-container">
                <form onSubmit={handleSearch} className="cat-search-form">
                    <span className="search-icon">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search Products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>

            {/* Banners */}
            <div className="cat-banners">
                <div className="cat-banner-item img-banner">
                    <img src={offer80} alt="Up to 80% OFF" />
                </div>
                <div className="cat-banner-item img-banner">
                    <img src={freeDelivery} alt="Free Delivery" />
                </div>
            </div>

            {/* Main Categories Grid */}
            <section className="cat-section">
                <h2 className="section-title">Categories</h2>
                <div className="main-cat-grid">
                    {mainCategories.map(cat => (
                        <div key={cat.name} className="main-cat-item" onClick={() => navigate(`/products?category=${cat.link}`)}>
                            <div className="cat-icon"><img src={cat.img} alt={cat.name} /></div>
                            <span className="cat-name">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sub Categories block */}
            <section className="cat-section sub-cat-section">
                {Object.entries(subCategories).map(([parentCat, subs]) => (
                    <div key={parentCat} className="sub-cat-block">
                        <h3 className="sub-cat-title">{parentCat}</h3>
                        <div className="sub-cat-list">
                            {subs.map(sub => (
                                <Link key={sub} to={`/products?search=${encodeURIComponent(sub)}`} className="sub-cat-link">
                                    {sub}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Trending */}
            <section className="cat-section">
                <h2 className="section-title">🔥 Trending</h2>
                <div className="horizontal-scroll">
                    {trendingProducts.map(p => (
                        <div className="trending-card-wrap" key={p.id}>
                            <ProductCard {...p} image={p.images[0]} oldPrice={p.originalPrice} discount={`${p.discount}% OFF`} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Shop by Price */}
            <section className="cat-section">
                <h2 className="section-title">Shop by Price</h2>
                <div className="price-grid">
                    {priceBuckets.map(price => (
                        <Link key={price.label} to={`/products?price=${price.query}`} className="price-card">
                            {price.label}
                        </Link>
                    ))}
                </div>
            </section>

            {/* New Arrivals */}
            <section className="cat-section">
                <h2 className="section-title">New Arrivals</h2>
                <div className="products-grid-preview">
                    {newArrivals.map(p => (
                        <ProductCard key={p.id} {...p} image={p.images[0]} oldPrice={p.originalPrice} discount={`${p.discount}% OFF`} />
                    ))}
                </div>
            </section>

            {/* Best Sellers */}
            <section className="cat-section">
                <h2 className="section-title">Best Sellers</h2>
                <div className="products-grid-preview">
                    {bestSellers.map(p => (
                        <ProductCard key={p.id} {...p} image={p.images[0]} oldPrice={p.originalPrice} discount={`${p.discount}% OFF`} />
                    ))}
                </div>
            </section>

            {/* Top Brands */}
            <section className="cat-section overflow-hidden-section">
                <h2 className="section-title">Top Brands</h2>
                <div className="brands-marquee-wrapper">
                    <div className="brands-marquee">
                        {topBrands.map((brand, idx) => (
                            <Link key={brand.name + idx} to={`/products?search=${encodeURIComponent(brand.name)}`} className="brand-card has-image">
                                <img src={brand.img} alt={brand.name} className="brand-logo-img" />
                            </Link>
                        ))}
                        {/* Duplicate for seamless looping */}
                        {topBrands.map((brand, idx) => (
                            <Link key={brand.name + '-dup-' + idx} to={`/products?search=${encodeURIComponent(brand.name)}`} className="brand-card has-image">
                                <img src={brand.img} alt={brand.name} className="brand-logo-img" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Footer */}
            <div className="cat-footer-links">
                <a href="#">Need Help?</a>
                <a href="#">Contact Support</a>
                <a href="#">FAQs</a>
                <a href="#">Return Policy</a>
            </div>

        </MainLayout>
    );
};

export default Categories;
