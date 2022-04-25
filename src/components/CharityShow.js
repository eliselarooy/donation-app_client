import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharityById } from '../api/data.js';
import Donate from './Donate';
import { UserContext } from './UserContext.js';

const CharityShow = () => {
  const { user } = React.useContext(UserContext);
  const { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const charityData = await getCharityById(id);
      setData(charityData);
    };
    getData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container full-height-content">
      <div className="columns py-6">
        <div className="column is-one-third">
          <figure className="image">
            <img src={data.logo} alt={data.name} />
          </figure>
        </div>
        <div className="column is-two-thirds">
          <h1 className="title">{data.name}</h1>
          <p>{data.description}</p>
          <br />
          <p>
            Categories:{' '}
            {data.category.map((item) => (
              <span key={item.id}>{item.name} </span>
            ))}
          </p>
        </div>
      </div>
      {user ? (
        <Donate charityId={id} charityName={data.name} />
      ) : (
        <section className="py-6 has-text-centered has-background-primary-light">
          <Link to="/register" className="button is-primary">
            Sign up to donate!
          </Link>
          <p className="py-4">
            <span>Already have an account? </span>
            <span>
              <Link to="/login">Log in</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default CharityShow;
