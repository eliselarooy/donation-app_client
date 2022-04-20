import React from 'react';
// import { login } from '../api/auth.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = React.useState('');

  const login = async (credentials) => {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/authentication/login/',
      data: credentials,
    };

    const { data } = await axios.request(options);

    if (data.token) {
      window.sessionStorage.setItem('token', data.token);
    } else {
      window.sessionStorage.removeItem('token');
    }

    return data;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      console.log('data', data);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data.message);
    }
  };

  console.log('form', formData);
  console.log('error', errorMessage);

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <div className="control">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="control">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="button">
          Log in
        </button>
        <small className="has-text-danger"> {errorMessage}</small>
      </form>
    </div>
  );
};

export default Login;
