"use client";

// import { suits, cards } from '../models.mjs';
import Card from "../card/Card";

export default function Tableau(props) {
  const {cards} = props;
  const onDoubleClickForTableau = () => {
    console.log('card was double clicked');
    // if top card is an ace, move to appropriate pile
    return true;
  };
  return (
    <ul>
      {cards.map((card, index) => (
        <li key={card}>
          <Card isFaceUp={(index === cards.length - 1)} card={card} faceUpCardClickHandler={onDoubleClickForTableau} />
        </li>
      ))}
    </ul>
  );
}
