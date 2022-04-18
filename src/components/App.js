import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../styles/main.scss';

import Home from './Home';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default App;
