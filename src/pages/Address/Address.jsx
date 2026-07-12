import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Address.css';
import m1 from '../../assets/images/m1.png';

const Address = () => {
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState('jane');

    return (
        <div className="address-page">
            <div className="header-bar">
                <div className="logo">
                    <Link to="/"><img src={m1} alt="Meesho Logo" /></Link>
                </div>
                <div className="steps">
                    <span>Cart</span>
                    <span className="active">Address</span>
                    <span>Payment</span>
                    <span>Summary</span>
                </div>
            </div>

            <div className="container">
                <div className="col-left">
                    <div className="title-row">
                        <h2>Select Delivery Address</h2>
                        <span className="add-new" style={{ cursor: 'pointer' }}>+ ADD NEW ADDRESS</span>
                    </div>

                    <div className={`address-card ${selectedAddress === 'john' ? 'selected' : ''}`}>
                        <input 
                            type="radio" 
                            name="address" 
                            checked={selectedAddress === 'john'} 
                            onChange={() => setSelectedAddress('john')} 
                        />
                        <div className="address-info">
                            <div className="name-row">
                                <h3>John Doe</h3>
                            </div>
                            <p className="address-text">123 Demo Street, Near Test Park, Fake City, DL, 100001</p>
                            <p className="phone">9876543210</p>
                            {selectedAddress === 'john' && (
                                <button className="btn-deliver" onClick={() => navigate('/payment')}>Deliver to this Address</button>
                            )}
                        </div>
                    </div>

                    <div className={`address-card ${selectedAddress === 'jane' ? 'selected' : ''}`}>
                        <input 
                            type="radio" 
                            name="address" 
                            checked={selectedAddress === 'jane'} 
                            onChange={() => setSelectedAddress('jane')} 
                        />
                        <div className="address-info">
                            <div className="name-row">
                                <h3>Jane Smith <span className="tag">Unserviceable</span></h3>
                                <button className="edit-btn">EDIT</button>
                            </div>
                            <p className="address-text">456 Mockingbird Lane, Building B, Testville, TS, 200002</p>
                            <p className="phone">9988776655</p>
                            {selectedAddress === 'jane' && (
                                <button className="btn-deliver" onClick={() => navigate('/payment')}>Deliver to this Address</button>
                            )}
                        </div>
                    </div>

                    <div className={`address-card ${selectedAddress === 'alex' ? 'selected' : ''}`}>
                        <input 
                            type="radio" 
                            name="address" 
                            checked={selectedAddress === 'alex'} 
                            onChange={() => setSelectedAddress('alex')} 
                        />
                        <div className="address-info">
                            <div className="name-row">
                                <h3>Alex Johnson</h3>
                            </div>
                            <p className="address-text">789 Placeholder Avenue, Example Town, EX, 300003</p>
                            <p className="phone">9123456789</p>
                            {selectedAddress === 'alex' && (
                                <button className="btn-deliver" onClick={() => navigate('/payment')}>Deliver to this Address</button>
                            )}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;
