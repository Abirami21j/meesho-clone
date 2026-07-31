import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import CheckoutHeader from '@/components/common/CheckoutHeader';
import { CheckoutContext } from '@/context/CheckoutContext';
import { AuthContext } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Payment = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { cartItems, clearCart } = useCart();
    
    const { 
        selectedAddressId,
        addresses,
        selectedPayment, 
        setSelectedPayment,
        appliedCoupon,
        setAppliedCoupon,
        cartBaseTotal,
        initialDiscounts,
        getFinalTotal 
    } = useContext(CheckoutContext);

    const [isReselling, setIsReselling] = useState(false);
    const [couponInput, setCouponInput] = useState('');
    const [couponError, setCouponError] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;
        
        const code = couponInput.trim().toUpperCase();
        
        // Match 7 digit alphanumeric code
        if (/^[A-Z0-9]{7}$/.test(code)) {
            // Calculate 5% of the discounted total
            const discountedTotal = cartBaseTotal - initialDiscounts;
            const discountAmount = Math.floor(discountedTotal * 0.05);
            setAppliedCoupon({ code, discountAmount });
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code. Please enter a valid 7-character code.');
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponInput('');
    };

    const handlePlaceOrder = async () => {
        if (!user) {
            alert('Please login to place an order.');
            navigate('/auth');
            return;
        }

        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            navigate('/cart');
            return;
        }

        setIsPlacingOrder(true);
        
        const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
        const displayOrderId = `#MSH-${Math.floor(10000000 + Math.random() * 90000000)}`;

        // Recursively strip undefined values as Firestore throws errors on them
        const stripUndefined = (obj) => {
            if (Array.isArray(obj)) {
                return obj.map(v => (v && typeof v === 'object' ? stripUndefined(v) : v));
            }
            if (obj !== null && typeof obj === 'object') {
                // Do not strip Firestore FieldValue objects (like serverTimestamp)
                if (obj._methodName === 'serverTimestamp') return obj;
                
                return Object.entries(obj).reduce((acc, [key, value]) => {
                    if (value !== undefined) {
                        acc[key] = (value && typeof value === 'object') ? stripUndefined(value) : value;
                    }
                    return acc;
                }, {});
            }
            return obj;
        };

        const orderData = stripUndefined({
            userId: user.uid,
            displayOrderId,
            items: cartItems,
            address: selectedAddress,
            paymentMethod: selectedPayment,
            coupon: appliedCoupon || null,
            totalAmount: getFinalTotal(),
            status: 'Processing',
            createdAt: serverTimestamp()
        });

        try {
            await addDoc(collection(db, 'orders'), orderData);
            clearCart();
            navigate(`/summary`, { state: { orderId: displayOrderId } });
        } catch (error) {
            console.error("Error placing order:", error);
            alert("There was an error placing your order. Please try again.");
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="payment-page">
            <CheckoutHeader activeStep="payment" />

            <div className="container">
                <div className="col-left">
                    <div className="title-row">
                        <h2>Select Payment Method</h2>
                    </div>

                    <label className={`payment-card ${selectedPayment === 'cod' ? 'selected' : ''}`}>
                        <div className="payment-info">
                            <span className="payment-price">₹{cartBaseTotal - initialDiscounts - (appliedCoupon ? appliedCoupon.discountAmount : 0)}</span>
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
                                    <span className="payment-price" style={{ textDecoration: 'line-through', color: '#878787', fontSize: '14px', fontWeight: 'normal' }}>₹{cartBaseTotal - initialDiscounts - (appliedCoupon ? appliedCoupon.discountAmount : 0)}</span>
                                    <span className="payment-price text-green">₹{cartBaseTotal - initialDiscounts - (appliedCoupon ? appliedCoupon.discountAmount : 0) - 50}</span>
                                    <span className="save-badge">Save ₹50 extra</span>
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
                            <span style={{ color: '#038d63' }}>%</span> Extra ₹50 discount with online payment
                        </div>
                    </label>

                    <div className="coupon-card">
                        <h3>Apply Coupon</h3>
                        {appliedCoupon ? (
                            <div className="applied-coupon">
                                <div>
                                    <span className="coupon-code">{appliedCoupon.code}</span>
                                    <span className="coupon-savings">Saved ₹{appliedCoupon.discountAmount}</span>
                                </div>
                                <button className="remove-btn" onClick={handleRemoveCoupon}>Remove</button>
                            </div>
                        ) : (
                            <div className="coupon-input-group">
                                <input 
                                    type="text" 
                                    placeholder="Enter 7-character code (e.g. SAVE123)" 
                                    value={couponInput}
                                    onChange={(e) => setCouponInput(e.target.value)}
                                    maxLength={7}
                                />
                                <button className="btn btn-outline apply-btn" onClick={handleApplyCoupon}>Apply</button>
                            </div>
                        )}
                        {couponError && <div className="coupon-error">{couponError}</div>}
                    </div>

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
                        <h3>Price Details</h3>
                        <div className="row">
                            <span>Product Price</span>
                            <span>+ ₹{cartBaseTotal}</span>
                        </div>
                        <div className="row text-green">
                            <span>Total Discounts</span>
                            <span>- ₹{initialDiscounts}</span>
                        </div>
                        {appliedCoupon && (
                            <div className="row text-green">
                                <span>Coupon ({appliedCoupon.code})</span>
                                <span>- ₹{appliedCoupon.discountAmount}</span>
                            </div>
                        )}
                        {selectedPayment === 'online' && (
                            <div className="row text-green">
                                <span>Online Payment Discount</span>
                                <span>- ₹50</span>
                            </div>
                        )}
                        <div className="row total">
                            <span>Order Total</span>
                            <span>₹{getFinalTotal()}</span>
                        </div>
                        <div className="discount-badge">
                            <span>%</span> Yay! Your total discount is ₹{initialDiscounts + (appliedCoupon ? appliedCoupon.discountAmount : 0) + (selectedPayment === 'online' ? 50 : 0)}
                        </div>
                        
                        <div className="info-text">
                            Clicking on 'Place Order' will instantly process your order securely.
                        </div>
                        
                        <button 
                            className="btn btn-primary" 
                            style={{ width: '100%', marginTop: '15px', opacity: isPlacingOrder ? 0.7 : 1 }} 
                            onClick={handlePlaceOrder}
                            disabled={isPlacingOrder}
                        >
                            {isPlacingOrder ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
