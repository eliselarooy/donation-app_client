import React from 'react';
import { useNavigate } from 'react-router';
import { login, register } from '../api/auth';

const Register = () => {
  const navigate = useNavigate();
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
      navigate('/profile');
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
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username" className="label">
              Username
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <p className="help has-text-danger">{errorMessage.username}</p>
          </div>

          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <p className="help has-text-danger">{errorMessage.email}</p>
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <p className="help has-text-danger">{errorMessage.password}</p>
          </div>

          <div className="field">
            <label htmlFor="password_confirmation" className="label">
              Password confirmation
            </label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password_confirmation"
                placeholder="Password confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
            </div>
            <p className="help has-text-danger">
              {errorMessage.password_confirmation}
            </p>
          </div>

          <div className="control">
            <button type="submit" className="button">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
