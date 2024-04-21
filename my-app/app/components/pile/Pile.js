"use client";

// import { suits, cards } from "../../constants.mjs";
import Card from '../card/Card'

export default function Pile(props) {
  const { cards = [], areFacedUp, doubleClickHandler, clickHandler } = props;
  return (
    <ol className="list-decimal list-inside">
      {(() => {
        const elements = [];
        for (let i = 0; i < cards.length; i++) {
          const singleClick =
            i === cards.length-1 && typeof clickHandler === "function"
              ? clickHandler
              : () => {console.log('Pile: no click handler defined')};
          const doubleClick =
            i === cards.length-1 && typeof doubleClickHandler === "function"
              ? doubleClickHandler
              : () => {};
          elements.push(
            <li key={`cards-${i}`}>
              <Card
                isFaceUp={areFacedUp}
                card={cards[i]}
                clickHandler={singleClick}
                doubleClickHandler={doubleClick}
              />
            </li>
          );
        }

        return elements;
      })()}
    </ol>
  );
}
