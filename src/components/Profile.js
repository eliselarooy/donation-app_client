import React from 'react';
import { getAllDonationsForUser } from '../api/data';

const Profile = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const donationData = await getAllDonationsForUser();
      donationData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      setData(donationData);
    };
    getData();
  }, []);

  console.log('data', data);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1 className="title">Your Donations</h1>
      <div className="columns">
        <div className="column is-one-third">
          <h3 className="has-text-weight-bold">Amount</h3>
        </div>
        <div className="column is-one-third">
          <h3 className="has-text-weight-bold">Charity</h3>
        </div>
        <div className="column is-one-third">
          <h3 className="has-text-weight-bold">Date</h3>
        </div>
      </div>
      {data.map((item) => {
        return (
          <div key={item.id} className="columns">
            <div className="column is-one-third">
              <p>£{item.total_amount}</p>
            </div>
            <div className="column is-one-third">
              <p>{item.charity.name}</p>
            </div>
            <div className="column is-one-third">
              <p>{item.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
