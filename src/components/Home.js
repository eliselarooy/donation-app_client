import React from 'react';
import { Link } from 'react-router-dom';
import { getAllCharities } from '../api/data.js';
import { getLoggedInUserId } from '../lib/auth.js';

const filterMap = {
  All: () => true,
  Health: (charity) =>
    charity.category.some((category) => category.name === 'Health'),
  Animals: (charity) =>
    charity.category.some((category) => category.name === 'Animals'),
  Education: (charity) =>
    charity.category.some((category) => category.name === 'Education'),
  Environment: (charity) =>
    charity.category.some((category) => category.name === 'Environment'),
};

const filterNames = Object.keys(filterMap);

function Home() {
  const [data, setData] = React.useState(null);
  const [filter, setFilter] = React.useState('All');
  const [selected, setSelected] = React.useState('All');

  React.useEffect(() => {
    const getData = async () => {
      const donationData = await getAllCharities();
      setData(donationData);
    };
    getData();
  }, []);

  const handleFilter = (e) => {
    setSelected(e.target.name);
    setFilter(e.target.name);
  };

  let filteredData;

  const isSelected = (name) => {
    return selected.includes(name);
  };

  if (data) {
    filteredData = data.filter(filterMap[filter]);
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="hero is-large hero-background">
        <div className="hero-body">
          <h1 className="title has-text-white">
            Donation website something something
          </h1>
        </div>
      </section>

      {!getLoggedInUserId() && (
        <section>
          <Link to="/register" className="button">
            Sign up to get started!
          </Link>
          <p>
            <span>Already have an account? </span>
            <span>
              <Link to="/login">Log in</Link>
            </span>
          </p>
        </section>
      )}

      <section className="container">
        <h2 className="title">Our Charities</h2>
        <div className="buttons">
          {filterNames.map((item) => {
            return (
              <button
                key={item}
                type="button"
                className={isSelected(item) ? 'is-primary button' : 'button'}
                name={item}
                onClick={handleFilter}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="columns is-multiline">
          {filteredData.map((item) => {
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
      </section>
    </>
  );
}

export default Home;
