import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { login, register } from '../api/auth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [required, setRequired] = React.useState({
    username: '*',
    email: '*',
    password: '*',
    password_confirmation: '*',
  });

  const [responseErrorMessage, setResponseErrorMessage] = React.useState('');

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
    if (
      formData.username === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.password_confirmation === ''
    ) {
      setError('Please complete all fields');
    } else {
      setError('');
      try {
        const data = await register(formData);
        console.log(data);
        await login(formData);
        navigate('/profile');
      } catch (err) {
        console.log(err.response.data);
        setResponseErrorMessage(err.response.data);
      }
    }
  };

  console.log('form data', formData);
  console.log(
    'error message',
    responseErrorMessage[Object.keys(responseErrorMessage)[0]]
  );

  return (
    <div className="full-height-content is-justify-content-center is-flex is-align-items-center has-background-primary-light">
      <div className="box p-6">
        <h1 className="title">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username" className="label">
              Username{' '}
              <small className="has-text-danger">{required.username}</small>
            </label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <span className="icon is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <p className="help has-text-danger">
              {responseErrorMessage.username}
            </p>
          </div>

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
            <p className="help has-text-danger">{responseErrorMessage.email}</p>
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
            <p className="help has-text-danger">
              {responseErrorMessage.password}
            </p>
          </div>

          <div className="field">
            <label htmlFor="password_confirmation" className="label">
              Password confirmation{' '}
              <small className="has-text-danger">
                {required.password_confirmation}
              </small>
            </label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                name="password_confirmation"
                placeholder="Password confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
              <span className="icon is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            <p className="help has-text-danger">
              {responseErrorMessage.password_confirmation}
            </p>
          </div>

          <div className="control">
            <button type="submit" className="button is-primary">
              Sign up
            </button>
          </div>

          <p className="help is-danger">{error}</p>
        </form>

        <br />
        <p className="control">
          <span>Already have an account? </span>
          <Link to="/login">
            <span>Log in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
