import axios from 'axios';

export const getAllDonations = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/donations/single/',
  };

  const { data } = await axios.request(options);

  return data;
};
