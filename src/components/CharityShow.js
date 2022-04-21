import React from 'react';
import { useParams } from 'react-router-dom';
import { getCharityById } from '../api/data.js';
import { getLoggedInUserId } from '../lib/auth.js';
import Donate from './Donate';

const CharityShow = () => {
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
    <div className="container">
      <div className="columns">
        <div className="column is-half">
          <figure className="image">
            <img src={data.logo} alt={data.name} />
          </figure>
        </div>
        <div className="column is-half">
          <h1 className="title">{data.name}</h1>
          <p>{data.description}</p>
          <br />
          <p>
            Categories:{' '}
            {data.category.map((item) => (
              <span key={item.id}>{item.name} </span>
            ))}
          </p>
          <br />
          {getLoggedInUserId() && (
            <Donate charityId={id} charityName={data.name} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharityShow;
