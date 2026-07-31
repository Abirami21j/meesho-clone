import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ProductList from '@/components/common/ProductList';
import ProductFilters from '@/components/products/ProductFilters';
import { DataContext } from '@/context/DataContext';
import './Products.css'; 

const Products = () => {
    const { allProducts, categories, loadingData } = useContext(DataContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get('category');
    const currentSearch = searchParams.get('search');
    
    const [filters, setFilters] = useState({
        categories: currentCategory ? [currentCategory] : [],
        genders: [],
        colors: [],
        sizes: [],
        fabrics: [],
        prices: [],
        ratings: [],
        occasions: [],
        combos: []
    });

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (allProducts.length > 0) {
            setFilteredProducts(allProducts);
        }
    }, [allProducts]);

    const handleFilterChange = (filterType, newValues) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: newValues
        }));
    };

    useEffect(() => {
        let result = allProducts;
        
        // 1. Search Query Filter
        if (currentSearch) {
            const lowerSearch = currentSearch.toLowerCase();
            result = result.filter(p => 
                p.title.toLowerCase().includes(lowerSearch) || 
                p.brand.toLowerCase().includes(lowerSearch) ||
                p.category.toLowerCase().includes(lowerSearch)
            );
        }

        // 2. Categories Filter
        if (filters.categories.length > 0) {
            result = result.filter(p => filters.categories.includes(p.category));
        }

        // 3. Gender Filter (Derived)
        if (filters.genders.length > 0) {
            result = result.filter(p => {
                const cat = p.category;
                if (filters.genders.includes('Women') && (cat === 'women' || cat === 'beauty' || cat === 'jewellery')) return true;
                if (filters.genders.includes('Men') && (cat === 'men')) return true;
                if (filters.genders.includes('Boys') && cat === 'kids') return true;
                if (filters.genders.includes('Girls') && cat === 'kids') return true;
                return false;
            });
        }

        // 4. Color Filter
        if (filters.colors.length > 0) {
            result = result.filter(p => p.colors && p.colors.some(c => filters.colors.includes(c)));
        }

        // 5. Size Filter
        if (filters.sizes.length > 0) {
            result = result.filter(p => p.sizes && p.sizes.some(s => filters.sizes.includes(s)));
        }

        // 6. Fabric Filter
        if (filters.fabrics.length > 0) {
            result = result.filter(p => p.specifications?.material && filters.fabrics.includes(p.specifications.material));
        }

        // 7. Occasion Filter
        if (filters.occasions.length > 0) {
            result = result.filter(p => p.specifications?.occasion && filters.occasions.includes(p.specifications.occasion));
        }

        // 8. Rating Filter
        if (filters.ratings.length > 0) {
            const minRating = Math.min(...filters.ratings);
            result = result.filter(p => parseFloat(p.rating) >= minRating);
        }

        // 9. Price Filter
        if (filters.prices.length > 0) {
            result = result.filter(p => {
                return filters.prices.some(priceRange => {
                    if (priceRange === 'Under ₹199') return p.price < 199;
                    if (priceRange === '₹200 - ₹499') return p.price >= 200 && p.price <= 499;
                    if (priceRange === '₹500 - ₹999') return p.price >= 500 && p.price <= 999;
                    if (priceRange === '₹1000+') return p.price >= 1000;
                    return false;
                });
            });
        }
        
        setFilteredProducts(result);
    }, [filters, currentSearch, allProducts]);

    if (loadingData) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f8' }}>Loading Products...</div>;
    }

    return (
        <MainLayout pageClass="Products-page" activeTab="products">
            <div className="products-layout-container">
                <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
                
                <section className="products-main-content">
                    <h2 className="product-title" style={{ marginBottom: '20px' }}>
                        {currentSearch ? `Search Results for "${currentSearch}"` : 'All Products'}
                        <span style={{ fontSize: '16px', fontWeight: 'normal', color: 'gray', marginLeft: '10px' }}>
                            Showing {filteredProducts.length} items
                        </span>
                    </h2>
                    
                    {filteredProducts.length > 0 ? (
                        <ProductList products={filteredProducts} />
                    ) : (
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <h3>No products found</h3>
                            <p>Try clearing your filters or searching for something else.</p>
                            <button 
                                onClick={() => {
                                    setSearchParams({});
                                    setFilters({ categories: [], genders: [], colors: [], sizes: [] });
                                }} 
                                className="btn btn-primary" 
                                style={{ marginTop: '20px' }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </MainLayout>
    );
};

export default Products;
