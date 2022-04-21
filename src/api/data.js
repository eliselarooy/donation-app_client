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

export const createDonation = async (formData) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/donations/single/create/',
    data: formData,
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

export const getCharityById = async (id) => {
  const options = {
    method: 'GET',
    url: `http://localhost:8000/charities/${id}`,
  };

  const { data } = await axios.request(options);

  return data;
};
