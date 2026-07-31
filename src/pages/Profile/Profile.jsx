import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Profile.css';
import MainLayout from '@/layouts/MainLayout';
import teamLogo from '@/assets/images/team-logo.jpg';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const Profile = () => {
    const { user, logout, updateProfileData } = useContext(AuthContext);
    const { savedItems } = useCart();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('profile');
    const [toggles, setToggles] = useState({
        notifications: true,
        whatsapp: true,
        profilePrivacy: false
    });
    
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    const fileInputRef = useRef(null);
    const [profilePic, setProfilePic] = useState(teamLogo);

    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        mobile: user?.mobile || '',
        email: user?.email || '',
        dob: user?.dob || '1995-08-15',
        gender: user?.gender || 'female'
    });
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                mobile: user.mobile || '',
                email: user.email || '',
                dob: user.dob || '1995-08-15',
                gender: user.gender || 'female'
            });
        }
    }, [user]);

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async () => {
        if (!user?.uid) return;
        setIsSavingProfile(true);
        const result = await updateProfileData(user.uid, profileData);
        setIsSavingProfile(false);
        if (result.success) {
            alert("Profile updated successfully!");
        } else {
            alert("Error updating profile: " + result.message);
        }
    };

    useEffect(() => {
        if (activeTab === 'orders' && user?.uid) {
            const fetchOrders = async () => {
                setLoadingOrders(true);
                try {
                    // Removed orderBy from query to avoid Firestore composite index requirement
                    const q = query(
                        collection(db, 'orders'),
                        where("userId", "==", user.uid)
                    );
                    const querySnapshot = await getDocs(q);
                    const fetchedOrders = [];
                    querySnapshot.forEach((doc) => {
                        fetchedOrders.push({ id: doc.id, ...doc.data() });
                    });
                    
                    // Sort locally in javascript (newest first)
                    fetchedOrders.sort((a, b) => {
                        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                        return timeB - timeA;
                    });
                    
                    setOrders(fetchedOrders);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoadingOrders(false);
                }
            };
            fetchOrders();
        }
    }, [activeTab, user]);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
    };

    const handleToggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <MainLayout pageClass="profile-page" activeTab="profile" hideFooter hideBottomNav>
                <div className="container sign-in-container animated-signin">
                    <div className="signin-header">
                        <div className="wave-icon">👋</div>
                        <h2 className="signin-title">Welcome to MyStore!</h2>
                        <h4 className="signin-slogan">Smart Shopping, Small Spending.</h4>
                    </div>
                    
                    <p className="signin-desc">Join millions of shoppers who save big every day. Sign in to view your profile, track your orders, and access exclusive deals.</p>
                    
                    <div className="signin-features">
                        <div className="feature-pill"><span className="icon">🚚</span> Free Delivery</div>
                        <div className="feature-pill"><span className="icon">💳</span> Cash on Delivery</div>
                        <div className="feature-pill"><span className="icon">↩️</span> Easy Returns</div>
                    </div>

                    <button className="btn-primary sign-in-btn pulse-btn" onClick={() => navigate('/auth')}>
                        Sign Up / Log In
                    </button>
                    
                    <p className="signin-footer-text">By continuing, you agree to MyStore's Terms of Use and Privacy Policy.</p>
                </div>
            </MainLayout>
        );
    }

    // Tab content renderer
    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return (
                    <div className="tab-pane fade-in">
                        <div className="card">
                            <h3>📦 My Orders</h3>
                            
                            {loadingOrders ? (
                                <p style={{ padding: '20px', textAlign: 'center' }}>Loading your orders...</p>
                            ) : orders.length === 0 ? (
                                <div style={{ padding: '40px 20px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>
                                    <h4 style={{ color: '#555', marginBottom: '10px' }}>No orders found</h4>
                                    <p style={{ color: '#888', marginBottom: '20px' }}>Looks like you haven't placed any orders yet.</p>
                                    <button className="btn-primary" onClick={() => navigate('/')}>Start Shopping</button>
                                </div>
                            ) : (
                                orders.map(order => (
                                    <div key={order.id} className="recent-order-tracker" style={{ marginBottom: '20px' }}>
                                        <div className="tracker-header">
                                            <div className="t-status">Status: {order.status}</div>
                                            <div className="t-id">Order {order.displayOrderId}</div>
                                        </div>
                                        
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="tracker-body" style={{ borderBottom: idx < order.items.length - 1 ? '1px solid #eee' : 'none' }}>
                                                <div className="t-img" style={{ backgroundImage: `url(${item.imgSrc})`, backgroundSize: 'cover' }}></div>
                                                <div className="t-details">
                                                    <h4>{item.title}</h4>
                                                    <p>Qty: {item.qty} | Price: ₹{item.discountedPrice || item.price}</p>
                                                    <button className="btn-outline-small" style={{ marginTop: '10px' }}>Buy Again</button>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <div style={{ padding: '15px', background: '#f9f9f9', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', fontSize: '14px' }}>
                                            <span><strong>Total:</strong> ₹{order.totalAmount}</span>
                                            <span style={{ color: '#666' }}>Placed on: {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Recently'}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                            
                            <div className="lifecycle-grid" style={{ marginTop: '30px' }}>
                                <Link to="#" className="lifecycle-item">
                                    <div className="l-icon">🔄</div><span>Returns & Refunds</span>
                                </Link>
                                <Link to="#" className="lifecycle-item">
                                    <div className="l-icon">⭐</div><span>My Reviews</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            case 'wallet':
                return (
                    <div className="tab-pane fade-in">
                        <div className="card">
                            <h3>💰 Financial Hub</h3>
                            <div className="wallet-banner">
                                <div className="w-info">
                                    <h4>App Wallet Balance</h4>
                                    <p>Available for immediate discounts on next purchase</p>
                                </div>
                                <h2>🪙 ₹450</h2>
                            </div>
                            <div className="item-list">
                                <div className="item-row">
                                    <div className="item-info">
                                        <h4>Saved Bank Accounts</h4>
                                        <p>Mandatory for receiving Instant Cashbacks on COD returns</p>
                                    </div>
                                    <button className="btn-outline">Manage</button>
                                </div>
                                <div className="item-row">
                                    <div className="item-info">
                                        <h4>UPI IDs / Saved Cards</h4>
                                        <p>Securely encrypted tokenized payment pathways</p>
                                    </div>
                                    <button className="btn-outline">Manage</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="tab-pane fade-in">
                        <div className="card">
                            <h3>⚙️ Account Settings</h3>
                            <div className="item-list">
                                <div className="item-row">
                                    <div className="item-info">
                                        <h4>Language Selection</h4>
                                        <p>Switch the app language</p>
                                    </div>
                                    <select className="lang-select">
                                        <option>English</option>
                                        <option>Hindi</option>
                                        <option>Tamil</option>
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
                                        <h4>Privacy Profile</h4>
                                        <p>Hide public reviews from other shoppers</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" checked={toggles.profilePrivacy} onChange={() => handleToggle('profilePrivacy')} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="item-row">
                                    <div className="item-info">
                                        <h4 className="danger-text">Delete Account</h4>
                                        <p>Permanently erase all user data</p>
                                    </div>
                                    <button className="btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'profile':
            default:
                return (
                    <div className="tab-pane fade-in">
                        <div className="card">
                            <h3>👤 Personal Information</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number <span className="verified-badge">✓ Verified</span></label>
                                    <input type="text" name="mobile" value={profileData.mobile} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" name="dob" value={profileData.dob} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="gender" value={profileData.gender} onChange={handleProfileChange}>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <button className="btn-primary mt-4" onClick={handleSaveProfile} disabled={isSavingProfile}>
                                {isSavingProfile ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>

                        <div className="card">
                            <h3>📍 Address Book</h3>
                            <div className="item-list">
                                <div className="item-row">
                                    <div className="item-info">
                                        <h4>{user.name} <span className="address-tag home">Home</span></h4>
                                        <p>456 Mockingbird Lane, Building B, Testville, TS, 200002</p>
                                    </div>
                                    <button className="btn-outline-small">Edit</button>
                                </div>
                                <button className="btn-outline add-address-btn">+ Add New Address</button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <MainLayout pageClass="profile-page" activeTab="profile" hideFooter={false} hideBottomNav={false}>
            <div className="profile-container">
                
                {/* Premium Header */}
                <div className="profile-header-banner">
                    <div className="cover-photo"></div>
                    <div className="header-content">
                        <div className="avatar-wrapper">
                            <img src={profilePic} alt="Avatar" className="profile-avatar" />
                            <div className="avatar-edit" onClick={() => fileInputRef.current.click()}>📷</div>
                            <input 
                                type="file" 
                                accept="image/*" 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                                onChange={handleProfilePicChange} 
                            />
                        </div>
                        <div className="header-user-info">
                            <h1>{user.name} <span className="pro-badge">💎 Pro Member</span></h1>
                            <p>Member since {user.joinedDate || 'Jan 2023'}</p>
                        </div>
                    </div>

                    {/* Dashboard Stats */}
                    <div className="dashboard-stats">
                        <div className="stat-box" onClick={() => setActiveTab('orders')}>
                            <h2>12</h2>
                            <p>Orders</p>
                        </div>
                        <div className="stat-box">
                            <h2>{savedItems.length}</h2>
                            <p>Wishlisted</p>
                        </div>
                        <div className="stat-box" onClick={() => setActiveTab('wallet')}>
                            <h2>₹450</h2>
                            <p>Wallet</p>
                        </div>
                    </div>
                </div>

                <div className="profile-layout">
                    {/* Desktop Sidebar Menu */}
                    <div className="profile-sidebar">
                        <nav className="side-nav">
                            <button className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                                <span className="icon">👤</span> Profile Details
                            </button>
                            <button className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                                <span className="icon">📦</span> My Orders
                            </button>
                            <button className={`nav-btn ${activeTab === 'wallet' ? 'active' : ''}`} onClick={() => setActiveTab('wallet')}>
                                <span className="icon">💰</span> Financial Hub
                            </button>
                            <button className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                                <span className="icon">⚙️</span> Settings
                            </button>
                            <button className="nav-btn logout-btn" onClick={handleLogout}>
                                <span className="icon">🚪</span> Log Out
                            </button>
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="profile-content">
                        {renderContent()}
                    </div>
                </div>

            </div>
        </MainLayout>
    );
};

export default Profile;
