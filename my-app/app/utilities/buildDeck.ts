import { PileInterface } from "@/app/types/solitaire.types";
const buildDeck = (fullDeck: string[] = []) => {
  const data : PileInterface = {
    sequence: [],
    meta: {}
  };
  fullDeck.forEach((card) => {
    data.sequence.push(card);
    data.meta[card] = {
      isFaceUp : false,
      isDraggable: false,
    }
  });
  return data;
}

export default buildDeck