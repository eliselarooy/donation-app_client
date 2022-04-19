import React from 'react';
import { register } from '../api/auth';

const Register = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

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
    } catch (err) {
      console.error(err);
    }
  };

  console.log(formData);

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
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="password_confirmation">Password confirmation</label>
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
