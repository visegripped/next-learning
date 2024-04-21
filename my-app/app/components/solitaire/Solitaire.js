'use client';
import { useReducer, useState } from 'react';
import { numTableaus, suits, cards } from '../../constants.mjs';
import { shuffleArray, buildDeck, deal } from "../../cardUtilities.mjs";
import Tableau from '../tableau/Tableau';
import Card from '../card/Card';
import Pile from '../pile/Pile';

//solitaire anatomy: https://www.britannica.com/topic/solitaire-card-game
//reducer tutorial: https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/

export default function Solitaire(props) {
  // console.log(` These are the props for home: `, props);
  // we can use localStorage to save games in progress.
  const fullDeck = buildDeck(suits, cards);
  const shuffledDeck = shuffleArray(fullDeck);
  let tableaus = deal(shuffledDeck);
  const [pileHeart, updatePileHeart] = useState([]);

  const wasteReducer = (state, action) => {
    switch (action.type) {
      case 'addCard': {
        if(state.includes(action.card)) {
          return state;
        }
        return [...state, action.card];
      }
      case 'moveWasteToDeck': {
        // this needs to move all cards back to the deck and preserve the order.
        return []
      }
      default:
        throw new Error();
    }
  };
  const [ waste, updateWaste ] = useReducer(wasteReducer, []);

  const deckReducer = (state = shuffledDeck, action) => {
    switch (action.type) {
      case 'addCardToWaste': {
        // this needs to pop a card off of the deck reducer and add it to the waste
        const newState = [...state];
        const flippedCard = newState.pop();
        updateWaste({type: 'addCard', card: flippedCard});
        return newState;
      }
      case 'resetDeck': {
        // this needs to move all cards back to the shuffled deck
        return []
      }
      default:
        throw new Error();
    }
  };
  const [ deck, updateDeck ] = useReducer(deckReducer, shuffledDeck);

  const deckClickHandler = () => {
    updateDeck({type: 'addCardToWaste'});
  }

  return (
    <>
      <section className="mt-20 bg-slate-800 size-full flex">
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">heart</div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">spade</div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">diamond</div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">club</div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">
        The waste ({waste.length} cards)
        <Pile areFacedUp='true' cards={waste} />
        </div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">
          The deck ({deck.length} cards)
          <Pile cards={deck} clickHandler={deckClickHandler} />
        </div>
      </section>
      <section className="mt-20 bg-slate-800 size-full flex">
        {(() => {
          const elements = [];

          for (let i = 0; i <= numTableaus; i++) {
            elements.push(
              <div
                className="bg-slate-600 grow mx-2 p-4 justify-center"
                key={`tableau-${i}`}
              >
                <Tableau cards={tableaus[i]} />
              </div>
            );
          }

          return elements;
        })()}
      </section>
    </>
  );
}
