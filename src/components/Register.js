import React from 'react';
import { login, register } from '../api/auth';

const Register = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      console.log(data);
      await login(formData);
    } catch (err) {
      console.log(err.response.data);
      setErrorMessage(err.response.data);
    }
  };

  console.log('form data', formData);
  console.log('error message', errorMessage[Object.keys(errorMessage)[0]]);

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <small className="has-text-danger"> {errorMessage.username}</small>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <small className="has-text-danger"> {errorMessage.email}</small>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <small className="has-text-danger"> {errorMessage.password}</small>
        <label htmlFor="password_confirmation">Password confirmation</label>
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
        <small className="has-text-danger">
          {' '}
          {errorMessage.password_confirmation}
        </small>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
