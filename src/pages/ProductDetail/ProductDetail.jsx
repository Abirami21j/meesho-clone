import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ProductList from '@/components/common/ProductList';
import { DataContext } from '@/context/DataContext';
import { useCart } from '@/context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { allProducts, loadingData } = useContext(DataContext);
    
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    
    const [activeSize, setActiveSize] = useState('');
    const [openAccordion, setOpenAccordion] = useState('details');
    
    const [bgPosition, setBgPosition] = useState('50% 50%');
    const imageRef = useRef(null);

    useEffect(() => {
        if (loadingData) return; // Don't try to find product if data isn't loaded yet
        
        window.scrollTo(0, 0);
        // Ensure ID is compared correctly (convert both to string just in case)
        const foundProduct = allProducts.find(p => String(p.id) === String(id));
        if (foundProduct) {
            setProduct(foundProduct);
            const similar = allProducts
                .filter(p => p.category === foundProduct.category && String(p.id) !== String(id))
                .slice(0, 5);
            setSimilarProducts(similar);
        } else {
            // Wait for data to load, if we have data and it's not found, go home
            if (allProducts.length > 0) {
                navigate('/');
            }
        }
    }, [id, navigate, allProducts, loadingData]);

    if (loadingData || !product) {
        return <MainLayout pageClass="product-detail-page"><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f8' }}>Loading Product...</div></MainLayout>;
    }

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setBgPosition(`${x}% ${y}%`);
    };

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? '' : section);
    };

    return (
        <MainLayout pageClass="product-detail-page" activeTab="products">
            <div className="pd-container">
                <div className="pd-main">
                    
                    {/* Left Column: Image Gallery */}
                    <div className="pd-image-section">
                        <div 
                            className="pd-main-image-container zoom-container"
                            ref={imageRef}
                            onMouseMove={handleMouseMove}
                            style={{ backgroundImage: `url(${product.images[0]})`, backgroundPosition: bgPosition }}
                        >
                            <img src={product.images[0]} alt={product.title} className="pd-main-image" />
                        </div>
                        <div className="pd-thumbnails">
                            <img src={product.images[0]} alt={product.title} className="pd-thumb active" />
                        </div>
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="pd-info-section">
                        <div className="pd-card">
                            <h1 className="pd-title">{product.title}</h1>
                            <div className="pd-price-row">
                                <span className="pd-price">₹{product.price}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="pd-old-price">₹{product.originalPrice}</span>
                                        <span className="pd-discount">{product.discount}% off</span>
                                    </>
                                )}
                            </div>
                            
                            <div className="pd-rating-block">
                                <span className="pd-rating-badge">{product.rating} ★</span>
                                <span className="pd-reviews-count">{product.reviews} Ratings, 24 Reviews</span>
                            </div>

                            <div className="pd-trust-badges">
                                <div className="badge"><span className="icon">🚚</span> Free Delivery</div>
                                <div className="badge"><span className="icon">💳</span> Cash on Delivery</div>
                                <div className="badge"><span className="icon">↩️</span> 7 Days Return</div>
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="pd-card">
                            <h2 className="pd-section-title">Select Size</h2>
                            <div className="pd-size-options">
                                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                    <button 
                                        key={size} 
                                        className={`pd-size-btn ${activeSize === size ? 'active' : ''}`}
                                        onClick={() => setActiveSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {activeSize && (
                                <p className="pd-stock-text">✨ Only a few left in size {activeSize}!</p>
                            )}
                        </div>

                        {/* Inline Actions */}
                        <div className="pd-actions">
                            <button className="pd-btn pd-btn-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                            <button className="pd-btn pd-btn-buy" onClick={() => { addToCart(product); navigate('/cart'); }}>Buy Now</button>
                        </div>

                        {/* Accordions */}
                        <div className="pd-card pd-accordions">
                            {/* Details Accordion */}
                            <div className={`accordion-item ${openAccordion === 'details' ? 'open' : ''}`}>
                                <div className="accordion-header" onClick={() => toggleAccordion('details')}>
                                    <h3>Product Details</h3>
                                    <span className="accordion-icon">➕</span>
                                </div>
                                <div className="accordion-body">
                                    <ul className="details-list">
                                        <li><strong>Name:</strong> {product.title}</li>
                                        <li><strong>Category:</strong> {product.category}</li>
                                        <li><strong>Brand:</strong> {product.brand || 'No Brand'}</li>
                                        <li><strong>Description:</strong> Beautifully crafted {product.title}. Perfect for any occasion. Made with high-quality materials ensuring comfort and durability.</li>
                                        <li><strong>Country of Origin:</strong> India</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Shipping Accordion */}
                            <div className={`accordion-item ${openAccordion === 'shipping' ? 'open' : ''}`}>
                                <div className="accordion-header" onClick={() => toggleAccordion('shipping')}>
                                    <h3>Shipping Information</h3>
                                    <span className="accordion-icon">➕</span>
                                </div>
                                <div className="accordion-body">
                                    <p>Standard delivery within 5-7 business days. Free shipping on all orders!</p>
                                </div>
                            </div>

                            {/* Returns Accordion */}
                            <div className={`accordion-item ${openAccordion === 'returns' ? 'open' : ''}`}>
                                <div className="accordion-header" onClick={() => toggleAccordion('returns')}>
                                    <h3>Return & Exchange Policy</h3>
                                    <span className="accordion-icon">➕</span>
                                </div>
                                <div className="accordion-body">
                                    <p>Easy 7 days return or exchange policy. No questions asked. Just ensure the product is in its original condition with all tags attached.</p>
                                </div>
                            </div>
                        </div>

                        {/* Reviews & Ratings section */}
                        <div className="pd-card">
                            <h2 className="pd-section-title">Ratings & Reviews</h2>
                            <div className="rating-overview">
                                <div className="rating-big">
                                    <h1>{product.rating}</h1>
                                    <p>★ ★ ★ ★ ☆</p>
                                    <span>{product.reviews} Ratings</span>
                                </div>
                                <div className="rating-bars">
                                    <div className="r-bar"><span className="r-label">Excellent</span><div className="bar-track"><div className="bar-fill" style={{width: '70%', background: '#1b9c4a'}}></div></div></div>
                                    <div className="r-bar"><span className="r-label">Very Good</span><div className="bar-track"><div className="bar-fill" style={{width: '20%', background: '#1b9c4a'}}></div></div></div>
                                    <div className="r-bar"><span className="r-label">Good</span><div className="bar-track"><div className="bar-fill" style={{width: '5%', background: '#f5a623'}}></div></div></div>
                                    <div className="r-bar"><span className="r-label">Average</span><div className="bar-track"><div className="bar-fill" style={{width: '3%', background: '#f5a623'}}></div></div></div>
                                    <div className="r-bar"><span className="r-label">Poor</span><div className="bar-track"><div className="bar-fill" style={{width: '2%', background: '#d0021b'}}></div></div></div>
                                </div>
                            </div>

                            <div className="user-reviews">
                                <div className="review-card">
                                    <div className="r-user">👤 Priya Sharma</div>
                                    <div className="r-stars">★★★★★</div>
                                    <p>Amazing quality! Looks exactly like the picture. Very happy with the purchase.</p>
                                </div>
                                <div className="review-card">
                                    <div className="r-user">👤 Anita Verma</div>
                                    <div className="r-stars">★★★★☆</div>
                                    <p>Good product for the price. Fabric is soft and comfortable.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <div className="pd-similar-section">
                        <h2 className="pd-similar-title">People also viewed</h2>
                        <ProductList products={similarProducts} />
                    </div>
                )}
            </div>


        </MainLayout>
    );
};

export default ProductDetail;
