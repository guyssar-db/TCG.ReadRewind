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
                ? '/images/bf_key/nctext.webp'
                : '/images/bf_key/bnctext.webp',
            size: 12,
        },

        '[@buddygift]': { src: '/images/bf_key/BuddyGift.webp', size: 20 },
        '[@chaos]': { src: '/images/bf_key/CHAOS Territory.webp', size: 20 },
        '[@duo]': { src: '/images/bf_key/Duo.webp', size: 20 },
        '[@womni]': { src: '/images/bf_key/Omni Lord-1.webp', size: 20 },
        '[@pomni]': { src: '/images/bf_key/Omni Lord-2.webp', size: 20 },
        '[@weponry]': { src: '/images/bf_key/Weaponry Link.webp', size: 20 },
        
        //redskill
        '[@2attack]': { src: '/images/bf_key/Double Attack.webp', size: 20 },
        '[@3attack]': { src: '/images/bf_key/TripleAttack.webp', size: 20 },
        '[@4attack]': { src: '/images/bf_key/Quadruple Attack.webp', size: 20 },
        '[@6attack]': { src: '/images/bf_key/Hextuple Attack.webp', size: 20 },

        '[@soulguard]': { src: '/images/bf_key/Soulguard.webp', size: 20 },
        '[@penetrate]': { src: '/images/bf_key/Penetrate.webp', size: 20 },
        '[@move]': { src: '/images/bf_key/Move.webp', size: 20 },
        '[@counter]': { src: '/images/bf_key/Counter.webp', size: 20 },
        '[@crossnize]': { src: '/images/bf_key/Crossnize.webp', size: 20 },
        '[@ambush]': { src: '/images/bf_key/Ambush.webp', size: 20 },
        '[@equipchange]': { src: '/images/bf_key/Equipment Change.webp', size: 20 },
        '[@impacttransform]': { src: '/images/bf_key/Impact Transform.webp', size: 20 },
        '[@purge]': { src: '/images/bf_key/Purge.webp', size: 20 },

        '[@lifelink1]': { src: '/images/bf_key/Life Link 1.webp', size: 20 },
        '[@lifelink2]': { src: '/images/bf_key/Life Link 2.webp', size: 20 },
        '[@lifelink3]': { src: '/images/bf_key/Life Link 3.webp', size: 20 },
        '[@lifelink4]': { src: '/images/bf_key/Life Link 4.webp', size: 20 },
        '[@lifelink5]': { src: '/images/bf_key/Life Link 5.webp', size: 20 },
        '[@lifelinklose]': { src: '/images/bf_key/Life Lose.webp', size: 20 },
        
        //blackcost
        '[@callcost]': { src: '/images/bf_key/Call Cost.webp', size: 20 },
        '[@castcost]': { src: '/images/bf_key/Cast Cost.webp', size: 20 },
        '[@equipcost]': { src: '/images/bf_key/Equip Cost.webp', size: 20 },
        
        //1,an per turn,game
        '[@1/turn]': { src: '/images/bf_key/1 per Turn Rag.webp', size: 20 },
        '[@an/turn]': { src: '/images/bf_key/Ablility Name.webp', size: 20 },
        '[@1/game]': { src: '/images/bf_key/1 per Game Rag.webp', size: 20 },
        '[@1/set]': { src: '/images/bf_key/1 per set.webp', size: 20 },

        //custom
        '[@bloodlust]': { src: '/images/bf_key/Bloodlust.webp', size: 20 },
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
