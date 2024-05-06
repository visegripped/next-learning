import { cards } from "@/app/constants";
import { SuitInterface, CardFaceInterface, CardInterface } from "@/app/types/solitaire.types";

const canCardBeAddedToBuildStack = (card: CardInterface, sequence: string[] = [], targetBuildPileSuit: SuitInterface) => {
  const [cardFace, suit] = card.split(":") as [CardFaceInterface, SuitInterface];
  const cardValue = cards[cardFace];
  let topCardOfSequenceValue = 1;
  const topCardOfSequence = sequence.pop() || ':';
  const [topCardOfSequenceFace] = topCardOfSequence.split(":") as [CardFaceInterface];
  if(topCardOfSequenceFace) {
    topCardOfSequenceValue = cards[topCardOfSequenceFace] - 1;
  }
  if(suit === targetBuildPileSuit && cardValue === topCardOfSequenceValue) {
    return true;
  }
  return false;
}

export default canCardBeAddedToBuildStack;