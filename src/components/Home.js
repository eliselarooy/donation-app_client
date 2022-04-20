import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-violet-50">
      <h1>Donations Tracker</h1>
      <div>
        <div>
          <p className="text-3xl font-bold underline">
            Keep track of your donations
          </p>
          <img
            className="image"
            src="https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg"
            alt=""
          />
        </div>
        <div className="">
          <p>Keep track of your donations</p>
          <img
            className="image"
            src="https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg"
            alt=""
          />
        </div>
        <div className="">
          <p>Keep track of your donations</p>
          <img
            className="image"
            src="https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg"
            alt=""
          />
        </div>
      </div>
      <Link to="/register">Sign up to get started!</Link>
      <p>Already have an account? </p>
      <Link to="/login">Log in</Link>
    </div>
  );
}

export default Home;
