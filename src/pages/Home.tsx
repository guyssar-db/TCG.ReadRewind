import React from 'react';
import { useTheme } from '../context/ThemeContext';

const categories = [
  {
    title: 'Future Card Buddyfight',
    description: 'เรียนรู้พื้นฐานทางคณิตศาสตร์ ต่อยอดสู่การแก้ปัญหาในชีวิตจริง',
    bgDark: 'bg-gray-800',
    bgLight: 'bg-white'
  },
  {
    title: 'Vanguard',
    description: 'ฝึกทักษะการฟัง พูด อ่าน เขียนภาษาอังกฤษอย่างมั่นใจ',
    bgDark: 'bg-gray-700',
    bgLight: 'bg-white'
  },
  {
    title: 'Weiß Schwarz',
    description: 'พัฒนาทักษะการอ่าน การเขียน และเข้าใจวรรณคดีไทย',
    bgDark: 'bg-gray-600',
    bgLight: 'bg-white'
  }
];

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <section className="relative bg-[url('/john-schnobrich-2FPjlAyMQTA-unsplash.webp')] bg-cover bg-center bg-no-repeat py-40 px-7 md:px-16 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-70 z-0"></div> 
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">ยินดีต้อนรับสู่ TCG.ReadRewind</h1> 
          <p className="text-lg md:text-xl mb-8">แหล่งบันทึกการ์ดเกม fanmade ของ guyssar</p> 
          {/* <a href="/games" className="bg-[#fdc500] text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 transition-all">เริ่มเรียนรู้เลย</a> */}
        </div>
      </section>

      <div className={`p-6 py-[5rem] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} transform transition duration-300`}>
        <h1 className="text-3xl font-bold mb-4">หมวดหมู่เกม</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`shadow-md rounded-md p-6 space-y-3 hover:scale-105 transform transition duration-300 ${
                isDarkMode ? cat.bgDark : cat.bgLight
              }`}
            >
              <h2 className="text-xl font-bold">{cat.title}</h2>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
