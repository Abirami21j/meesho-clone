import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import './Cart.css';
import MainLayout from '@/layouts/MainLayout';

import m1 from '@/assets/images/m1.png';
import anarkaliDress from '@/assets/images/anarkali dress.png';
import mensDress from '@/assets/images/mens dress.png';
import airpods from '@/assets/images/airpods.png';
import watchImage from '@/assets/images/watch image .png';
import kidsDress from '@/assets/images/kids dress .png';
import light from '@/assets/images/light.png';
import handbag from '@/assets/images/handbag.png';
import neckless from '@/assets/images/neckless.png';
import specs from '@/assets/images/specs.png';
import diamondEarings from '@/assets/images/diamond earings.png';

// Removed static initialCartItems

const recentlyViewed = [
    {
        id: 101,
        title: "Crystal Chandelier",
        originalPrice: 5000,
        discountedPrice: 2499,
        discountText: "50% off",
        imgSrc: light,
        available: true
    },
    {
        id: 102,
        title: "Designer Leather Handbag",
        originalPrice: 3999,
        discountedPrice: 1299,
        discountText: "67% off",
        imgSrc: handbag,
        available: true
    },
    {
        id: 103,
        title: "Gold Plated Necklace Set",
        originalPrice: 0,
        discountedPrice: 0,
        discountText: "",
        imgSrc: neckless,
        available: false
    },
    {
        id: 104,
        title: "Vintage Aviator Sunglasses",
        originalPrice: 1500,
        discountedPrice: 499,
        discountText: "66% off",
        imgSrc: specs,
        available: true
    },
    {
        id: 105,
        title: "Diamond Stud Earrings",
        originalPrice: 8000,
        discountedPrice: 3999,
        discountText: "50% off",
        imgSrc: diamondEarings,
        available: true
    }
];

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, savedItems, updateQty, removeFromCart, addToCart, saveForLater, moveToCart, cartTotalCount } = useCart();

    // Calculate totals
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalOriginalPrice = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.qty), 0);
    const totalDiscountedPrice = cartItems.reduce((acc, item) => acc + (item.discountedPrice * item.qty), 0);
    
    const discountAmount = totalOriginalPrice - totalDiscountedPrice;
    const platformFees = cartItems.length > 0 ? 9 : 0;
    const totalAmount = totalDiscountedPrice + platformFees;

    return (
        <MainLayout pageClass="cart-page" activeTab="cart" hideBottomNav>
            <div className="container">
                <div className="flex">
                    <div className="col-left">

                        <div className="card">
                            {cartItems.map(item => (
                                <div className="cart-item" key={item.id}>
                                    <img className="img-box" src={item.imgSrc} alt={item.title} />
                                    <div className="info" style={{ width: '100%' }}>
                                        <h3>{item.title}</h3>
                                        <span className="text-sm">{item.category}</span>
                                        <div>
                                            <span className="text-green">{item.discountText}</span>
                                            <span className="strike">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                                            <span className="price">₹{item.discountedPrice.toLocaleString('en-IN')}</span>
                                        </div>
                                        <p className="text-blue">{item.offerText}</p>
                                        <select value={item.qty} onChange={(e) => updateQty(item.id, e.target.value)}>
                                            <option value="1">Qty: 1</option>
                                            <option value="2">Qty: 2</option>
                                            <option value="3">Qty: 3</option>
                                            <option value="4">Qty: 4</option>
                                            <option value="5">Qty: 5</option>
                                        </select>
                                        <div className="actions">
                                            <button className="btn btn-secondary" onClick={() => saveForLater(item.id)}>Save for later</button>
                                            <button className="btn btn-secondary" onClick={() => removeFromCart(item.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {cartItems.length === 0 && (
                                <div style={{ padding: '20px', textAlign: 'center' }}>Your cart is empty.</div>
                            )}

                            {savedItems && savedItems.length > 0 && (
                                <div style={{ marginTop: '30px' }}>
                                    <h3 style={{ padding: '0 20px 10px', fontSize: '16px' }}>Saved For Later ({savedItems.length})</h3>
                                    <hr />
                                    {savedItems.map(item => (
                                        <div className="cart-item" key={item.id}>
                                            <img className="img-box" src={item.imgSrc} alt={item.title} />
                                            <div className="info" style={{ width: '100%' }}>
                                                <h3>{item.title}</h3>
                                                <span className="text-sm">{item.category}</span>
                                                <div>
                                                    <span className="price">₹{item.discountedPrice.toLocaleString('en-IN')}</span>
                                                </div>
                                                <div className="actions" style={{ marginTop: '15px' }}>
                                                    <button className="btn btn-secondary" onClick={() => moveToCart(item.id)}>Move to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-right card">
                        <h3 className="text-sm" style={{ textTransform: 'uppercase' }}>Price Details</h3><hr />
                        <div className="price-row"><span>Price ({totalItems} items)</span><span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span></div>
                        <div className="price-row"><span>Discount</span><span className="text-green">- ₹{discountAmount.toLocaleString('en-IN')}</span></div>
                        <div className="price-row"><span>Platform Fees</span><span>₹{platformFees}</span></div>
                        <div className="price-row"><span>Delivery Charges</span><span className="text-green">Free</span></div><hr />
                        <div className="price-row price"><span>Total Amount</span><span>₹{totalAmount.toLocaleString('en-IN')}</span></div><hr />
                        
                        {discountAmount > 0 && (
                            <p className="text-green" style={{ marginBottom: '15px' }}>
                                You will save ₹{discountAmount.toLocaleString('en-IN')} on this order
                            </p>
                        )}
                        <p className="text-sm">Safe & secure payments. 100% Authentic products.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/address')} disabled={cartItems.length === 0}>Place Order</button>
                    </div>
                </div>

                <div className="card" style={{ marginTop: '5px' }}>
                    <h2 style={{ padding: '20px 20px 0' }}>Fancy Things (Recently Viewed)</h2>
                    <div className="scroll-grid">
                        {recentlyViewed.map(item => (
                            <div className="grid-card" key={item.id}>
                                <img src={item.imgSrc} alt={item.title} />
                                <h4>{item.title}</h4>
                                {item.available ? (
                                    <>
                                        <span className="price">₹{item.discountedPrice.toLocaleString('en-IN')}</span> 
                                        <span className="strike">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                                        <p className="text-green">{item.discountText}</p>
                                        <button className="btn btn-outline" onClick={() => addToCart({
                                            ...item,
                                            price: item.discountedPrice,
                                            image: item.imgSrc,
                                            discount: parseInt(item.discountText) || 0
                                        })}>Add to cart</button>
                                    </>
                                ) : (
                                    <p style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>Currently unavailable</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Cart;
