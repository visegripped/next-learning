"use client";
import { Dispatch } from "react";
import { useSolitaireContext } from "@/app/context/Solitaire.context";
import { ActionInterface } from "@/app/reducers/solitaire.reducer";
import Pile from "@/app/components/pile/Pile";
import {
  PilesInterface,
  PileIdsInterface,
  CardInterface,
  SuitInterface,
} from "@/app/types/solitaire.types";
import { canCardBeAddedToBuildPile } from "@/app/utilities";
import styles from "./WastePile.module.css";

export default function WastePile() {
  const {
    state,
    dispatch,
  }: { state: PilesInterface; dispatch: Dispatch<ActionInterface> } =
    useSolitaireContext();
  const wasteDoubleClickHandler = (
    event: React.BaseSyntheticEvent,
    card: CardInterface,
  ) => {
    const suit = card.split(":")[1] as SuitInterface;
    const targetBuildPile: PileIdsInterface = `build_${suit}`;
    if (
      canCardBeAddedToBuildPile(card, state[targetBuildPile].sequence, suit)
    ) {
      dispatch({
        type: "moveCardBetweenPiles",
        sourcePile: "waste",
        targetPile: targetBuildPile,
        card,
        isFaceUp: true,
        isDraggable: true,
      });
      dispatch({
        targetPile: targetBuildPile,
        type: "makeOnlyLastCardInPileDraggable",
      });
    }
  };
  return (
    <Pile
      cssClassName={styles.cards}
      doubleClickHandlerForLastCard={wasteDoubleClickHandler}
      pileId="waste"
    />
  );
}
