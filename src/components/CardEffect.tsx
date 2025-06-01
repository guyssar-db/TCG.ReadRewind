import React from 'react';

type CardEffectProps = {
  effect: string;
};

const tokenToImage: Record<string, { src: string; size: number }> = {
    '[@]': { src: '/images/bf_key/nctext.png', size: 12 },
    '[@2attack]': { src: '/images/bf_key/Double Attack.png', size: 20 },
    '[@callcost]': { src: '/images/bf_key/Call Cost.png', size: 20 },
    '[@bloodlust]': { src: '/images/bf_key/Bloodlust.png', size: 20 },
  };

const CardEffect: React.FC<CardEffectProps> = ({ effect }) => {
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
        style={{ height: `${token.size}px`,verticalAlign: 'middle'  }}
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
