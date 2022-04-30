import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth.js';
import { useNavigate } from 'react-router';
import { UserContext } from './UserContext.js';

const Navbar = () => {
  const { user, setUser } = React.useContext(UserContext);

  const [burger, setBurger] = React.useState(false);

  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem('token');
    setUser(getLoggedInUserId());
    navigate('/');
  };

  return (
    <nav className="navbar my-4" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to={'/'} className="navbar-item">
          Home
        </Link>
        <a
          onClick={() => {
            setBurger(!burger);
          }}
          role="button"
          className={`navbar-burger ${burger ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="nav-menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${burger ? 'is-active' : ''}`} id="nav-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            {user ? (
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
            ) : (
              <div className="buttons">
                <Link to={'/register'} className="button is-primary">
                  Sign up
                </Link>
                <Link to={'/login'} className="button is-primary is-light">
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
