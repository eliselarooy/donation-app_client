import React from 'react';
import { getAllDonations } from '../api/data';
import axios from 'axios';

function Home() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // const getData = axios
    //   .get('http://localhost:8000/donations/single/')
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    const getData = async () => {
      const donationData = await getAllDonations();
      setData(donationData);
    };
    getData();
  }, []);

  console.log(data);

  return <p>{JSON.stringify(data)}</p>;
}

export default Home;
