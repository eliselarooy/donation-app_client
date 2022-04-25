import axios from 'axios';

const localbaseurl = 'http://localhost:8000';

const baseurl = 'https://project4elr.herokuapp.com';

export const getAllDonations = async () => {
  const options = {
    method: 'GET',
    url: `${localbaseurl}/donations/single/`,
  };

  const { data } = await axios.request(options);

  return data;
};

export const getAllDonationsForUser = async () => {
  const options = {
    method: 'GET',
    url: `${localbaseurl}/donations/user/single/`,
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
    url: `${localbaseurl}/donations/single/create/`,
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
