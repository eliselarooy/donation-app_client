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

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Donations</h1>
      <div className="columns is-multiline">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="column is-one-quarter-desktop is-half-tablet is-one-mobile"
            >
              <Link to={`/charities/${item.id}`} className="card">
                <div className="card-image">
                  <figure className="image">
                    <img src={item.logo} alt="" />
                  </figure>
                </div>
                <div className="card-content">
                  <h3 className="title is-6">{item.name}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <Link to="/register" className="button">
        Sign up to get started!
      </Link>
      <p>
        <span>Already have an account? </span>
        <span>
          <Link to="/login">Log in</Link>
        </span>
      </p>
    </>
  );
}

export default Home;
