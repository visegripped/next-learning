import { useReducer, useState } from "react";
import { CardInterface, PilesInterface, PileIdsInterface } from "@/app/types/solitaire.types";


export type ActionInterface = {
  type: 'moveCardBetweenPiles' | 'removeCardFromPile' | 'movePile' | 'movePileByCardId';
  sourcePile: PileIdsInterface;
  destinationPile: PileIdsInterface;
  card: string;
  isFaceUp: boolean;
  isDraggable: boolean;
}

export const solitaireReducer = (state: PilesInterface, action: ActionInterface) => {
  switch (action.type) {
    case 'moveCardBetweenPiles':
      const { sourcePile, destinationPile, card, isFaceUp, isDraggable} = action;
      const source = state[sourcePile];
      const destination = state[destinationPile];
      const sourceIndex = source.sequence.indexOf(card);
      if(destination.sequence.indexOf(card) >= 0) {
        //card is already in destination pile
      } else {
        source.sequence.splice(sourceIndex, 1);
        delete state[sourcePile].meta[card];
        state[destinationPile].meta[card] = {
          isFaceUp,
          isDraggable,
        }
      }
      return state;
    case 'removeCardFromPile':
      return false;
    default:
      return state;
  }
};

export default solitaireReducer;