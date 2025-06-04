import React from 'react';
import { useTheme } from '../context/ThemeContext'; // สมมติคุณมี context นี้

const NotFoundPage: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen md:min-h-[calc(100vh-96px)] px-4 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    } transform transition duration-300`}>
      <h1 className="text-9xl font-extrabold">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mt-4 mb-6">
        Oops! Page not found.
      </p>
      <p className={`mb-8 max-w-md text-center ${isDarkMode ?'text-gray-400' : 'text-gray-700'} transform transition duration-300`}>
        ไม่พบหน้าที่คุณกำลังหาอยู่
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        กลับไปหน้าแรก
      </a>
    </div>
  );
};

export default NotFoundPage;
