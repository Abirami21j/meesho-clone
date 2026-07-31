import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import MainLayout from '@/layouts/MainLayout';
import ProductList from '@/components/common/ProductList';
import { DataContext } from '@/context/DataContext';

import bataLogo from '@/assets/images/products/logo/bata logo jpg.jpg';
import boatLogo from '@/assets/images/products/logo/boat logo.jpg';
import himalayaLogo from '@/assets/images/products/logo/himalaya logo jpg.jpg';
import lakmeLogo from '@/assets/images/products/logo/lakeme logo.jpg';
import mamaearthLogo from '@/assets/images/products/logo/mamaearth logo .jpg';
import miLogo from '@/assets/images/products/logo/mi logo .jpg';
import niveaLogo from '@/assets/images/products/logo/nivea logo.jpg';
import plumLogo from '@/assets/images/products/logo/plum logo.jpg';
import vivoLogo from '@/assets/images/products/logo/vivo logo.jpg';
import wildstoneLogo from '@/assets/images/products/logo/wild stone logo.jpg';
import zionLogo from '@/assets/images/products/logo/zion logo.jpg';

const topBrands = [
    { name: "Bata", img: bataLogo },
    { name: "Boat", img: boatLogo },
    { name: "Himalaya", img: himalayaLogo },
    { name: "Lakme", img: lakmeLogo },
    { name: "Mamaearth", img: mamaearthLogo },
    { name: "Mi", img: miLogo },
    { name: "Nivea", img: niveaLogo },
    { name: "Plum", img: plumLogo },
    { name: "Vivo", img: vivoLogo },
    { name: "Wild Stone", img: wildstoneLogo },
    { name: "Zion", img: zionLogo }
];

import banner1 from '@/assets/images/products/logo/banners/ChatGPT Image Jul 30, 2026, 04_53_36 PM.png';
import banner2 from '@/assets/images/products/logo/banners/diwali.png';
import banner3 from '@/assets/images/products/logo/banners/independance.png';
import banner4 from '@/assets/images/products/logo/banners/pongal.png';
import banner5 from '@/assets/images/products/logo/banners/ramzan.png';
import banner6 from '@/assets/images/products/logo/banners/ChatGPT Image Jul 30, 2026, 04_54_55 PM.png';

const bannerImages = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6
];

const Home = () => {
    const navigate = useNavigate();
    const { allProducts, categories, loadingData } = useContext(DataContext);
    
    const featuredProducts = allProducts.filter(p => p.featured).slice(0, 10);
    const newArrivals = allProducts.filter(p => p.newArrival && !p.featured).slice(0, 10);

    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    if (loadingData) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f8' }}>Loading Store...</div>;
    }

    return (
        <MainLayout pageClass="Home-page" activeTab="home">
            {/*  Categories  */}
            <nav className="categories" id="categories">
                {categories.slice(0, 8).map(cat => (
                    <Link key={cat.id} to={`/products?category=${cat.id}`}>{cat.name}</Link>
                ))}
            </nav>

            {/*  Main Meesho Banner Carousel  */}
            <section className="banner carousel-banner">
                <Link to="/products" style={{ display: 'block', position: 'relative' }}>
                    <img src={bannerImages[0]} alt="placeholder" style={{ visibility: 'hidden', width: '100%', height: 'auto', display: 'block' }} />
                    {bannerImages.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
                            alt={`Meesho Banner ${index + 1}`} 
                            className={`carousel-image ${index === currentBannerIndex ? 'active' : ''}`}
                        />
                    ))}
                </Link>
            </section>

            {/*  Features  */}
            <div className="features">
                <div className="feature-item">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                    </svg>
                    <span>7 Days Easy Return</span>
                </div>
                <div className="divider-vertical"></div>
                <div className="feature-item">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                    </svg>
                    <span>Cash on Delivery</span>
                </div>
                <div className="divider-vertical"></div>
                <div className="feature-item">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    <span>Lowest Prices</span>
                </div>
            </div>

            <section className="category-section">
                <h2 className="section-title">Top Categories to choose from</h2>
                <div className="category-grid">
                    {categories.slice(0, 8).map(cat => (
                        <div className="category-card" key={cat.id} onClick={() => navigate(`/products?category=${cat.id}`)}>
                            <div className="category-img-wrapper">
                                <img src={cat.image} alt={cat.name} />
                            </div>
                            <p>{cat.name.split(' ')[0]}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Brands Marquee */}
            <section className="overflow-hidden-section" style={{ margin: '60px auto', maxWidth: '1200px' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '30px', justifyContent: 'center' }}>Top Brands</h2>
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

            {/*  Auto Changing Offer Banner  */}
            <section className="offer-banner">
                <img src="https://images.meesho.com/images/marketing/1744698265981.webp" alt="Offer Banner" />
                <div className="offer-content">
                    <button id="shopBtn" onClick={() => navigate('/products?category=women')}>Shop Now</button>
                </div>
            </section>

            <section id="products">
                <h2 className="product-title">Products For You</h2>
                <ProductList products={featuredProducts} />
                <div className="viewMore">
                    <button id="viewMore" onClick={() => navigate('/products')}>View More</button>
                </div>
            </section>
            
            <section id="new-arrivals" style={{ marginTop: '40px' }}>
                <h2 className="product-title">New Arrivals</h2>
                <ProductList products={newArrivals} />
                <div className="viewMore">
                    <button id="viewMore" onClick={() => navigate('/products')}>View More</button>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <div className="about-header">
                        <h2>More About MyStore</h2>
                        <p>Your one-stop destination for affordable fashion, lifestyle, and everyday essentials.</p>
                    </div>

                    <div className="about-grid">
                        <div className="about-card">
                            <div className="about-icon">🛍️</div>
                            <h3>Affordable Products & Essentials</h3>
                            <p>Upgrade your lifestyle with the latest trends and essentials at prices designed for everyday value. We offer a vast selection across all categories, ensuring you find everything you need within budget.</p>
                        </div>

                        <div className="about-card">
                            <div className="about-icon">🌟</div>
                            <h3>Shop Millions of Products</h3>
                            <p>From trendy fashion to essential homeware, MyStore is your ultimate shopping hub. Explore millions of products across a wide variety of categories for every occasion, style, and need.</p>
                        </div>

                        <div className="about-card">
                            <div className="about-icon">👗</div>
                            <h3>Latest Western Wear</h3>
                            <p>Looking to revamp your wardrobe? Find trendy dresses, casual jeans, and comfortable tops suitable for any occasion. Fresh styles are added regularly so you stay on top of your fashion game.</p>
                        </div>

                        <div className="about-card">
                            <div className="about-icon">👠</div>
                            <h3>Accessories & Footwear</h3>
                            <p>Elevate your outfit with jewelry, handbags, belts, and footwear. Whether you're searching for statement earrings or comfortable sneakers, you'll find a wide selection to suit your unique style.</p>
                        </div>

                        <div className="about-card">
                            <div className="about-icon">🔄</div>
                            <h3>Easy Returns & Refunds</h3>
                            <p>Shop with confidence using our hassle-free 7-day return policy. If you're not fully satisfied with your purchase, easily return it and get a full refund without any complicated questions.</p>
                        </div>

                        <div className="about-card">
                            <div className="about-icon">🔒</div>
                            <h3>100% Safe Payments</h3>
                            <p>Your security is our priority. We support multiple secure payment options including UPI, Credit Cards, Net Banking, and Cash on Delivery for a seamless and safe checkout experience.</p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Home;
