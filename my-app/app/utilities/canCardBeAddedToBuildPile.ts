import { cards } from "@/app/constants";
import {
  SuitInterface,
  CardFaceInterface,
  CardInterface,
} from "@/app/types/solitaire.types";

const canCardBeAddedToBuildPile = (
  card: CardInterface,
  targetSequence: string[] = [],
  targetBuildPileSuit: SuitInterface,
) => {
  const [cardFace, suit] = card.split(":") as [
    CardFaceInterface,
    SuitInterface,
  ];
  const cardValue = cards[cardFace];
  let topCardOfSequenceValue = 0;
  const topCardOfSequence = targetSequence[targetSequence.length - 1] || ":";
  const [topCardOfSequenceFace] = topCardOfSequence.split(":") as [
    CardFaceInterface,
  ];
  if (topCardOfSequenceFace) {
    topCardOfSequenceValue = cards[topCardOfSequenceFace];
  }
  // console.log(`canCardBeAddedToBuildStack:
  // suit: ${suit} which should match targetBuildPileSuit: ${targetBuildPileSuit}
  // value: ${cardValue} which should be sequential to topCardOfSequenceValue: ${topCardOfSequenceValue}`);
  if (
    suit === targetBuildPileSuit &&
    cardValue - 1 === topCardOfSequenceValue
  ) {
    return true;
  }
  return false;
};

export default canCardBeAddedToBuildPile;
