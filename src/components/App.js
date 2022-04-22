import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import Profile from './Profile';
import Footer from './Footer';
import CharityShow from './CharityShow';
import PieChart from './PieChart';

import '../styles/style.scss';
import { getLoggedInUserId } from '../lib/auth';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(getLoggedInUserId());

  return (
    <BrowserRouter>
      <Navbar {...{ loggedIn }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/charities/:id" element={<CharityShow />} />
        <Route path="/piechart" element={<PieChart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
