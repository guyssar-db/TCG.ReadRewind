import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import CardModal from '../../components/CardModal';
import SetModal from '../../components/SetModal';
import cards from '../../database/bf_db.json';
import { useInView } from 'react-intersection-observer';

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
  const [selectedSet, setSelectedSet] = useState<{ name: string; cards: Card[] } | null>(null);
  const [showSetPopup, setShowSetPopup] = useState(false);
  const [searchSet, setSearchSet] = useState('');

  const groupedCards = cards.reduce((acc: Record<string, Card[]>, card) => {
    if (!acc[card.set]) acc[card.set] = [];
    acc[card.set].push(card);
    return acc;
  }, {});

  const filteredSets = Object.entries(groupedCards).filter(([setName]) =>
    setName.toLowerCase().includes(searchSet.toLowerCase())
  );

  const renderPlaceholderGroup = () => (
    <div className="mb-8 bg-gray-200 dark:bg-gray-800 p-4 rounded-md animate-pulse">
      <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 mb-4 rounded" />
      <div className="flex space-x-4 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-64 h-96 bg-gray-300 dark:bg-gray-700 rounded-lg"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`p-4 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'} min-h-[calc(100vh-96px)] transition duration-300`}
    >
      <h2 className="text-2xl font-bold mb-4">Buddyfight</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="ค้นหา Set การ์ด..."
          value={searchSet}
          onChange={(e) => setSearchSet(e.target.value)}
          className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 ${isDarkMode
              ? 'bg-gray-800 text-white border-gray-700 placeholder-white'
              : 'bg-white text-black border-gray-300 placeholder-gray-500'
            }`}
        />
      </div>

      {filteredSets.map(([setName, group]) => {
        const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

        return (
          <div ref={ref} key={setName} className="mb-8 min-h-[100px]">
             {!inView ? (
                renderPlaceholderGroup()
              ) : (
              <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-3 rounded-md`}>
                <h3 className="text-xl font-semibold p-3 flex items-center justify-between">
                  <span>
                    <strong>Set : </strong>
                    {setName}
                  </span>
                  <button
                    className="text-sm px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => {
                      setSelectedSet({ name: setName, cards: group });
                      setShowSetPopup(true);
                    }}
                  >
                    แสดงทั้งหมด
                  </button>
                </h3>

                <div className="w-full overflow-x-auto p-3 pb-2 relative overflow-y-hidden">
                  <div className="flex flex-nowrap space-x-4 w-max overflow-visible relative">
                    {group.map((card, index) => (
                      <div
                        key={index}
                        className={`max-w-[16rem] relative z-10 hover:z-20 cursor-pointer hover:scale-105 rounded-lg shadow-md p-4 transition duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
                          }`}
                        onClick={() => setSelectedCard(card)}
                      >
                        <span
                          className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded z-20 ${isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
                            }`}
                        >
                          {card.lang.toUpperCase()}
                        </span>
                        <span
                          className={`absolute top-2 right-11 text-xs font-bold px-2 py-1 rounded z-20 ${isDarkMode ? 'bg-gray-300 text-black' : 'bg-gray-900 text-white'
                            }`}
                        >
                          {card.type}
                        </span>

                        <div className="flex justify-center">
                          <div
                            className={`${card.type === 'ไม้ตาย' || card.type.includes('มอนสเตอร์ไม้ตาย')
                                ? 'h-72 z-10'
                                : ''
                              }`}
                          >
                            <img
                              loading="lazy"
                              src={card.img}
                              alt={card.name}
                              className={`rounded ${card.type === 'ไม้ตาย' || card.type.includes('มอนสเตอร์ไม้ตาย')
                                  ? 'transform rotate-90 translate-y-[64px] scale-[128%] w-73 origin-center'
                                  : 'object-cover h-72'
                                }`}
                            />
                          </div>
                        </div>
                        <div className="mt-2 font-semibold">{card.name}</div>
                        <div className="text-sm text-gray-400">illust : {card.illust}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {selectedCard && (
        <CardModal
          card={selectedCard}
          isDarkMode={isDarkMode}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {showSetPopup && selectedSet && (
        <SetModal
          set={selectedSet}
          isDarkMode={isDarkMode}
          onClose={() => setShowSetPopup(false)}
          onSelectCard={(card) => {
            setSelectedCard(card);
            setShowSetPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Buddyfight;
