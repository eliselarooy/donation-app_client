import React from 'react';
import { getAllDonationsForUser } from '../api/data';
import PieChart from './PieChart';

const Profile = () => {
  const [data, setData] = React.useState(null);
  const chartLabels = ['Health', 'Animals', 'Education', 'Environment'];
  let chartData = [0, 0, 0, 0];

  React.useEffect(() => {
    const getData = async () => {
      const donationData = await getAllDonationsForUser();
      donationData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      setData(donationData);
    };
    getData();
  }, []);

  console.log('data', data);

  if (data) {
    data.forEach((item) => {
      if (item.charity.category[0].name === 'Health') {
        chartData[0] += parseFloat(item.total_amount);
      }
      if (item.charity.category[0].name === 'Animals') {
        chartData[1] += parseFloat(item.total_amount);
      }
      if (item.charity.category[0].name === 'Education') {
        chartData[2] += parseFloat(item.total_amount);
      }
      if (item.charity.category[0].name === 'Environment') {
        chartData[3] += parseFloat(item.total_amount);
      }
    });
    console.log(chartData);
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h1 className="title">Your Donations</h1>
        <section className="notification">
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
        </section>
      </div>

      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half-desktop is-third-tablet is-one-mobile">
            <PieChart chartData={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
