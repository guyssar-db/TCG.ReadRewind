import React, { useState } from 'react';
import initialCards from '../database/bf_db.json';
import { useTheme } from '../context/ThemeContext';
import CardEffect from '../components/CardEffect';

type Card = {
    lang: string;
    set: string;
    img: string;
    type: string;
    world: string;
    size: number | null;
    atk: number | null;
    cri: number | null;
    def: number | null;
    name: string;
    attibute: string;
    illust: string;
    effect: string;
};

const worldOptions = [
    "ดราก้อนเวิลด์",
    "สตาร์ดราก้อนเวิลด์",
    "ดาร์คเนสดราก้อนเวิลด์",
    "ฮีโร่เวิลด์",
    "เอนเชนท์เวิดล์",
    "เมจิกเวิลด์",
    "ดันเจี้ยนเวิลด์",
    "แดนเจอร์เวิลด์",
    "เลเจนด์เวิลด์",
    "ลอสต์เวิลด์",
    "คาตานะเวิลด์",
];

const typeOptions = [
    "มอนสเตอร์",
    "เวทมนตร์",
    "ไอเท็ม",
    "ไม้ตาย",
    "มอนสเตอร์ไม้ตาย",
    "บัดดี้กิฟต์",
];

const CardManager: React.FC = () => {
    const [cards, setCards] = useState<Card[]>(initialCards);
    const { isDarkMode } = useTheme();
    const [newCard, setNewCard] = useState<Card>({
        lang: "TH",
        set: "",
        img: "/images/buddyfight_img/",
        type: "",
        world: "",
        size: null,
        atk: null,
        cri: null,
        def: null,
        name: "",
        attibute: "",
        illust: "",
        effect: ""
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [showJsonPopup, setShowJsonPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            img: "/images/buddyfight_img/",
            type: "",
            world: "",
            size: null,
            atk: null,
            cri: null,
            def: null,
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
                img: "/images/buddyfight_img/",
                type: "",
                world: "",
                size: null,
                atk: null,
                cri: null,
                def: null,
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
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowJsonPopup(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    📦 แสดง JSON
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {Object.entries(newCard).map(([key, value]) => {
                    const commonClass = `border p-2 rounded w-full ${isDarkMode
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-black'}`;

                    if (key === 'effect') {
                        return (
                            <div key={key} className="sm:col-span-2 w-full">
                                <p className="mb-1 capitalize">Effect</p>
                                <textarea
                                    name={key}
                                    value={value ?? ''}
                                    onChange={handleChange}
                                    className={`${commonClass} min-h-[150px] resize-y`}
                                />
                            </div>
                        );
                    }

                    if (key === 'world') {
                        return (
                            <div key={key} className="w-full">
                                <p className="mb-1">World</p>
                                <select
                                    name={key}
                                    value={value ?? ''}
                                    onChange={handleChange}
                                    className={commonClass}
                                >
                                    <option value="">-- เลือกโลก --</option>
                                    {worldOptions.map((world) => (
                                        <option key={world} value={world}>{world}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    }

                    if (key === 'type') {
                        return (
                            <div key={key} className="w-full">
                                <p className="mb-1">type</p>
                                <select
                                    name={key}
                                    value={value ?? ''}
                                    onChange={handleChange}
                                    className={commonClass}
                                >
                                    <option value="">-- เลือกประเภท --</option>
                                    {typeOptions.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    }

                    return (
                        <div key={key} className="w-full">
                            <p className="mb-1 capitalize">{key}</p>
                            <input
                                type="text"
                                name={key}
                                value={value ?? ''}
                                onChange={handleChange}
                                className={commonClass}
                                placeholder={key}
                            />
                        </div>
                    );
                })}

                <button
                    onClick={handleAddOrEdit}
                    disabled={!newCard.name || !newCard.img}
                    className={`${editIndex !== null
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                        } text-white py-2 rounded col-span-full ${!newCard.name || !newCard.img ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {editIndex !== null ? 'บันทึกการแก้ไข' : 'เพิ่มข้อมูล'}
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="ค้นหาตามชื่อการ์ด..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full border p-2 rounded ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards
                    .filter((card) =>
                        card.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((card, index) => (
                        <div key={index} className={`flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} rounded-md shadow-md p-4 w-full`}>
                            <div className="flex flex-col lg:flex-row items-start space-x-4">
                                <div className='flex p-1 w-full lg:w-fit justify-center'>
                                <img
                                    src={card.img}
                                    alt={card.name}
                                    className={`rounded transition-transform duration-300 ${card.type === "ไม้ตาย" || card.type.includes("มอนสเตอร์ไม้ตาย") ? "rotate-90 w-56 h-40 -translate-y-[-33px]" : "w-40 h-56 object-cover"}`}
                                />
                                </div>

                                <div className={`flex flex-col items-end justify-start flex-1 space-y-2 w-full ${card.type === "ไม้ตาย" || card.type.includes("มอนสเตอร์ไม้ตาย") ? "mt-21 lg:mt-5" : "mt-4"}`}>
                                    <div className='flex justify-between w-full'>
                                        <h1>{card.name}</h1>
                                    </div>
                                    <div className="relative mt-4 min-h-[60px] w-full">
                                        <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-200 border-gray-300 text-black'} bottom-2 right-2 bg-opacity-70 text-xs p-2 rounded-md w-full`}>
                                            <CardEffect effect={card.effect} />
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="bg-yellow-500 text-white px-3 h-10 rounded hover:bg-yellow-600"
                                        >
                                            แก้ไข
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="bg-red-500 text-white px-3 h-10 rounded hover:bg-red-600"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {showJsonPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded shadow-lg max-w-3xl w-full relative">
                        <h2 className="text-xl font-bold mb-4">📦 ข้อมูล JSON</h2>
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
