'use client'

import { suits, cards } from '../constants.mjs';
import { shuffleArray, buildDeck, deal } from "../cardUtilities.mjs";

export default function DealButton() {
  const onClickForDeal = () => {
    const deck = buildDeck(suits, cards);
    const shuffledDeck = shuffleArray(deck);
    let tableaus = deal(shuffledDeck)
    return true;
  }
  return (
    <button onClick={onClickForDeal}>Deal</button>
  );
}
