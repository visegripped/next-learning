"use client";
import { Dispatch } from "react";
import Pile from "@/app/components/pile/Pile";
import { useSolitaireContext } from "@/app/context/Solitaire.context";
import { ActionInterface } from "@/app/reducers/solitaire.reducer";
import { canCardBeAddedToBuildPile } from "@/app/utilities";
import {
  PilesInterface,
  CardInterface,
  PileIdsInterface,
  SuitInterface,
} from "@/app/types/solitaire.types";
import styles from "./Tableau.module.css";

export default function Tableau() {
  const {
    state,
    dispatch,
  }: { state: PilesInterface; dispatch: Dispatch<ActionInterface> } =
    useSolitaireContext();

  const cardDoubleClickHandler = (
    event: React.BaseSyntheticEvent,
    card: CardInterface,
  ) => {
    const suit = card.split(":")[1] as SuitInterface;
    const targetBuildPile = `build_${suit}` as PileIdsInterface;
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
          const pileId = `tableau_${i}` as PileIdsInterface;
          elements.push(
            <div
              className="bg-slate-600 flex"
              data-tableau-pile={i}
              key={`tableau_${i}`}
              id={`tableau_${i}`}
            >
              <Pile
                doubleClickHandlerForLastCard={cardDoubleClickHandler}
                pileId={pileId}
                cssClassName={styles.cards}
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
