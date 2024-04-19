'use client';
import { useReducer, useState } from 'react';
import { numTableaus, suits, cards } from '../../constants.mjs';
import { shuffleArray, buildDeck, deal } from "../../cardUtilities.mjs";
import Tableau from '../tableau/Tableau';
import Card from '../card/Card';

//solitaire anatomy: https://www.britannica.com/topic/solitaire-card-game

export default function Solitaire(props) {
  console.log(` These are the props for home: `, props);
  // we can use localStorage to save games in progress.
  const deck = buildDeck(suits, cards);
  const shuffledDeck = shuffleArray(deck);
  let tableaus = deal(shuffledDeck);
  const wasteReducer = (state, action) => {
    switch (action.type) {
      case 'addCard': {
        // this needs to pop a card off of the deck reducer
        return [...state, action.card];
      }
      case 'resetCards': {
        // this needs to move all cards back to the shuffled deck
        return []
      }
    }
  };
  const [ waste, updateWaste ] = useReducer(wasteReducer, []);

  return (
    <>
      <section className="mt-20 bg-slate-800 size-full flex">
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">heart</div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">spade</div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">diamond</div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">club</div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">revealed from deck
        <Card isFaceUp={true} card={shuffledDeck[shuffledDeck.length - 1]} />
        </div>
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">
          The deck ({shuffledDeck.length} cards - 1 revealed)
          <ul>
          {(() => {
          const elements = [];
          for (let i = 0; i < shuffledDeck.length; i++) {
            elements.push(
              <li
                key={`tableau-${i}`}
              >
                <Card isFaceUp={(i === shuffledDeck.length)} card={shuffledDeck[i]} />
              </li>
            );
          }

          return elements;
        })()}
        </ul>
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
