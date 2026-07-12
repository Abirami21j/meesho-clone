import React from 'react';
import { Link } from 'react-router-dom';
import './Summary.css';

import m1 from '../../assets/images/m1.png';

const Summary = () => {
    return (
        <div className="summary-page">
            <div className="header-bar">
                <div className="logo">
                    <Link to="/"><img src={m1} alt="Meesho Logo" /></Link>
                </div>
                <div className="steps">
                    <span>Cart</span>
                    <span>Address</span>
                    <span>Payment</span>
                    <span className="active">Summary</span>
                </div>
            </div>

            <div className="container">
                <div className="success-card">
                    <div className="success-icon">✓</div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for shopping with us. Your Order ID is <strong>#MSH-98765432</strong></p>
                </div>

                <div className="summary-card">
                    <div className="summary-info">
                        <h3>Delivery to: Jane Smith</h3>
                        <p>456 Mockingbird Lane, Building B, Testville, TS, 200002</p>
                        <p style={{ marginTop: '5px' }}>Payment Method: <strong>Cash on Delivery</strong></p>
                    </div>
                    <div className="summary-price">
                        Total: ₹3002
                    </div>
                </div>

                <div className="tracking-card">
                    <h3>Order Tracking</h3>
                    
                    <div className="timeline">
                        <div className="step active">
                            <div className="circle">✓</div>
                            <div className="timeline-text">Order Placed</div>
                            <div className="timeline-date">Today, 10:30 AM</div>
                        </div>
                        
                        <div className="step active current">
                            <div className="circle"></div>
                            <div className="timeline-text">Packed</div>
                            <div className="timeline-date">Expected Tomorrow</div>
                        </div>
                        
                        <div className="step">
                            <div className="circle"></div>
                            <div className="timeline-text">Shipped</div>
                            <div className="timeline-date">Pending</div>
                        </div>
                        
                        <div className="step">
                            <div className="circle"></div>
                            <div className="timeline-text">Delivered</div>
                            <div className="timeline-date">Expected in 3 days</div>
                        </div>
                    </div>
                </div>

                <Link to="/" className="btn-home">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default Summary;
