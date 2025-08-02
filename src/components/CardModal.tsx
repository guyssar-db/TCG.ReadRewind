// components/CardModal.tsx
import React from 'react';
import CardEffect from './CardEffect';

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

interface CardModalProps {
  card: Card;
  isDarkMode: boolean;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, isDarkMode, onClose }) => (
  <div className="fixed inset-0 bg-gray-950 bg-opacity-60 flex justify-center items-start sm:items-center z-60 w-full overflow-y-auto">
    <div className={`p-6 rounded-lg w-full sm:max-w-xl md:max-w-4xl mx-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img src={card.img} alt={card.name} className="w-full md:w-75 h-full object-fit rounded shadow sm:mt-[620px] md:mt-0" />
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">{card.name}</h3>
          <ul className="text-sm space-y-2">
            <li className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <span className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}><span className="font-semibold">Type:</span> {card.type}</span>
              <span className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}><span className="font-semibold">World:</span> {card.world}</span>
            </li>
            <li className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <span className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}><span className="font-semibold">ATK:</span> <span className='text-red-400 font-bold'>{card.atk ?? '-'}</span></span>
              <span className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}><span className="font-semibold">CRI:</span> <span className='font-bold'>{card.cri ?? '-'}</span></span>
              <span className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}><span className="font-semibold">DEF:</span> <span className='text-blue-400 font-bold'>{card.def ?? '-'}</span></span>
            </li>
            <li className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <span className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}><span className="font-semibold">Attribute:</span> {card.attibute}</span>
              <span className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}><span className="font-semibold">Size:</span> {card.size ?? '-'}</span>
            </li>
            <li className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
              <span className="font-semibold">Effect:</span>
              <hr className="my-2" />
              <CardEffect effect={card.effect} />
            </li>
            <li className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <span className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}><span className="font-semibold">Set:</span> {card.set}</span>
              <span className={`p-4 rounded-lg border w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}><span className="font-semibold">Illust:</span> {card.illust}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-right mt-6">
        <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">ปิด</button>
      </div>
    </div>
  </div>
);

export default CardModal;
