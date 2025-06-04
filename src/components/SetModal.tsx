// components/SetModal.tsx
import React from 'react';

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

interface SetModalProps {
  set: { name: string; cards: Card[] };
  isDarkMode: boolean;
  onClose: () => void;
  onSelectCard: (card: Card) => void;
}

const SetModal: React.FC<SetModalProps> = ({ set, isDarkMode, onClose, onSelectCard }) => (
  <div className={`fixed inset-0 bg-gray-950 bg-opacity-60 flex items-center justify-center z-50`}>
    <div className={`h-full overflow-y-auto w-full rounded-lg p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Set : {set.name}</h2>
        <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">ปิด</button>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {set.cards.map((card, index) => (
          <div
            key={index}
            className={`max-w-[16rem] relative z-10 hover:z-20 cursor-pointer hover:scale-105 rounded-lg shadow-md p-4 transition duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
            onClick={() => onSelectCard(card)}
          >
            <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded z-20 ${isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>{card.lang.toUpperCase()}</span>
            <span className={`absolute top-2 right-11 text-xs font-bold px-2 py-1 rounded z-20 ${isDarkMode ? 'bg-gray-300 text-black' : 'bg-gray-900 text-white'}`}>{card.type}</span>
            <div className={`${card.type === 'ไม้ตาย' || card.type.includes('มอนสเตอร์ไม้ตาย')
                                ? 'h-72 z-10'
                                : ''
                              }`}>
              <img src={card.img} alt={card.name} className={`rounded ${card.type === 'ไม้ตาย' || card.type.includes('มอนสเตอร์ไม้ตาย')
                                  ? 'transform rotate-90 translate-y-[64px] scale-[128%] w-73 origin-center'
                                  : 'object-cover h-72'
                                }`} />
            </div>
            <div className="mt-2 font-semibold">{card.name}</div>
            <div className="text-sm text-gray-400">illust : {card.illust}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SetModal;
