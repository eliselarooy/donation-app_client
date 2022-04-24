import React from 'react';
import { login } from '../api/auth.js';
import { useNavigate, Link } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth.js';

const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  console.log('props', props);

  const [responseErrorMessage, setResponseErrorMessage] = React.useState('');

  const [required, setRequired] = React.useState({
    email: '*',
    password: '*',
  });

  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value === '') {
      setRequired({ ...required, [name]: '*' });
    } else {
      setRequired({ ...required, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === '' || formData.password === '') {
      setError('Email and password are required');
    } else {
      setError('');
      try {
        const data = await login(formData);
        console.log('data', data);
        props.setLoggedIn(getLoggedInUserId());
        navigate('/profile');
      } catch (err) {
        console.error(err);
        setResponseErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div className="full-height-content is-justify-content-center is-flex is-align-items-center has-background-primary-light">
      <div className="box p-6">
        <h1 className="title">Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email" className="label">
              Email <small className="has-text-danger">{required.email}</small>
            </label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="icon is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password{' '}
              <small className="has-text-danger">{required.password}</small>
            </label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="icon is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div className="control">
            <button type="submit" className="button is-primary">
              Log in
            </button>
          </div>
          <p className="help is-danger">{responseErrorMessage}</p>
          <p className="help is-danger">{error}</p>
        </form>

        <br />
        <p className="control">
          <span>Don&apos;t have an account yet? </span>
          <Link to="/register">
            <span>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
