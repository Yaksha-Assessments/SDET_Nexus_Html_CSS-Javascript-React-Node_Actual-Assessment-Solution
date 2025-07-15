import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../App';

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Online Bookstore</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {auth && auth.role === 'user' && (
                    <Link to="/cart">Cart</Link>
                )}
                {auth && auth.role === 'admin' && (
                    <>
                        <Link to="/admin">Admin Panel</Link>
                        <Link to="/orders">Orders</Link>
                    </>
                )}
                {!auth ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
