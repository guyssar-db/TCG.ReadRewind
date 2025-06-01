import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import CardEffect from '../../components/CardEffect';

import cards from '../../database/bf_db.json';
type Card = {
  lang: string;
  set: string;
  img: string;
  type: string;
  world: string;
  size?: number | null;
  atk?: number | null;
  cri?: number | null;
  def?: number | null;
  name: string;
  attibute: string;
  illust: string;
  effect: string;
};


const Buddyfight: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const groupedCards = cards.reduce((acc: Record<string, Card[]>, card) => {
    if (!acc[card.set]) acc[card.set] = [];
    acc[card.set].push(card);
    return acc;
  }, {});

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'} min-h-[calc(100vh-96px)]`}>
      <h2 className="text-2xl font-bold mb-4">Buddyfight</h2>

      {Object.entries(groupedCards).map(([setName, group]) => (
        <div key={setName} className={`mb-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-3 rounded-md`}>
          <h3 className={`text-xl font-semibold p-3`}><strong>Set : </strong>{setName}</h3>

          <div className="w-full overflow-x-auto p-3 pb-2 relative overflow-y-hidden">
            <div className="flex flex-nowrap space-x-4 w-max overflow-visible relative">
              {group.map((card, index) => (
                <div
                  key={index}
                  className={`max-w-[16rem] relative z-10 hover:z-20 cursor-pointer hover:scale-105 rounded-lg shadow-md p-4 transform transition duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
                  onClick={() => setSelectedCard(card)}
                >
                  <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
                    {card.lang.toUpperCase()}
                  </span>
                  <span className={`absolute top-2 right-11 text-xs font-bold px-2 py-1 rounded ${isDarkMode ? 'bg-gray-300 text-black' : 'bg-gray-900 text-white'}`}>
                    {card.type}
                  </span>

                  <div className="flex justify-center">
                    <img src={card.img} alt={card.name} className="h-72 object-cover rounded" />
                  </div>
                  <div className="mt-2 font-semibold">{card.name}</div>
                  <div className="text-sm text-gray-400">illust : {card.illust}</div>
                </div>
              ))}

            </div>
          </div>
        </div>
      ))}



      {/* Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-60 flex justify-center items-start sm:items-center z-50 w-full overflow-y-auto">
          <div
            className={`p-6 rounded-lg w-full sm:max-w-xl md:max-w-4xl mx-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src={selectedCard.img}
                alt={selectedCard.name}
                className="w-full md:w-75 h-full object-fit rounded shadow sm:mt-[620px] md:mt-0"
              />

              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">{selectedCard.name}</h3>

                <ul className="text-sm space-y-2">
                  <li className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <span
                      className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
                    >
                      <span className="font-semibold">Type:</span> {selectedCard.type}
                    </span>
                    <span
                      className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
                    >
                      <span className="font-semibold">World:</span> {selectedCard.world}
                    </span>
                  </li>

                  <li className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <span
                      className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
                    >
                      <span className="font-semibold">ATK:</span> <span className='text-blue-400 font-bold'>{selectedCard.atk ?? '-'}</span>
                    </span>
                    <span
                      className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
                    >
                      <span className="font-semibold">CRI:</span> <span className='font-bold'>{selectedCard.cri ?? '-'}</span>
                    </span>
                    <span
                      className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
                    >
                      <span className="font-semibold">DEF:</span> <span className='text-red-400 font-bold'>{selectedCard.def ?? '-'}</span>
                    </span>
                  </li>

                  <li className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <span
                      className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
                    >
                      <span className="font-semibold">Attribute:</span> {selectedCard.attibute}
                    </span>
                    <span
                      className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
                    >
                      <span className="font-semibold">Size:</span> {selectedCard.size ?? '-'}
                    </span>
                  </li>

                  <li
                    className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
                      }`}
                  >
                    <span className="font-semibold">Effect:</span>
                    <br />
                    <hr className="mb-3" />
                    <CardEffect effect={selectedCard.effect} />
                  </li>



                  <li className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <span
                      className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
                    >
                      <span className="font-semibold">Set:</span> {selectedCard.set}
                    </span>
                    <span
                      className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
                    >
                      <span className="font-semibold">Illust:</span> {selectedCard.illust}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Close Button */}
            <div className="text-right mt-6">
              <button
                onClick={() => setSelectedCard(null)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Buddyfight;
