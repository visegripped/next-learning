import { useReducer, useState } from "react";
import { PilesInterface, PileIdsInterface } from "@/app/types/solitaire.types";

export type ReducerTypesInterface = 
    | "moveCardBetweenPiles"
    | "movePileToAnotherPile"
    | "makeOnlyLastCardInPileDraggable"
    | "makeAllFaceUpCardsInPileDraggable"
    | "makeLastCardInPileFaceUp";

export type ActionInterface = {
  type: ReducerTypesInterface;
  sourcePile?: PileIdsInterface;
  targetPile?: PileIdsInterface;
  card?: string;
  isFaceUp?: boolean;
  isDraggable?: boolean;
};

export const validateReducerActionsByType = (action: ActionInterface) => {
  if(!action.type) {
    return false;
  }
  switch (action.type) {
    case "moveCardBetweenPiles":
      return !!(action.sourcePile && action.targetPile && action.card && action.isFaceUp !== undefined && action.isDraggable !== undefined)
    case "movePileToAnotherPile":
      return !!(action.sourcePile && action.targetPile && action.isFaceUp !== undefined && action.isDraggable !== undefined)
    case "makeOnlyLastCardInPileDraggable":
    case "makeAllFaceUpCardsInPileDraggable":
    case "makeLastCardInPileFaceUp":
      return !!(action.targetPile && action.isFaceUp !== undefined && action.isDraggable !== undefined)
    default:
      return false;
  }
}

export const solitaireReducer = (
  state: PilesInterface,
  action: ActionInterface,
) => {
  const newState = { ...state };
  const { sourcePile, targetPile, card, isFaceUp, isDraggable } = action;
  // console.log(`useReducer - ${action.type}
  // card: ${card}
  // sourcePile: ${sourcePile}
  // targetPile: ${targetPile}
  // `);
  if(!validateReducerActionsByType(action)) {
    return false;
  }
  const source = sourcePile ? newState[sourcePile] : {sequence: [], meta: {}};
  const target = targetPile ? newState[targetPile] : {sequence: [], meta: {}};
  switch (action.type) {
    case "movePileToAnotherPile":
      if(source.sequence.length) {
        target.sequence = [...source.sequence.reverse()];
        source.sequence = [];
        source.meta = {};
        target.sequence.forEach((card) => {
          target.meta[card] = {
            isFaceUp,
            isDraggable
          }
        })
      }
      return newState;
    case "moveCardBetweenPiles":
      const sourceIndex = source.sequence.indexOf(card);
      // console.log(
      //   `SourceIndex: ${sourceIndex} and sourceSequenceLength: ${source.sequence.length}`,
      // );
      if (target.sequence.indexOf(card) >= 0) {
        //card is already in target pile
      } else if (
        targetPile?.includes("tableau") &&
        sourceIndex < source.sequence.length - 1
      ) {
        // need to move a series of cards, preserving order.
        for (let i = sourceIndex; i < source.sequence.length - 1; i++) {
          const newCard = source.sequence[i];
          newState[targetPile].sequence.push(newCard);
          newState[targetPile].meta[newCard] = {
            isFaceUp: true,
            isDraggable: true,
          };
          delete newState[sourcePile].meta[card];
        }
        source.sequence.splice(
          sourceIndex,
          source.sequence.length - sourceIndex,
        );
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
    case "makeAllFaceUpCardsInPileDraggable":
      target.sequence.forEach((card) => {
        if (target.meta[card].isFaceUp === true) {
          target.meta[card].isDraggable = true;
        }
      });
      return newState;
    case "makeLastCardInPileFaceUp":
      //pile could be empty.
      if (target?.sequence?.length) {
        const lastCard = target.sequence[target.sequence.length - 1];
        target.meta[lastCard].isFaceUp = true;
      }
      return newState;
    default:
      return state;
  }
};

export default solitaireReducer;
