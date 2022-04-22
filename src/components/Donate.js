import React from 'react';
import { createDonation } from '../api/data.js';
import { useNavigate } from 'react-router-dom';

const Donate = ({ charityId, charityName }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    total_amount: '',
    date: '',
    charity: charityId,
  });

  const [responseErrorMessage, setResponseErrorMessage] = React.useState('');

  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let messages = { total_amount: '', date: '' };
    if (formData.total_amount <= 0) {
      messages = {
        ...messages,
        total_amount: 'Amount must be greater than zero',
      };
    }
    if (formData.total_amount === '') {
      messages = { ...messages, total_amount: 'Please enter an amount' };
    }
    if (formData.date === '') {
      messages = { ...messages, date: 'Please select a date' };
    }
    if (messages.total_amount !== '' || messages.date !== '') {
      setErrorMessage(messages);
      console.log('error message', errorMessage);
    } else {
      setErrorMessage('');
      try {
        const data = await createDonation(formData);
        console.log('data', data);
        navigate('/profile');
      } catch (err) {
        console.error(err);
        setResponseErrorMessage(err.response.data);
      }
    }
  };

  console.log('form', formData);
  console.log('error', responseErrorMessage);
  const firstError = responseErrorMessage[Object.keys(responseErrorMessage)[0]];
  console.log('error message', errorMessage);

  return (
    <div className="box">
      <h1 className="title is-5">Donate to {charityName}</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="total_amount" className="label">
            Amount (£)
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="total_amount"
              min="0.01"
              max="90000000"
              placeholder="Amount"
              value={formData.total_amount}
              onChange={handleChange}
            />
          </div>
          <p className="help has-text-danger">{errorMessage.total_amount}</p>
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
          <p className="help has-text-danger">{errorMessage.date}</p>
        </div>

        <div className="control">
          <button type="submit" className="button">
            Add donation
          </button>
        </div>
        <p className="help is-danger">{firstError}</p>
      </form>
    </div>
  );
};

export default Donate;
