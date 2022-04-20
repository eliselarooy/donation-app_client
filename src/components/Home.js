import React from 'react';
import { Link } from 'react-router-dom';
import { getAllCharities } from '../api/data.js';

function Home() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const donationData = await getAllCharities();
      setData(donationData);
    };
    getData();
  }, []);

  console.log(data);

  return (
    <>
      <h1>Donations Tracker</h1>
      <div></div>
      <Link to="/register">Sign up to get started!</Link>
      <p>Already have an account? </p>
      <Link to="/login">Log in</Link>
    </>
  );
}

export default Home;
