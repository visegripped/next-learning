"use client";

import Pile from "@/app/components/pile/Pile";
import { cards } from "@/app/constants.mjs";
import { ReactEventHandler } from "react";

interface TableauProps {
  tryAddingCardToBuildingPile: Function;
}

export default function Tableau(props: TableauProps) {
  const {
    tryAddingCardToBuildingPile,
  } = props;

  const cardDoubleClickHandler = (event: ReactEventHandler, cardProps: string) => {
    console.log(' -> card?', cardProps)
    // const { card } = cardProps;
    // if (tryAddingCardToBuildingPile(card, cards, buildingPiles)) {
    //   const cardTableauPile = event.target
    //     .closest("[data-tableau-pile]")
    //     .getAttribute("data-tableau-pile");
    //   const pileId = `tableauPile${cardTableauPile}`;
    //   const newPile = tableauPiles[pileId].pile;
    //   newPile.pop();
    //   tableauPiles[pileId].update(newPile);
    // }
  };
  return (
    <>
      {(() => {
        const elements = [];
        const numTableaus = 6;
        for (let i = 0; i < numTableaus; i++) {
          elements.push(
            <div
              className="bg-slate-600 grow mx-2 justify-center"
              data-tableau-pile={i}
              key={`tableau_${i}`}
              id={`tableau_${i}`}
            >
              <Pile
                doubleClickHandler={cardDoubleClickHandler}
                pileId={`tableau_${i}`}
              />
            </div>
          );
        }

        return elements;
      })()}
    </>
  );
}
