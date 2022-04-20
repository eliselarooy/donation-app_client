import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth.js';

const Navbar = () => {
  const logOut = () => {
    sessionStorage.removeItem('token');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={'/'} className="navbar-item">
          Home
        </Link>
      </div>
      {getLoggedInUserId() ? (
        <div className="navbar-end">
          <Link to={'/profile'} className="navbar-item">
            Profile
          </Link>
          <Link to={'/'} onClick={logOut} className="navbar-item">
            Log Out
          </Link>
        </div>
      ) : (
        <div className="navbar-end">
          <Link to={'/register'} className="navbar-item">
            Sign up
          </Link>
          <Link to={'/login'} className="navbar-item">
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
