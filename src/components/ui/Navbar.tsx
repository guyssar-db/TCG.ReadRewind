import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navBgClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const btnThemeClass = isDarkMode ? 'bg-green-500 text-white' : 'bg-yellow-300 text-black';

  return (
    <div>
      {/* Desktop */}
      <div className={`hidden sm:block p-3 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-100'} transform transition duration-300`}>
        <nav className={`${navBgClass} shadow-md rounded-md transform transition duration-300`}>
          <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
            <a href="/" className="flex gap-2 text-xl font-bold">
              <img className='w-7 h-7' src="/tcg.svg" alt="" />
              TCG.ReadRewind</a>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/" className={isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-600'}>Home</Link></li>
              <li><Link to="/cards" className={isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-600'}>Cards</Link></li>
              {/* <li><Link to="/about" className={isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-600'}>About</Link></li> */}
              {/* <li><Link to="/contact" className={isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-600'}>Contact</Link></li> */}

              <li className="relative" ref={dropdownRef}>
                <button onClick={toggleDarkMode} className={`px-4 py-2 rounded-md ${btnThemeClass} transform transition duration-300`}>
                  {isDarkMode ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile */}
      <div className={`block sm:hidden ${isDarkMode ? 'bg-gray-950' : 'bg-gray-100'} transition-[max-height,opacity] duration-300 ease-in-out`}>
        <nav className={`transition-[max-height,opacity] duration-300 ease-in-out ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md px-4 py-4 rounded-b-md text-center`}>
          <div className="flex justify-center relative items-center">
            <a href="/" className="flex gap-2 text-xl font-bold">
              <img className="w-7 h-7" src="/tcg.svg" alt="TCG ReadRewind Logo" />
              TCG.ReadRewind
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl font-bold absolute right-0"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          <div className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-y-auto ${isMenuOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
            <ul className="space-y-3 text-lg">
              <li><Link to="/" className={`block px-2 py-1 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>Home</Link></li>
              <li><Link to="/cards" className={`block px-2 py-1 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>Cards</Link></li>
              {/* <li><Link to="/games" className={`block px-2 py-1 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>Games</Link></li> */}
              {/* <li><Link to="/contact" className={`block px-2 py-1 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>Contact</Link></li> */}
              <li>
                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center justify-center gap-2 px-4 py-2 w-full rounded-md font-medium ${btnThemeClass} transform transition duration-300`}
                >
                  {isDarkMode ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                      </svg>
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                      </svg>
                      <span>Light Mode</span>
                    </>
                  )}
                </button>
              </li>

            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
