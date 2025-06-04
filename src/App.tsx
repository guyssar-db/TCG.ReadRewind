import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import Cards from './pages/Cards';
import CardManager from './pages/CardManager';
import Buddyfight from './pages/buddyfight/Buddyfight';
import NotFoundPage from './pages/NotFoundPage'


const App: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <Router>
      <div>
      <Navbar />
      </div>
      <div className={`
      ${isDarkMode ? 'min-h-[calc(100vh-96px)] bg-gray-950 text-white' : 'bg-gray-100 text-black'
        } transform transition duration-300`}
        >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cards/buddyfight" element={<Buddyfight />} />
          <Route path="/cardjson" element={<CardManager />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
