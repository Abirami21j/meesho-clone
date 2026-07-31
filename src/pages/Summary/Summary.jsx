import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Summary.css';
import CheckoutHeader from '@/components/common/CheckoutHeader';
import { CheckoutContext } from '@/context/CheckoutContext';

const Summary = () => {
    const { 
        addresses,
        selectedAddressId,
        selectedPayment,
        getFinalTotal
    } = useContext(CheckoutContext);
    
    const location = useLocation();
    const orderId = location.state?.orderId || `#MSH-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Trigger success animation on mount
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Get the actually selected address object
    const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0] || {};

    return (
        <div className="summary-page">
            <CheckoutHeader activeStep="summary" />

            <div className="container">
                <div className={`success-card ${showConfetti ? 'pop-animation' : ''}`}>
                    <div className="success-icon">✓</div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for shopping with us. Your Order ID is <strong>{orderId}</strong></p>
                </div>

                <div className="summary-card fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="summary-info">
                        <h3>Delivery to: {selectedAddress.name}</h3>
                        <p>{selectedAddress.address}</p>
                        <p style={{ marginTop: '5px' }}>Phone: {selectedAddress.phone}</p>
                        <p style={{ marginTop: '10px' }}>
                            Payment Method: <strong>{selectedPayment === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</strong>
                        </p>
                    </div>
                    <div className="summary-price">
                        Total: ₹{getFinalTotal()}
                    </div>
                </div>

                <div className="tracking-card fade-up" style={{ animationDelay: '0.4s' }}>
                    <h3>Order Tracking</h3>
                    
                    <div className="timeline">
                        <div className="step active">
                            <div className="circle">✓</div>
                            <div className="timeline-text">Order Placed</div>
                            <div className="timeline-date">Just Now</div>
                        </div>
                        
                        <div className="step active current">
                            <div className="circle"></div>
                            <div className="timeline-text">Processing</div>
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

                <Link to="/" className="btn btn-primary continue-btn fade-up" style={{ animationDelay: '0.6s' }}>Continue Shopping</Link>
            </div>
        </div>
    );
};

export default Summary;
