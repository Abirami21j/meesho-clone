import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Summary from './pages/Summary/Summary';
import Payment from './pages/Payment/Payment';
import Address from './pages/Address/Address';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/" element={
          <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Welcome to Meesho Clone React App</h2>
            <p>Here are your converted components:</p>
            <ul style={{ lineHeight: '1.8' }}>
              <li><Link to="/cart">Cart Page</Link></li>
              <li><Link to="/profile">Profile Page</Link></li>
              <li><Link to="/address">Address Page</Link></li>
              <li><Link to="/payment">Payment Page</Link></li>
              <li><Link to="/summary">Summary Page</Link></li>
            </ul>
          </div>
        } />
        <Route path="*" element={<div style={{padding: '20px'}}><h2>404 Not Found</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
