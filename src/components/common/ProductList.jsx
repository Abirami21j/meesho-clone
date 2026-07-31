import React from 'react';
import ProductCard from '@/components/common/ProductCard';

const ProductList = ({ products = [] }) => {
    return (
        <div className="products-container">
            <div className="product-wrapper">
                {products.map(product => (
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        image={product.images[0]} 
                        title={product.title} 
                        price={product.price} 
                        oldPrice={product.originalPrice} 
                        discount={`${product.discount}% OFF`} 
                        rating={product.rating} 
                        reviews={product.reviews} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
