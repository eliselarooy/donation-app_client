import React from 'react';
import { useParams } from 'react-router-dom';
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
      <div className="columns">
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
          <br />
          {user && <Donate charityId={id} charityName={data.name} />}
        </div>
      </div>
    </div>
  );
};

export default CharityShow;
