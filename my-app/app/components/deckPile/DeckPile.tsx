"use client";
import { Dispatch } from "react";
import { useSolitaireContext } from "@/app/context/Solitaire.context";
import { ActionInterface } from "@/app/reducers/solitaire.reducer";
import Pile from "@/app/components/pile/Pile";
import { PilesInterface, CardInterface } from "@/app/types/solitaire.types";
import styles from "./DeckPile.module.css";

export default function DeckPile() {
  const {
    state,
    dispatch,
  }: { state: PilesInterface; dispatch: Dispatch<ActionInterface> } =
    useSolitaireContext();

  const emptyDeckClickHandler = () => {
    if (state.deck.sequence.length === 0) {
      dispatch({
        type: "movePileToAnotherPile",
        sourcePile: "waste",
        targetPile: "deck",
        isFaceUp: false,
        isDraggable: false,
      });
    }
  };

  const deckClickHandler = (
    event: React.BaseSyntheticEvent,
    card: CardInterface,
  ) => {
    dispatch({
      type: "moveCardBetweenPiles",
      sourcePile: "deck",
      targetPile: "waste",
      card,
      isFaceUp: true,
      isDraggable: true,
    });
    dispatch({
      targetPile: "waste",
      type: "makeOnlyLastCardInPileDraggable",
    });
  };

  return (
    <div
      className="bg-slate-600 flex"
      onDoubleClick={emptyDeckClickHandler}
      data-testid="container_deck"
    >
      <Pile
        pileId="deck"
        clickHandlerForLastCard={deckClickHandler}
        cssClassName={styles.cards}
      />
    </div>
  );
}
