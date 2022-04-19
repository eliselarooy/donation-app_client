import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>Hello</p>} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
