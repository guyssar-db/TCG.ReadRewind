import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: 'Future Card Buddyfight',
    description: 'description',
    img: '/images/logo_cardgame/fc_bf_th.png',
    bgDark: 'bg-gray-800',
    bgLight: 'bg-white',
    url: '/cards/buddyfight',
  },
  {
    title: 'Vanguard',
    description: 'description',
    img: '/images/logo_cardgame/fc_vg_th.png',
    bgDark: 'bg-gray-800',
    bgLight: 'bg-white',
    url: '/cards/vanguard',
  },
  {
    title: 'Weiß Schwarz',
    description: 'description',
    img: '/images/logo_cardgame/ws.png',
    bgDark: 'bg-gray-800',
    bgLight: 'bg-white',
    url: '/cards/WeissSchwarz',
  },
];

const Cards: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-[calc(100vh-96px)] ${
        isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'
      } transform transition duration-300`}
    >
      <div
        className={`p-6 ${
          isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'
        } transform transition duration-300`}
      >
        <h1 className="text-3xl font-bold mb-4">หมวดหมู่การ์ดเกม</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`cursor-pointer shadow-md rounded-md p-6 space-y-3 hover:scale-105 transform transition duration-300 ${
                isDarkMode ? cat.bgDark : cat.bgLight
              }`}
              onClick={() => navigate(cat.url)}
            >
              <div>
                <img src={cat.img} alt={cat.title} />
              </div>
              <h2 className="text-xl font-bold">{cat.title}</h2>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
