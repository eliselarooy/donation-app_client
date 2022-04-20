import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ProgressBar from './ProgressBar';
import Navbar from './Navbar';
import Profile from './Profile';
import Footer from './Footer';

import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/progress" element={<ProgressBar done="75" />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
