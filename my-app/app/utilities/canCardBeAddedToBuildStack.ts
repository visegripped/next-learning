import { cards } from "@/app/constants";
import {
  SuitInterface,
  CardFaceInterface,
  CardInterface,
} from "@/app/types/solitaire.types";

const canCardBeAddedToBuildStack = (
  card: CardInterface,
  targetSequence: string[] = [],
  targetBuildPileSuit: SuitInterface,
) => {
  const [cardFace, suit] = card.split(":") as [
    CardFaceInterface,
    SuitInterface,
  ];
  const cardValue = cards[cardFace];
  let topCardOfSequenceValue = 1;
  const topCardOfSequence = targetSequence.pop() || ":";
  const [topCardOfSequenceFace] = topCardOfSequence.split(":") as [
    CardFaceInterface,
  ];
  if (topCardOfSequenceFace) {
    topCardOfSequenceValue = cards[topCardOfSequenceFace] - 1;
  }
  console.log(`canCardBeAddedToBuildStack: 
  suit: ${suit} which should match targetBuildPileSuit: ${targetBuildPileSuit}
  value: ${cardValue} which should be sequential to topCardOfSequenceValue: ${topCardOfSequenceValue}`)
  if (suit === targetBuildPileSuit && cardValue === topCardOfSequenceValue) {
    return true;
  }
  return false;
};

export default canCardBeAddedToBuildStack;
