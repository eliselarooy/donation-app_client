import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth.js';
import { useNavigate } from 'react-router';
import { UserContext } from './UserContext.js';

const Navbar = () => {
  const { user, setUser } = React.useContext(UserContext);

  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem('token');
    setUser(getLoggedInUserId());
    navigate('/');
  };

  return (
    <nav className="navbar my-4">
      <div className="navbar-brand">
        <Link to={'/'} className="navbar-item">
          Home
        </Link>
      </div>
      {user ? (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to={'/profile'} className="button is-primary">
                Profile
              </Link>
              <Link
                to={'/'}
                onClick={logOut}
                className="button is-primary is-light"
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to={'/register'} className="button is-primary">
                Sign up
              </Link>
              <Link to={'/login'} className="button is-primary is-light">
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
