import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Payment.css';
import m1 from '../../assets/images/m1.png';

const Payment = () => {
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState('cod');
    const [isReselling, setIsReselling] = useState(false);

    return (
        <div className="payment-page">
            <div className="header-bar">
                <div className="logo">
                    <Link to="/"><img src={m1} alt="Meesho Logo" /></Link>
                </div>
                <div className="steps">
                    <span>Cart</span>
                    <span>Address</span>
                    <span className="active">Payment</span>
                    <span>Summary</span>
                </div>
            </div>

            <div className="container">
                <div className="col-left">
                    <div className="title-row">
                        <h2>Select Payment Method</h2>
                    </div>

                    <label className={`payment-card ${selectedPayment === 'cod' ? 'selected' : ''}`}>
                        <div className="payment-info">
                            <span className="payment-price">₹3002</span>
                            <span className="payment-name">Cash on Delivery <span className="icon">💵</span></span>
                        </div>
                        <input 
                            type="radio" 
                            name="payment" 
                            checked={selectedPayment === 'cod'} 
                            onChange={() => setSelectedPayment('cod')}
                        />
                    </label>

                    <label className={`payment-card ${selectedPayment === 'online' ? 'selected' : ''}`} style={{ display: 'block', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div className="payment-info">
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span className="payment-price" style={{ textDecoration: 'line-through', color: '#878787', fontSize: '14px', fontWeight: 'normal' }}>₹3002</span>
                                    <span className="payment-price text-green">₹2620</span>
                                    <span className="save-badge">Save ₹382</span>
                                </div>
                                <span className="payment-name" style={{ marginLeft: '15px' }}>Pay Online <span className="icon">💳</span></span>
                            </div>
                            <input 
                                type="radio" 
                                name="payment" 
                                checked={selectedPayment === 'online'} 
                                onChange={() => setSelectedPayment('online')}
                            />
                        </div>
                        <div className="extra-discount">
                            <span style={{ color: '#038d63' }}>%</span> Extra discount with bank offers
                        </div>
                    </label>

                    <div className="resell-card">
                        <div>
                            <h3>Reselling the order?</h3>
                            <p>Click on 'Yes' to add Final Price</p>
                        </div>
                        <div className="toggle-group">
                            <button 
                                className={`toggle-btn ${!isReselling ? 'active' : ''}`} 
                                onClick={() => setIsReselling(false)}
                            >
                                No
                            </button>
                            <button 
                                className={`toggle-btn ${isReselling ? 'active' : ''}`} 
                                onClick={() => setIsReselling(true)}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-right">
                    <div className="price-card">
                        <h3>Price Details (11 Items)</h3>
                        <div className="row">
                            <span>Product Price</span>
                            <span>+ ₹3126</span>
                        </div>
                        <div className="row text-green">
                            <span>Total Discounts</span>
                            <span>- ₹124</span>
                        </div>
                        <div className="row total">
                            <span>Order Total</span>
                            <span>₹3002</span>
                        </div>
                        <div className="discount-badge">
                            <span>%</span> Yay! Your total discount is ₹124
                        </div>
                        
                        <div className="info-text">
                            Clicking on 'Continue' will not deduct any money
                        </div>
                        
                        <button className="btn-continue" onClick={() => navigate('/summary')}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
