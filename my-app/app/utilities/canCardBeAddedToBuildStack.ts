import { cards } from "@/app/constants";
import { SuitInterface, CardFaceInterface, CardInterface } from "@/app/types/solitaire.types";

const canCardBeAddedToBuildStack = (card: CardInterface, sequence: string[] = []) => {
  console.log('BEGIN canCardBeAddedToBuildStack')
  const [cardFace, suit] = card.split(":") as [CardFaceInterface, SuitInterface];
  const cardValue = cards[cardFace];
  let topCardOfSequenceValue = 0;
  const topCardOfSequence = sequence.pop() || ':';
  const [topCardOfSequenceFace, topCardOfSequenceSuit] = topCardOfSequence.split(":") as [CardFaceInterface, SuitInterface];
  if(topCardOfSequenceFace) {
    topCardOfSequenceValue = cards[topCardOfSequenceFace];
  }
  if(suit != topCardOfSequenceSuit) {
    console.log( ' -> Suits do not match')
    return false;
  }
  if(cardValue !== topCardOfSequenceValue + 1) {
    console.log(' -> cards are not sequential')
    return false;
  }
  return true;
}