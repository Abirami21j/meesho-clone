import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ id, image, title, price, oldPrice, discount, rating, reviews }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleClick = () => {
        if (id) {
            navigate(`/product/${id}`);
        }
    };

    const handleActionClick = (e, action) => {
        e.stopPropagation();
        if (action === 'add') {
            addToCart({ id, title, price, originalPrice: oldPrice, discount: parseInt(discount), image, category: 'Product' });
        } else if (action === 'buy') {
            addToCart({ id, title, price, originalPrice: oldPrice, discount: parseInt(discount), image, category: 'Product' });
            navigate('/cart');
        }
    };

    return (
        <div className="product-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img src={image} alt={title} />
            <h3>{title}</h3>

            <div className="price">
                ₹{price}
                <span className="old-price">₹{oldPrice}</span>
                <span className="discount">{discount}</span>
            </div>

            <div className="rating-container">
                <div className="rating">{rating} ★</div>
                <div className="reviews">{reviews} Reviews</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                <button className="btn btn-outline" onClick={(e) => handleActionClick(e, 'add')}>Add to Cart</button>
                <button className="btn btn-primary" onClick={(e) => handleActionClick(e, 'buy')}>Buy Now</button>
            </div>
        </div>
    );
};

export default ProductCard;
