import React from 'react';
import { useTheme } from '../context/ThemeContext';

type CardEffectProps = {
    effect: string;
};

const CardEffect: React.FC<CardEffectProps> = ({ effect }) => {
    const { isDarkMode } = useTheme();

    const tokenToImage: Record<string, { src: string; size: number }> = {
        '[@]': {
            src: isDarkMode
                ? '/images/bf_key/nctext.png'
                : '/images/bf_key/bnctext.png',
            size: 12,
        },

        '[@2attack]': { src: '/images/bf_key/Double Attack.png', size: 20 },
        '[@bloodlust]': { src: '/images/bf_key/Bloodlust.png', size: 20 },
        '[@soulguard]': { src: '/images/bf_key/Soulguard.png', size: 20 },
        '[@buddygift]': { src: '/images/bf_key/BuddyGift.png', size: 20 },
        '[@penetrate]': { src: '/images/bf_key/Penetrate.png', size: 20 },

        '[@callcost]': { src: '/images/bf_key/Call Cost.png', size: 20 },
        '[@castcost]': { src: '/images/bf_key/Cast Cost.png', size: 20 },

        '[@1/turn]': { src: '/images/bf_key/1 per Turn Rag.png', size: 20 },
        '[@an/turn]': { src: '/images/bf_key/Ablility Name.png', size: 20 },
        '[@1/game]': { src: '/images/bf_key/1 per Game Rag.png', size: 20 },
        '[@1/set]': { src: '/images/bf_key/1 per set.png', size: 20 },
    };

    const regex = new RegExp(
        `(${Object.keys(tokenToImage).map(k => k.replace(/[[\]\\]/g, '\\$&')).join('|')})`,
        'g'
    );

    return (
        <>
            {effect.split('\n').map((line, idx) => {
                const parts = line.split(regex);
                return (
                    <React.Fragment key={idx}>
                        {parts.map((part, i) => {
                            const token = tokenToImage[part];
                            if (token) {
                                return (
                                    <img
                                        key={i}
                                        src={token.src}
                                        alt={part}
                                        className="inline align-text-bottom"
                                        style={{ height: `${token.size}px`, verticalAlign: 'middle' }}
                                    />
                                );
                            }
                            return <span key={i}>{part}</span>;
                        })}
                        <br />
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default CardEffect;
