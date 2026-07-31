import React from 'react';
import { Link } from 'react-router-dom';
import m1 from '@/assets/images/m1.png';

const CheckoutHeader = ({ activeStep }) => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h2>meesho</h2>
                </Link>
            </div>
            <div className="steps">
                <span className={activeStep === 'cart' ? 'active' : ''}>Cart</span>
                <span className={activeStep === 'address' ? 'active' : ''}>Address</span>
                <span className={activeStep === 'payment' ? 'active' : ''}>Payment</span>
                <span className={activeStep === 'summary' ? 'active' : ''}>Summary</span>
            </div>
        </header>
    );
};

export default CheckoutHeader;
