import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const BottomNav = () => {
    const { cartTotalCount } = useCart();
    return (
        <div className="bottom-nav">
            <NavLink to="/" className="nav-item" end>
                <span>🏠</span>
                <p>Home</p>
            </NavLink>
            <NavLink to="/categories" className="nav-item">
                <span>📂</span>
                <p>Categories</p>
            </NavLink>
            <NavLink to="/products" className="nav-item">
                <span>🛍️</span>
                <p>Products</p>
            </NavLink>
            <NavLink to="/cart" className="nav-item" style={{ position: 'relative' }}>
                <span className="icon-wrapper">
                    🛒
                    {cartTotalCount > 0 && <span className="cart-badge-bottom">{cartTotalCount}</span>}
                </span>
                <p>Cart</p>
            </NavLink>
            <NavLink to="/profile" className="nav-item">
                <span>👤</span>
                <p>Profile</p>
            </NavLink>
        </div>
    );
};

export default BottomNav;
