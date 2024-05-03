import { useReducer, useState } from "react";
import { CardInterface, PilesInterface } from "@/app/types/solitaire.types";


export type ActionInterface = {
  type: 'moveCardToPile' | 'removeCardFromPile' | 'movePile' | 'movePileByCardId'
}

export const solitaireReducer = (state: PilesInterface, action: ActionInterface) => {
  switch (action.type) {
    case 'moveCardToPile':
      return false;
    case 'removeCardFromPile':
      return false;
    default:
      return state;
  }
};

export default solitaireReducer;