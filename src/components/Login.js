import React from 'react';
import { login } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

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
        navigate('/profile');
      } catch (err) {
        console.error(err);
        setResponseErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <div className="box">
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
            <button type="submit" className="button">
              Log in
            </button>
          </div>
          <p className="help is-danger">{responseErrorMessage}</p>
          <p className="help is-danger">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
