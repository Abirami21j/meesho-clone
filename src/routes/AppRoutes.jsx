import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Categories from '@/pages/Categories/Categories';
import Products from '@/pages/Products/Products';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';
import Cart from '@/pages/Cart/Cart';
import Profile from '@/pages/Profile/Profile';
import Address from '@/pages/Address/Address';
import Payment from '@/pages/Payment/Payment';
import Summary from '@/pages/Summary/Summary';
import Auth from '@/pages/Auth/Auth';
import Seed from '@/pages/Seed/Seed';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/address" element={<Address />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/seed" element={<Seed />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
