import axios from 'axios';

export const getAllDonations = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/donations/single/',
  };

  const { data } = await axios.request(options);

  return data;
};

export const getAllDonationsForUser = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/donations/user/single/',
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);

  return data;
};

export const getAllCharities = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/charities/',
  };

  const { data } = await axios.request(options);

  return data;
};
