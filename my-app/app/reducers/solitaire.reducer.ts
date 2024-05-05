import { useReducer, useState } from "react";
import {
  CardInterface,
  PilesInterface,
  PileIdsInterface,
} from "@/app/types/solitaire.types";

export type ActionInterface = {
  type:
    | "moveCardBetweenPiles"
    | "removeCardFromPile"
    | "movePile"
    | "movePileByCardId"
    | "makeOnlyLastCardInPileDraggable";
  sourcePile: PileIdsInterface;
  targetPile: PileIdsInterface;
  card: string;
  isFaceUp: boolean;
  isDraggable: boolean;
};

export const solitaireReducer = (
  state: PilesInterface,
  action: ActionInterface
) => {
  const newState = { ...state };
  const { sourcePile, targetPile, card, isFaceUp, isDraggable } = action;
  console.log(`useReducer - ${action.type}
  card: ${card}
  sourcePile: ${sourcePile}
  targetPile: ${targetPile}
  `);
  const source = newState[sourcePile];
  const target = newState[targetPile];
  switch (action.type) {
    case "moveCardBetweenPiles":
      const sourceIndex = source.sequence.indexOf(card);
      if (target.sequence.indexOf(card) >= 0) {
        //card is already in target pile
      } else {
        source.sequence.splice(sourceIndex, 1);
        delete newState[sourcePile].meta[card];
        newState[targetPile].sequence.push(card);
        newState[targetPile].meta[card] = {
          isFaceUp,
          isDraggable,
        };
      }
      return newState;
    case "makeOnlyLastCardInPileDraggable":
      target.sequence.forEach((card, index, arr) => {
        if (index === arr.length - 1) {
          target.meta[card].isDraggable = true;
        } else {
          target.meta[card].isDraggable = false;
        }
      });
      return newState;
    case "removeCardFromPile":
      return false;
      break;
    default:
      return state;
  }
};

export default solitaireReducer;
