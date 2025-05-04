import React, { useContext } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      toast.success("Logged out successfully!");
      navigate('/login');
    }
  };

  const handleClearData = () => {
    const confirmClear = window.confirm("Are you sure you want to clear all customer data?");
    if (confirmClear) {
      localStorage.removeItem('customers');
      toast.success("Customer data cleared!");
      window.location.reload();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">CrediKhaata</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <button className="logout-btn" onClick={handleClearData}>Clear Data</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
