import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileSearchTerm, setMobileSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Check if user is logged in and get user info
    const isLoggedIn = !!user;

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            navigate('/login');
        }
    };

    const handleSearch = (term) => {
        if (term.trim()) {
            navigate(`/auctions?search=${encodeURIComponent(term.trim())}`);
        } else {
            navigate('/auctions');
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    const handleMobileSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(mobileSearchTerm);
        setIsMobileMenuOpen(false); // Close mobile menu after search
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleMobileLogout = async () => {
        try {
            await logout();
            setIsMobileMenuOpen(false);
            navigate('/login');
        } catch (error) {
            setIsMobileMenuOpen(false);
            navigate('/login');
        }
    };

    return (
        <nav className="shadow-lg backdrop-blur-sm border-b-2" style={{
            background: 'var(--bg-primary)',
            borderBottomColor: 'var(--accent-primary)',
            boxShadow: '0 2px 12px rgba(210, 105, 30, 0.15)',
            color: 'var(--text-primary)'
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo/Brand */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300" style={{
                                background: 'var(--gradient-primary)',
                                boxShadow: '0 3px 12px rgba(210, 105, 30, 0.4)'
                            }}>
                                <img className="text-2xl" src='logo.png' />
                            </div>
                            <span className="text-2xl font-bold text-gradient">AuctionHub</span>
                        </Link>
                    </div>


                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">

                        {/* Main Navigation */}
                        <div className="hidden md:flex space-x-6">
                            <Link
                                to="/"
                                className="relative px-4 py-2 font-medium transition-colors duration-300 hover:text-orange-600 group"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Home
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                            </Link>
                            <Link
                                to="/auctions"
                                className="relative px-4 py-2 font-medium transition-colors duration-300 hover:text-orange-600 group"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Auctions
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                            </Link>

                        </div>

                        {/* User Section */}
                        <div className="flex items-center space-x-4">
                            {isLoggedIn ? (
                                <>
                                    {/* Logout Button - Desktop Only */}
                                    <button
                                        onClick={handleLogout}
                                        className="hidden md:block btn btn-secondary hover:shadow-lg px-6 py-2 rounded-xl transition-all duration-300 font-medium transform hover:scale-105 border"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                /* Login Button */
                                <Link
                                    to="/login"
                                    className="btn btn-primary hover:shadow-lg px-6 py-2 rounded-xl transition-all duration-300 font-medium transform hover:scale-105"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-lg transition-all duration-300"
                                style={{
                                    color: 'var(--text-primary)',
                                    background: isMobileMenuOpen ? 'var(--surface-hover)' : 'transparent'
                                }}
                            >
                                <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Mobile Side Menu */}
            <div className={`fixed top-0 left-0 h-full w-3/5 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`} style={{ background: 'var(--bg-primary)' }}>

                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b-2" style={{ borderBottomColor: 'var(--accent-primary)' }}>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                            background: 'var(--gradient-primary)',
                            boxShadow: '0 3px 12px rgba(210, 105, 30, 0.4)'
                        }}>
                            <span className="text-lg">🏛️</span>
                        </div>
                        <span className="text-lg font-bold text-gradient">Menu</span>
                    </div>
                    <button
                        onClick={closeMobileMenu}
                        className="p-2 rounded-lg transition-all duration-300"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        <span className="text-xl">✕</span>
                    </button>
                </div>

                {/* Menu Content */}
                <div className="p-4 space-y-4 h-full overflow-y-auto">

                    {/* Search Bar */}
                    <form onSubmit={handleMobileSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search auctions..."
                            value={mobileSearchTerm}
                            onChange={(e) => setMobileSearchTerm(e.target.value)}
                            className="input w-full px-4 py-3 rounded-xl border-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 backdrop-blur-sm transition-all duration-300 text-sm"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-3 transition-colors"
                            style={{ color: 'var(--accent-primary)' }}
                        >
                            🔍
                        </button>
                    </form>

                    {/* Navigation Links */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                            Navigation
                        </h3>
                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                            style={{
                                color: 'var(--text-primary)',
                                background: 'var(--surface-primary)',
                                border: '1px solid var(--border-primary)'
                            }}
                        >
                            <span className="text-lg">🏠</span>
                            <span>Home</span>
                        </Link>
                        <Link
                            to="/auctions"
                            onClick={closeMobileMenu}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                            style={{
                                color: 'var(--text-primary)',
                                background: 'var(--surface-primary)',
                                border: '1px solid var(--border-primary)'
                            }}
                        >
                            <span className="text-lg">🏛️</span>
                            <span>Auctions</span>
                        </Link>
                    </div>

                    {/* User Section */}
                    <div className="pt-4 border-t" style={{ borderTopColor: 'var(--border-secondary)' }}>
                        <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
                            Account
                        </h3>
                        {isLoggedIn ? (
                            <div className="space-y-3">
                                <div className="px-4 py-3 rounded-lg" style={{ background: 'var(--surface-hover)' }}>
                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Logged in as:</p>
                                    <p className="font-medium flex items-center space-x-2" style={{ color: 'var(--accent-primary)' }}>
                                        <span>👤</span>
                                        <span>{user}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={handleMobileLogout}
                                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                                    style={{
                                        background: 'var(--accent-primary)',
                                        color: 'var(--bg-primary)'
                                    }}
                                >
                                    <span className="text-lg">🚪</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={closeMobileMenu}
                                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                                style={{
                                    background: 'var(--accent-primary)',
                                    color: 'var(--bg-primary)'
                                }}
                            >
                                <span className="text-lg">🔑</span>
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;