import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                {/* Column 1 */}
                <div className="footer-col brand-col">
                    <h2>Shop Non-Stop on Meesho</h2>
                    <p className="trusted">Trusted by crores of Indians<br/>Cash on Delivery</p>
                    <div className="app-badges">
                        <img src="https://images.meesho.com/images/pow/playstore-icon-big_400.webp" alt="Google Play" className="app-badge" />
                        <img src="https://images.meesho.com/images/pow/appstore-icon-big_400.webp" alt="App Store" className="app-badge" />
                    </div>
                </div>

                {/* Column 2 */}
                <div className="footer-col links-col">
                    <a href="#">Careers</a>
                    <a href="#">Become a supplier</a>
                    <a href="#">Hall of Fame</a>
                    <a href="#">Sitemap</a>
                </div>

                {/* Column 3 */}
                <div className="footer-col links-col">
                    <a href="#">Legal and Policies</a>
                    <a href="#">Meesho Tech Blog</a>
                    <a href="#">Notices and Returns</a>
                </div>

                {/* Column 4 */}
                <div className="footer-col social-col">
                    <h4>Reach out to us</h4>
                    <div className="social-icons">
                        <img src="https://images.meesho.com/images/pow/facebook.png" alt="Facebook" />
                        <img src="https://images.meesho.com/images/pow/instagram.png" alt="Instagram" />
                        <img src="https://images.meesho.com/images/pow/youtube.png" alt="YouTube" />
                        <img src="https://images.meesho.com/images/pow/linkedin.png" alt="LinkedIn" />
                        <img src="https://images.meesho.com/images/pow/twitter.png" alt="Twitter" />
                    </div>
                </div>

                {/* Column 5 */}
                <div className="footer-col contact-col">
                    <h4>Contact Us</h4>
                    <p>Meesho Technologies Private Limited</p>
                    <p>CIN: U62099KA2024PTC186568</p>
                    <p>3rd Floor, Wing-E, Helios Business Park, Kadubeesanahalli Village, Varthur Hobli, Outer Ring Road Bellandur, Bangalore, Bangalore South, Karnataka, India, 560103</p>
                    <p>E-mail address: query@meesho.com</p>
                    <p>© 2015-2026 Meesho.com</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
