import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth';
import { UserContext } from './UserContext';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import Footer from './Footer';
import CharityShow from './CharityShow';
import PieChart from './PieChart';
import Tab from './Tab';

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
          <Route path="/profile" element={<Tab />} />
          <Route path="/charities/:id" element={<CharityShow />} />
          <Route path="/piechart" element={<PieChart />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
