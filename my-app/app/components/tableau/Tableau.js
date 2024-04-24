"use client";

import Card from "../card/Card";
import { numTableaus, cards } from "@/app/constants.mjs";

export default function Tableau(props) {
  const { tableauPiles = {}, tryAddingCardToBuildingPile, buildingPiles } = props;
  const cardDoubleClickHandler = (event, cardProps) => {
    const { card } = cardProps;
    if(tryAddingCardToBuildingPile(card, cards, buildingPiles)){
      const cardTableauPile = event.target.closest('[data-tableau-pile]').getAttribute('data-tableau-pile')
      const pileId = `tableauPile${cardTableauPile}`;
      const newPile = tableauPiles[pileId].pile;
      newPile.pop();
      tableauPiles[pileId].update(newPile);
    }

  };
  return (
    <>
      {(() => {
        const elements = [];
        for (let i = 0; i <= numTableaus; i++) {
          const cards = tableauPiles[`tableauPile${i}`].pile;
          elements.push(
            <div
              className="bg-slate-600 grow mx-2 p-4 justify-center"
              data-tableau-pile={i}
              key={`tableau-${i}`}
            >
              <ul>
                {cards.map((card, index) => (
                  <li key={card}>
                    <Card
                      isFaceUp={index === cards.length - 1}
                      card={card}
                      doubleClickHandler={index === cards.length - 1 ? cardDoubleClickHandler : () => {}}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return elements;
      })()}
    </>
  );
}
