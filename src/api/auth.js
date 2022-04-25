import axios from 'axios';

const localbaseurl = 'http://localhost:8000';

const baseurl = 'https://project4elr.herokuapp.com';

export const login = async (credentials) => {
  const options = {
    method: 'POST',
    url: `${localbaseurl}/authentication/login/`,
    data: credentials,
  };

  const { data } = await axios.request(options);

  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    window.sessionStorage.removeItem('token');
  }

  return data;
};

export const register = async (credentials) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/authentication/register/',
    data: credentials,
  };

  const { data } = await axios.request(options);

  return data;
};
