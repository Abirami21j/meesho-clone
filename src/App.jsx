import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Summary from './pages/Summary/Summary';
import Payment from './pages/Payment/Payment';
import Address from './pages/Address/Address';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div style={{padding: '20px'}}><h2>404 Not Found</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
