import { cards } from "@/app/constants";
import {
  SuitInterface,
  CardFaceInterface,
  CardInterface,
} from "@/app/types/solitaire.types";
import { isCardRed } from "@/app/utilities";

const canCardBeAddedToTableauPile = (
  card: CardInterface,
  targetSequence: string[] = [],
) => {
  const [cardFace, suit] = card.split(":") as [
    CardFaceInterface,
    SuitInterface,
  ];
  let topCardOfSequenceValue = 14;
  const cardValue = cards[cardFace];
  const topCardOfSequence = targetSequence[targetSequence.length - 1] || ":";
  const [topCardOfSequenceFace, topCardOfSequenceSuit] =
    topCardOfSequence.split(":") as [CardFaceInterface, SuitInterface];
  if (topCardOfSequenceFace) {
    topCardOfSequenceValue = cards[topCardOfSequenceFace];
  }

  if (isCardRed(card) && isCardRed(topCardOfSequence)) {
    return false;
  }
  if (topCardOfSequenceValue - 1 !== cardValue) {
    return false;
  }

  console.log(`canCardBeAddedToTableauPile: 
  suit: ${suit} which should be a different color than targetBuildPileSuit: ${topCardOfSequenceSuit}
  value: ${cardValue} which should be sequential to topCardOfSequenceValue: ${topCardOfSequenceValue}`);

  return true;
};

export default canCardBeAddedToTableauPile;
