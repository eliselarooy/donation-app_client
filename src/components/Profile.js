import React from 'react';
import { getAllDonationsForUser } from '../api/data';

const Profile = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const donationData = await getAllDonationsForUser();
      setData(donationData);
    };
    getData();
  }, []);

  console.log(data);

  return <p>{JSON.stringify(data)}</p>;
};

export default Profile;
