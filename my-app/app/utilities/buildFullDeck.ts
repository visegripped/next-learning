import { CardFaceInterface, SuitInterface } from "@/app/types/solitaire.types";
import { cards, suits } from "@/app/constants";

const buildFullDeck = () => {
  const deck: string[] = [];
  suits.forEach((suit: SuitInterface) => {
    const cardKeys = Object.keys(cards);
    cardKeys.forEach((card: CardFaceInterface) => {
      deck.push(`${card}:${suit}`);
    });
  });
  return deck;
};

export default buildFullDeck;
