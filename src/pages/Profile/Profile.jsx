import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import m1 from '../../assets/images/m1.png';
import teamLogo from '../../assets/images/team-logo.jpg';

const Profile = () => {
    const [toggles, setToggles] = useState({
        notifications: true,
        whatsapp: true,
        profilePrivacy: false
    });

    const handleToggle = (key) => {
        setToggles(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            console.log(`${key} has been ${newState[key] ? 'Enabled' : 'Disabled'}.`);
            return newState;
        });
    };

    return (
        <div className="profile-page">
            <header>
                <div className="logo">
                    <Link to="/"><img src={m1} alt="Meesho Logo" /></Link>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="Try Saree, Kurti or Search by Product Code" />
                </div>
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/profile" className="active">Profile</Link>
                </nav>
            </header>

            <div className="container">
                {/* 1. Core Profile Details */}
                <div className="card">
                    <h3>👤 Core Profile Details</h3>
                    <div className="profile-header">
                        <div className="avatar-container">
                            <img src={teamLogo} alt="Avatar" className="avatar" id="profileImage" />
                            <div className="avatar-upload" onClick={() => alert('Upload functionality would open file picker here.')}>📷</div>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '20px', marginBottom: '5px' }}>Jane Doe</h2>
                            <p style={{ color: 'var(--tl)', fontSize: '14px' }}>Member since Jan 2023</p>
                        </div>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" defaultValue="Jane Doe" />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number <span className="verified-badge">✓ Verified</span></label>
                            <input type="text" defaultValue="+91 9988776655" readOnly style={{ background: '#f9f9f9' }} />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" defaultValue="jane.doe@example.com" placeholder="Enter email for notifications" />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" defaultValue="1995-08-15" />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select defaultValue="female">
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn" style={{ marginTop: '20px' }} onClick={() => alert('Profile details saved successfully!')}>Save Profile</button>
                </div>

                {/* 2. Order & Shopping Lifecycle */}
                <div className="card">
                    <h3>📦 Shopping Lifecycle</h3>
                    <div className="lifecycle-grid">
                        <Link to="#" className="lifecycle-item" onClick={() => alert('Opening My Orders...')}>
                            <div className="lifecycle-icon">🛍️</div>
                            <div className="lifecycle-title">My Orders</div>
                        </Link>
                        <Link to="#" className="lifecycle-item" onClick={() => alert('Opening Returns & Refunds...')}>
                            <div className="lifecycle-icon">🔄</div>
                            <div className="lifecycle-title">Returns & Refunds</div>
                        </Link>
                        <Link to="#" className="lifecycle-item" onClick={() => alert('Opening Wishlist...')}>
                            <div className="lifecycle-icon">❤️</div>
                            <div className="lifecycle-title">Wishlist / Liked</div>
                        </Link>
                        <Link to="#" className="lifecycle-item" onClick={() => alert('Opening My Reviews...')}>
                            <div className="lifecycle-icon">⭐</div>
                            <div className="lifecycle-title">My Reviews</div>
                        </Link>
                    </div>
                </div>

                {/* 3. Financial & Payout Hub */}
                <div className="card">
                    <h3>💰 Financial & Payout Hub</h3>
                    <div className="item-list">
                        <div className="item-row" style={{ background: '#fff0f5', padding: '15px', borderRadius: '8px', border: '1px solid #ffe4e1', marginBottom: '10px' }}>
                            <div className="item-info">
                                <h4 style={{ color: 'var(--p)' }}>App Wallet / Coin Balance</h4>
                                <p>Available for immediate discounts</p>
                            </div>
                            <h2 style={{ color: 'var(--p)' }}>🪙 450</h2>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Saved Bank Accounts</h4>
                                <p>Mandatory for receiving Instant Cashbacks on COD returns</p>
                            </div>
                            <button className="btn-outline" onClick={() => alert('Add Bank Account window opened.')}>Manage</button>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4>UPI IDs / Saved Cards</h4>
                                <p>Securely encrypted tokenized payment pathways</p>
                            </div>
                            <button className="btn-outline" onClick={() => alert('Manage UPI/Cards window opened.')}>Manage</button>
                        </div>
                    </div>
                </div>

                {/* 4. Location & Address Book */}
                <div className="card">
                    <h3>📍 Location & Address Book</h3>
                    <div className="item-list">
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Jane Smith <span className="address-tag home">Home (Default)</span></h4>
                                <p>456 Mockingbird Lane, Building B, Testville, TS, 200002</p>
                            </div>
                            <button className="btn-outline" onClick={() => alert('Edit Address window opened.')}>Edit</button>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Jane Smith <span className="address-tag">Work</span></h4>
                                <p>Tech Park Phase 2, Floor 4, Example City, EX, 300003</p>
                            </div>
                            <button className="btn-outline" onClick={() => alert('Edit Address window opened.')}>Edit</button>
                        </div>
                    </div>
                    <button className="btn" style={{ marginTop: '15px', width: '100%' }} onClick={() => alert('Add New Address window opened.')}>+ Add New Address</button>
                </div>

                {/* 5. App & Account Settings */}
                <div className="card">
                    <h3>⚙️ App & Account Settings</h3>
                    <div className="item-list">
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Language Selection</h4>
                                <p>Switch the app language</p>
                            </div>
                            <select style={{ padding: '5px 10px', border: '1px solid var(--bc)', borderRadius: '4px', outline: 'none' }}>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Tamil</option>
                                <option>Telugu</option>
                            </select>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Notification Preferences</h4>
                                <p>Order updates, daily deals, price drops</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={toggles.notifications} onChange={() => handleToggle('notifications')} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4>WhatsApp Alerts</h4>
                                <p>Receive order tracking on WhatsApp</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={toggles.whatsapp} onChange={() => handleToggle('whatsapp')} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Security & Password</h4>
                                <p>Change login PIN, password, or Biometrics</p>
                            </div>
                            <button className="btn-outline" onClick={() => alert('Opening Security Settings...')}>Update</button>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Manage Devices</h4>
                                <p>Active devices: 2 (iPhone 13, Windows PC)</p>
                            </div>
                            <button className="btn-outline" onClick={() => alert('Successfully logged out of all other devices.')}>Log Out All</button>
                        </div>
                    </div>
                </div>

                {/* 6. Privacy & Account Control */}
                <div className="card">
                    <h3>🛡️ Privacy & Account Control</h3>
                    <div className="item-list">
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Profile Privacy</h4>
                                <p>Hide public reviews and wishlist from other shoppers</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={toggles.profilePrivacy} onChange={() => handleToggle('profilePrivacy')} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Clear Cache / App Data</h4>
                                <p>Wipe temporary app files to help the app run faster</p>
                            </div>
                            <button className="btn-outline" onClick={() => alert('Cache cleared successfully! 45MB freed.')}>Clear Data</button>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4>Deactivate Account</h4>
                                <p>Temporarily pause your profile without losing order history</p>
                            </div>
                            <button className="btn-outline" onClick={() => alert('Are you sure you want to deactivate?')}>Deactivate</button>
                        </div>
                        <div className="item-row">
                            <div className="item-info">
                                <h4 style={{ color: '#d32f2f' }}>Delete Account</h4>
                                <p>Permanently erase all user data (cannot be undone)</p>
                            </div>
                            <button className="btn-danger" onClick={() => { if(window.confirm('Are you ABSOLUTELY sure you want to permanently delete your account? This action cannot be undone.')) alert('Account deletion requested.') }}>Delete</button>
                        </div>
                    </div>
                </div>

                {/* 7. About & Legal Information */}
                <div className="legal-footer">
                    <div className="legal-links">
                        <Link to="#" onClick={() => alert('Loading Terms of Service...')}>Terms of Service</Link>
                        <Link to="#" onClick={() => alert('Loading Privacy Policy...')}>Privacy Policy</Link>
                        <Link to="#" onClick={() => alert('Loading Open Source Licenses...')}>Open Source Licenses</Link>
                    </div>
                    <p className="app-version">Meesho Clone App - Version 4.12.0 Build 8472</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
