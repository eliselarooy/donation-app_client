import React from 'react';
import { getAllDonationsForUser } from '../api/data';
import PieChart from './PieChart';

const Profile = () => {
  const [data, setData] = React.useState(null);
  const chartLabels = ['Health', 'Animals', 'Education', 'Environment'];
  let chartData = [0, 0, 0, 0];
  let totalDonated = 0;

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
      totalDonated += parseFloat(item.total_amount);
      if (item.charity.category[0].name === chartLabels[0]) {
        chartData[0] += parseFloat(item.total_amount);
      }
      if (item.charity.category[0].name === chartLabels[1]) {
        chartData[1] += parseFloat(item.total_amount);
      }
      if (item.charity.category[0].name === chartLabels[2]) {
        chartData[2] += parseFloat(item.total_amount);
      }
      if (item.charity.category[0].name === chartLabels[3]) {
        chartData[3] += parseFloat(item.total_amount);
      }
    });
    console.log(chartData);
    console.log(totalDonated);
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Charity</th>
              <th>Date Collected</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Total: £{totalDonated}</th>
            </tr>
          </tfoot>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>£{item.total_amount}</td>
                  <td>{item.charity.name}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="container p-6">
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
