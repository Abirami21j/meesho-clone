import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

const Auth = () => {
    const { login, register, loginWithGoogle, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isLoginView, setIsLoginView] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Login Form State
    const [loginData, setLoginData] = useState({
        emailOrMobile: '',
        password: ''
    });

    // Register Form State
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        // If already logged in, redirect away
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!loginData.emailOrMobile || !loginData.password) {
            setError('Please fill in all fields.');
            return;
        }
        
        setIsSubmitting(true);
        const result = await login(loginData.emailOrMobile, loginData.password);
        setIsSubmitting(false);

        if (result.success) {
            const from = location.state?.from?.pathname || '/profile';
            navigate(from, { replace: true });
        } else {
            setError(result.message);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!registerData.name || !registerData.email || !registerData.mobile || !registerData.password) {
            setError('Please fill in all required fields.');
            return;
        }
        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);
        const result = await register(registerData);
        setIsSubmitting(false);

        if (result.success) {
            const from = location.state?.from?.pathname || '/profile';
            navigate(from, { replace: true });
        } else {
            setError(result.message);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setIsSubmitting(true);
        const result = await loginWithGoogle();
        setIsSubmitting(false);
        if (result.success) {
            const from = location.state?.from?.pathname || '/profile';
            navigate(from, { replace: true });
        } else {
            setError(result.message);
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f8' }}>Loading...</div>;
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h2>{isLoginView ? 'Welcome Back' : 'Create an Account'}</h2>
                    <p>{isLoginView ? 'Sign in to access your profile and orders.' : 'Sign up to unlock a premium shopping experience.'}</p>
                </div>

                <div className="auth-tabs">
                    <button 
                        className={`auth-tab ${isLoginView ? 'active' : ''}`}
                        onClick={() => {setIsLoginView(true); setError('');}}
                    >
                        Log In
                    </button>
                    <button 
                        className={`auth-tab ${!isLoginView ? 'active' : ''}`}
                        onClick={() => {setIsLoginView(false); setError('');}}
                    >
                        Sign Up
                    </button>
                </div>

                {error && <div className="auth-error">{error}</div>}

                {isLoginView ? (
                    <form className="auth-form login-form" onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                name="emailOrMobile" 
                                placeholder="Enter your email"
                                value={loginData.emailOrMobile}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" /> Remember me
                            </label>
                            <span className="forgot-password">Forgot Password?</span>
                        </div>
                        <button type="submit" className="btn btn-primary auth-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging In...' : 'Log In'}
                        </button>
                        
                        <div className="auth-divider">
                            <span>OR</span>
                        </div>
                        <button type="button" className="btn btn-outline auth-google-btn" onClick={handleGoogleLogin} disabled={isSubmitting}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{width: '20px', marginRight: '10px'}} />
                            Continue with Google
                        </button>
                    </form>
                ) : (
                    <form className="auth-form register-form" onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Enter your full name"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter your email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Mobile Number *</label>
                                <input 
                                    type="tel" 
                                    name="mobile" 
                                    placeholder="Enter your mobile"
                                    value={registerData.mobile}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Password *</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Create password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password *</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    placeholder="Confirm password"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary auth-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>

                        <div className="auth-divider">
                            <span>OR</span>
                        </div>
                        <button type="button" className="btn btn-outline auth-google-btn" onClick={handleGoogleLogin} disabled={isSubmitting}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{width: '20px', marginRight: '10px'}} />
                            Continue with Google
                        </button>

                        <p className="auth-terms">By registering, you agree to our <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a>.</p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Auth;
