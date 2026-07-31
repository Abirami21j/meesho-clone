import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';

const MainLayout = ({ children, pageClass, activeTab, hideFooter = false, hideBottomNav = false }) => {
    return (
        <div className={pageClass} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar variant={pageClass} />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="page-enter">
                    {children}
                </div>
            </main>
            {!hideFooter && <Footer variant={pageClass} />}
            {!hideBottomNav && <BottomNav variant={pageClass} activeTab={activeTab} />}
        </div>
    );
};

export default MainLayout;
