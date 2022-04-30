import React from 'react';
import { Link } from 'react-router-dom';
import { getAllCharities } from '../api/data.js';
import { UserContext } from './UserContext.js';

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

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    const getData = async () => {
      const donationData = await getAllCharities();
      setData(donationData);
    };
    getData();
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.name);
  };

  let filteredData;

  const isSelected = (name) => {
    return filter.includes(name);
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
          <h1 className="title is-size-1 has-text-white">Donate!</h1>
          <h2 className="subtitle has-text-white">
            Find a cause and start today
          </h2>
        </div>
      </section>

      {!user && (
        <section className="py-6 has-text-centered has-background-primary-light">
          <Link to="/register" className="button is-primary">
            Sign up to get started!
          </Link>
          <p className="py-4">
            <span>Already have an account? </span>
            <span>
              <Link to="/login">Log in</Link>
            </span>
          </p>
        </section>
      )}

      <section className="container py-6">
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
