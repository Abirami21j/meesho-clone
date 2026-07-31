import React, { useState } from 'react';
import { categories } from '@/data/index';
import './ProductFilters.css';

const ProductFilters = ({ filters, onFilterChange }) => {
    const [catSearch, setCatSearch] = useState('');
    const [expanded, setExpanded] = useState({ category: true, gender: true, color: true, size: true, fabric: false, price: false, rating: false, occasion: false, combo: false });

    const toggleSection = (section) => {
        setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleCategoryToggle = (catId) => {
        const newCats = filters.categories.includes(catId) 
            ? filters.categories.filter(c => c !== catId)
            : [...filters.categories, catId];
        onFilterChange('categories', newCats);
    };

    const handleGenderToggle = (gender) => {
        const newGenders = filters.genders.includes(gender) 
            ? filters.genders.filter(g => g !== gender)
            : [...filters.genders, gender];
        onFilterChange('genders', newGenders);
    };

    const filteredCats = categories.filter(c => c.name.toLowerCase().includes(catSearch.toLowerCase()));

    const colors = ["Black", "White", "Blue", "Red", "Green", "Pink", "Yellow", "Grey"];
    const sizes = ["S", "M", "L", "XL", "XXL", "Free Size"];
    const genders = ["Boys", "Girls", "Men", "Women"];
    const fabrics = ["Cotton", "Silk", "Polyester", "Denim", "Premium"];
    const prices = ["Under ₹199", "₹200 - ₹499", "₹500 - ₹999", "₹1000+"];
    const ratings = [{label: "4.0 and above", val: 4.0}, {label: "3.0 and above", val: 3.0}, {label: "2.0 and above", val: 2.0}];
    const occasions = ["Casual", "Party", "Formal", "Wedding", "Festive"];
    const combos = ["Pack of 1", "Pack of 2", "Pack of 3", "Pack of 4"];

    return (
        <aside className="product-filters-sidebar">
            <div className="filter-header">
                <h3>FILTERS</h3>
                <span>1000+ Products</span>
            </div>

            {/* Category Section */}
            <div className="filter-section">
                <div className="filter-section-title" onClick={() => toggleSection('category')}>
                    <h4>Category</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded.category ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                {expanded.category && (
                    <div className="filter-section-content">
                        <div className="search-box">
                            <span className="search-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                placeholder="Search" 
                                value={catSearch}
                                onChange={(e) => setCatSearch(e.target.value)}
                            />
                        </div>
                        <div className="checkbox-list">
                            {filteredCats.map(cat => (
                                <label key={cat.id} className="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={filters.categories.includes(cat.id)}
                                        onChange={() => handleCategoryToggle(cat.id)}
                                    />
                                    <span className="checkbox-text">{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Gender Section */}
            <div className="filter-section">
                <div className="filter-section-title" onClick={() => toggleSection('gender')}>
                    <h4>Gender</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded.gender ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                {expanded.gender && (
                    <div className="filter-section-content">
                        <div className="pill-list">
                            {genders.map(g => (
                                <button 
                                    key={g} 
                                    className={`pill-btn ${filters.genders.includes(g) ? 'active' : ''}`}
                                    onClick={() => handleGenderToggle(g)}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Color Section */}
            <div className="filter-section">
                <div className="filter-section-title" onClick={() => toggleSection('color')}>
                    <h4>Color</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded.color ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                {expanded.color && (
                    <div className="filter-section-content">
                        <div className="checkbox-list">
                            {colors.map(color => (
                                <label key={color} className="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={filters.colors.includes(color)}
                                        onChange={() => {
                                            const newColors = filters.colors.includes(color) 
                                                ? filters.colors.filter(c => c !== color)
                                                : [...filters.colors, color];
                                            onFilterChange('colors', newColors);
                                        }}
                                    />
                                    <span className="checkbox-text">{color}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Size Section */}
            <div className="filter-section">
                <div className="filter-section-title" onClick={() => toggleSection('size')}>
                    <h4>Size</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded.size ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                {expanded.size && (
                    <div className="filter-section-content">
                        <div className="pill-list">
                            {sizes.map(size => (
                                <button 
                                    key={size} 
                                    className={`pill-btn ${filters.sizes.includes(size) ? 'active' : ''}`}
                                    onClick={() => {
                                        const newSizes = filters.sizes.includes(size) 
                                            ? filters.sizes.filter(s => s !== size)
                                            : [...filters.sizes, size];
                                        onFilterChange('sizes', newSizes);
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Fabric Section */}
            <div className="filter-section">
                <div className="filter-section-title" onClick={() => toggleSection('fabric')}>
                    <h4>Fabric</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded.fabric ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                {expanded.fabric && (
                    <div className="filter-section-content">
                        <div className="checkbox-list">
                            {fabrics.map(fabric => (
                                <label key={fabric} className="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={filters.fabrics?.includes(fabric)}
                                        onChange={() => {
                                            const newFabrics = filters.fabrics?.includes(fabric) 
                                                ? filters.fabrics.filter(f => f !== fabric)
                                                : [...(filters.fabrics || []), fabric];
                                            onFilterChange('fabrics', newFabrics);
                                        }}
                                    />
                                    <span className="checkbox-text">{fabric}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Price Section */}
            <div className="filter-section">
                <div className="filter-section-title" onClick={() => toggleSection('price')}>
                    <h4>Price</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded.price ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                {expanded.price && (
                    <div className="filter-section-content">
                        <div className="checkbox-list">
                            {prices.map(price => (
                                <label key={price} className="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={filters.prices?.includes(price)}
                                        onChange={() => {
                                            const newPrices = filters.prices?.includes(price) 
                                                ? filters.prices.filter(p => p !== price)
                                                : [...(filters.prices || []), price];
                                            onFilterChange('prices', newPrices);
                                        }}
                                    />
                                    <span className="checkbox-text">{price}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Rating Section */}
            <div className="filter-section">
                <div className="filter-section-title" onClick={() => toggleSection('rating')}>
                    <h4>Rating</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded.rating ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                {expanded.rating && (
                    <div className="filter-section-content">
                        <div className="pill-list">
                            {ratings.map(rating => (
                                <button 
                                    key={rating.label} 
                                    className={`pill-btn ${filters.ratings?.includes(rating.val) ? 'active' : ''}`}
                                    onClick={() => {
                                        const newRatings = filters.ratings?.includes(rating.val) 
                                            ? filters.ratings.filter(r => r !== rating.val)
                                            : [...(filters.ratings || []), rating.val];
                                        onFilterChange('ratings', newRatings);
                                    }}
                                >
                                    {rating.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Occasion Section */}
            <div className="filter-section">
                <div className="filter-section-title" onClick={() => toggleSection('occasion')}>
                    <h4>Occasion</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded.occasion ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                {expanded.occasion && (
                    <div className="filter-section-content">
                        <div className="checkbox-list">
                            {occasions.map(occasion => (
                                <label key={occasion} className="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={filters.occasions?.includes(occasion)}
                                        onChange={() => {
                                            const newOccasions = filters.occasions?.includes(occasion) 
                                                ? filters.occasions.filter(o => o !== occasion)
                                                : [...(filters.occasions || []), occasion];
                                            onFilterChange('occasions', newOccasions);
                                        }}
                                    />
                                    <span className="checkbox-text">{occasion}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Combo Section */}
            <div className="filter-section">
                <div className="filter-section-title" style={{ borderBottom: 'none' }} onClick={() => toggleSection('combo')}>
                    <h4>Combo</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded.combo ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                {expanded.combo && (
                    <div className="filter-section-content">
                        <div className="pill-list">
                            {combos.map(combo => (
                                <button 
                                    key={combo} 
                                    className={`pill-btn ${filters.combos?.includes(combo) ? 'active' : ''}`}
                                    onClick={() => {
                                        const newCombos = filters.combos?.includes(combo) 
                                            ? filters.combos.filter(c => c !== combo)
                                            : [...(filters.combos || []), combo];
                                        onFilterChange('combos', newCombos);
                                    }}
                                >
                                    {combo}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default ProductFilters;
