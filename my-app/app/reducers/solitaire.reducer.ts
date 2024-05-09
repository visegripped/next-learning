import { useReducer, useState } from "react";
import { PilesInterface, PileIdsInterface } from "@/app/types/solitaire.types";

export type ActionInterface = {
  type:
    | "moveCardBetweenPiles"
    | "removeCardFromPile"
    | "movePile"
    | "movePileByCardId"
    | "makeOnlyLastCardInPileDraggable"
    | "makeAllFaceUpCardsInPileDraggable"
    | "makeLastCardInPileFaceUp";
  sourcePile?: PileIdsInterface;
  targetPile?: PileIdsInterface;
  card?: string;
  isFaceUp?: boolean;
  isDraggable?: boolean;
};

export const solitaireReducer = (
  state: PilesInterface,
  action: ActionInterface,
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
      console.log(
        `SourceIndex: ${sourceIndex} and sourceSequenceLength: ${source.sequence.length}`,
      );
      if (target.sequence.indexOf(card) >= 0) {
        //card is already in target pile
      } else if (
        targetPile?.includes("tableau") &&
        sourceIndex < source.sequence.length - 1
      ) {
        // need to move a series of cards, preserving order.
        console.log(" move a series of cards - not done yet. ");
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
    case "removeCardFromPile":
      return false;
      break;
    default:
      return state;
  }
};

export default solitaireReducer;
