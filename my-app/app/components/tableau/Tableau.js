"use client";

import Card from "../card/Card";
import { numTableaus } from "@/app/constants.mjs";

export default function Tableau(props) {
  const { tableauPiles = {}, tryAddingCardToBuildingPile } = props;
  const cardDoubleClickHandler = () => {};
  return (
    <>
      {(() => {
        const elements = [];
        for (let i = 0; i <= numTableaus; i++) {
          const cards = tableauPiles[i];
          elements.push(
            <div
              className="bg-slate-600 grow mx-2 p-4 justify-center"
              key={`tableau-${i}`}
            >
              <ul>
                {cards.map((card, index) => (
                  <li key={card}>
                    <Card
                      isFaceUp={index === cards.length - 1}
                      card={card}
                      doubleClickHandler={cardDoubleClickHandler}
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
