import React, { useState } from 'react';
import initialCards from '../database/bf_db.json';

type Card = {
    lang: string;
    set: string;
    img: string;
    type: string;
    world: string;
    size: number;
    atk: number;
    cri: number;
    def: number;
    name: string;
    attibute: string;
    illust: string;
    effect: string;
};

const CardManager: React.FC = () => {
    const [cards, setCards] = useState<Card[]>(initialCards);
    const [newCard, setNewCard] = useState<Card>({
        lang: "TH",
        set: "",
        img: "",
        type: "",
        world: "",
        size: 1,
        atk: 0,
        cri: 0,
        def: 0,
        name: "",
        attibute: "",
        illust: "",
        effect: ""
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [showJsonPopup, setShowJsonPopup] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewCard(prev => ({
            ...prev,
            [name]: ['size', 'atk', 'cri', 'def'].includes(name) ? Number(value) : value
        }));
    };

    const handleAddOrEdit = () => {
        if (editIndex !== null) {
            const updated = [...cards];
            updated[editIndex] = newCard;
            setCards(updated);
            setEditIndex(null);
        } else {
            setCards([...cards, newCard]);
        }

        setNewCard({
            lang: "TH",
            set: "",
            img: "",
            type: "",
            world: "",
            size: 1,
            atk: 0,
            cri: 0,
            def: 0,
            name: "",
            attibute: "",
            illust: "",
            effect: ""
        });
    };

    const handleEdit = (index: number) => {
        setNewCard(cards[index]);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        const updated = [...cards];
        updated.splice(index, 1);
        setCards(updated);

        if (editIndex === index) {
            setNewCard({
                lang: "TH",
                set: "",
                img: "",
                type: "",
                world: "",
                size: 1,
                atk: 0,
                cri: 0,
                def: 0,
                name: "",
                attibute: "",
                illust: "",
                effect: ""
            });
            setEditIndex(null);
        }
    };

    const handleCopyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(cards, null, 2))
            .then(() => alert('คัดลอก JSON แล้ว!'))
            .catch(() => alert('ไม่สามารถคัดลอก JSON ได้'));
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            {/* ปุ่มแสดง JSON */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowJsonPopup(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    📦 แสดง JSON
                </button>
            </div>

            {/* ฟอร์มกรอก */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {Object.entries(newCard).map(([key, value]) => (
                    key === 'effect' ? (
                        <textarea
                            key={key}
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded resize-y min-h-[60px]"
                            placeholder={key}
                        />
                    ) : (
                        <input
                            key={key}
                            type="text"
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded"
                            placeholder={key}
                        />
                    )
                ))}

                <button
                    onClick={handleAddOrEdit}
                    className={`${editIndex !== null ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'
                        } text-white py-2 rounded col-span-full`}
                >
                    {editIndex !== null ? 'บันทึกการแก้ไข' : 'เพิ่มข้อมูล'}
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-gray-900 text-white shadow-md rounded-md p-4 relative">
                        <img src={card.img} alt={card.name} className="w-full h-48 object-cover mb-3 rounded" />
                        <h3 className="font-bold text-lg">{card.name}</h3>
                        <p>Type: {card.type}</p>
                        <p>World: {card.world}</p>
                        <p>ATK: {card.atk} | CRI: {card.cri} | DEF: {card.def}</p>
                        <p className="italic text-sm text-gray-400">Effect: {card.effect}</p>
                        <div className="absolute top-2 right-2 space-x-2">
                            <button
                                onClick={() => handleEdit(index)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                                แก้ไข
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                ลบ
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup JSON */}
            {showJsonPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded shadow-lg max-w-3xl w-full relative">
                        <h2 className="text-xl font-bold mb-4">📦 JSON ข้อมูล</h2>
                        <pre className="bg-gray-800 p-4 rounded text-sm max-h-[60vh] overflow-auto whitespace-pre-wrap">
                            {JSON.stringify(cards, null, 2)}
                        </pre>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleCopyJson}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                📋 Copy JSON
                            </button>
                            <button
                                onClick={() => setShowJsonPopup(false)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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

export default CardManager;
