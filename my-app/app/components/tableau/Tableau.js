"use client";

import Card from "../card/Card";
import { numTableaus } from "@/app/constants.mjs";

export default function Tableau(props) {
  const { tableauPiles = {}, tryAddingCardToBuildingPile } = props;
  const cardDoubleClickHandler = (event, cardProps) => {
    console.log(' click event: ', cardProps);
    const cardTableauPile = event.target.closest('[data-tableau-pile]').getAttribute('data-tableau-pile')

    // if(tryAddingCardToBuildingPile(card)){}
  };
  return (
    <>
      {(() => {
        const elements = [];
        for (let i = 0; i <= numTableaus; i++) {
          const cards = tableauPiles[i];
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
