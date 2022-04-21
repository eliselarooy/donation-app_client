import React from 'react';
import { createDonation } from '../api/data.js';
import { useNavigate } from 'react-router-dom';

const Donate = ({ charityId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    total_amount: '',
    date: '',
    charity: charityId,
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
      const data = await createDonation(formData);
      console.log('data', data);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data);
    }
  };

  console.log('form', formData);
  console.log('error', errorMessage);
  const firstError = errorMessage[Object.keys(errorMessage)[0]];

  return (
    <div>
      <h1>Add donation</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="total_amount" className="label">
              Amount
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="total_amount"
                placeholder="Amount"
                value={formData.total_amount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="date" className="label">
              Date
            </label>
            <div className="control">
              <input
                className="input"
                type="date"
                name="date"
                placeholder="Date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="control">
            <button type="submit" className="button">
              Add donation
            </button>
          </div>
          <p className="help is-danger">{firstError}</p>
        </form>
      </div>
    </div>
  );
};

export default Donate;
