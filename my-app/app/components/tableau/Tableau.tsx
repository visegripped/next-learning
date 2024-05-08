"use client";
import { Dispatch } from "react";
import Pile from "@/app/components/pile/Pile";
import { useSolitaireContext } from "@/app/context/Solitaire.context";
import { ActionInterface } from "@/app/reducers/solitaire.reducer";
import { canCardBeAddedToBuildPile } from "@/app/utilities";
import { PilesInterface } from "@/app/types/solitaire.types";

export default function Tableau() {
  const {
    state,
    dispatch,
  }: { state: PilesInterface; dispatch: Dispatch<ActionInterface> } =
    useSolitaireContext();

  const cardDoubleClickHandler = (
    event: React.BaseSyntheticEvent,
    card: string,
  ) => {
    const [face, suit] = card.split(":");
    const targetBuildPile = `build_${suit}`;
    if (
      canCardBeAddedToBuildPile(card, state[targetBuildPile].sequence, suit)
    ) {
      const originPileId = event.target.closest("ol").dataset.pile;
      dispatch({
        type: "moveCardBetweenPiles",
        sourcePile: originPileId,
        targetPile: targetBuildPile,
        card,
        isFaceUp: true,
        isDraggable: true,
      });
      dispatch({
        targetPile: targetBuildPile,
        type: "makeOnlyLastCardInPileDraggable",
      });
      dispatch({
        targetPile: originPileId,
        type: "makeLastCardInPileFaceUp",
      });
      dispatch({
        targetPile: originPileId,
        type: "makeAllFaceUpCardsInPileDraggable",
      });
    }
  };
  return (
    <>
      {(() => {
        const elements = [];
        const numTableaus = 7;
        for (let i = 0; i < numTableaus; i++) {
          elements.push(
            <div
              className="bg-slate-600 grow mx-2 justify-center"
              data-tableau-pile={i}
              key={`tableau_${i}`}
              id={`tableau_${i}`}
            >
              <Pile
                doubleClickHandlerForLastCard={cardDoubleClickHandler}
                pileId={`tableau_${i}`}
                droppable={true}
              />
            </div>,
          );
        }
        return elements;
      })()}
    </>
  );
}
