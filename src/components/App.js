import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import Profile from './Profile';
import Footer from './Footer';
import CharityShow from './CharityShow';
import PieChart from './PieChart';
import { UserContext } from './UserContext';

import '../styles/style.scss';

const App = () => {
  const [user, setUser] = React.useState(getLoggedInUserId());

  const value = React.useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/charities/:id" element={<CharityShow />} />
          <Route path="/piechart" element={<PieChart />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
