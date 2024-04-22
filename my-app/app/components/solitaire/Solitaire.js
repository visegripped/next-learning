"use client";
import { useReducer, useState } from "react";
import { numTableaus, suits, cards } from "../../constants.mjs";
import { shuffleArray, buildDeck, deal } from "../../cardUtilities.mjs";
import Tableau from "../tableau/Tableau";
import Card from "../card/Card";
import Pile from "../pile/Pile";

//solitaire anatomy: https://www.britannica.com/topic/solitaire-card-game
//reducer tutorial: https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/

export default function Solitaire(props) {
  // console.log(` These are the props for home: `, props);
  // we can use localStorage to save games in progress.
  const fullDeck = buildDeck(suits, cards);
  const shuffledDeck = shuffleArray(fullDeck);
  let tableaus = deal(shuffledDeck);
  const [heartPile, heartPileUpdate] = useState([]);
  const [spadePile, spadePileUpdate] = useState([]);
  const [diamondPile, diamondPileUpdate] = useState([]);
  const [clubPile, clubPileUpdate] = useState([]);

  const buildingPiles = {
    heart: {
      pile: heartPile,
      update: heartPileUpdate,
    },
    spade: {
      pile: spadePile,
      update: spadePileUpdate,
    },
    diamond: {
      pile: diamondPile,
      update: diamondPileUpdate,
    },
    club: {
      pile: clubPile,
      update: clubPileUpdate,
    },
  };

  const wasteReducer = (state, action) => {
    switch (action.type) {
      case "addCard": {
        if (state.includes(action.card)) {
          return state;
        }
        return [...state, action.card];
      }
      case "removeTopCard": {
        if (state.includes(action.card)) {
          return state.pop();
        }
        return state;
      }
      case "moveWasteToDeck": {
        // this needs to move all cards back to the deck and preserve the order.
        return [];
      }
      default:
        throw new Error();
    }
  };
  const [waste, updateWaste] = useReducer(wasteReducer, []);

  const deckReducer = (state = shuffledDeck, action) => {
    switch (action.type) {
      case "addCardToWaste": {
        // this needs to pop a card off of the deck reducer and add it to the waste
        const newState = [...state];
        const flippedCard = newState.pop();
        updateWaste({ type: "addCard", card: flippedCard });
        return newState;
      }
      case "resetDeck": {
        // this needs to move all cards back to the shuffled deck
        return [];
      }
      default:
        throw new Error();
    }
  };
  const [deck, updateDeck] = useReducer(deckReducer, shuffledDeck);

  const deckClickHandler = () => {
    updateDeck({ type: "addCardToWaste" });
  };
  const wasteDoubleClickHandler = () => {
    const topCard = waste[waste.length - 1];
    console.log(`Top card in waste: ${topCard}`);
    tryAddingCardToBuildingPile(topCard);
  };

  const tryAddingCardToBuildingPile = (card) => {
    const [value, suit] = card.split(":");
    console.log(`Try adding the ${value} of ${suit}s to their respective pile`);
    if (buildingPiles[suit] && buildingPiles[suit].pile.length === 0 && value === 'ace') {
      buildingPiles[suit].update([
        ...buildingPiles[suit].pile,
        card
      ]);
      updateWaste({
        card,
        type: 'removeTopCard'
      });

    } else if (buildingPiles[suit] && buildingPiles[suit].pile.length >= 1) {
      // make sure cards are sequential
    } else {
      // throw an error
      console.log(`BuildingPiles[suit] is defined: ${!!buildingPiles[suit]}`)
      console.log(`buildingPiles[suit].pile.length: ${buildingPiles[suit].pile.length}`)
      console.log(`card value: ${value}`)
    }
  };

  return (
    <>
      <section className="mt-20 bg-slate-800 size-full flex">
        {/* Building piles */}
        {(() => {
          const elements = [];
          for (let i = 0; i < suits.length; i++) {
            const suit = suits[i];
            elements.push(
              <div
                className="bg-slate-600 grow mx-2 p-4 justify-center"
                key={`suits-${i}`}
              >
                <h2>{suit}</h2>
                <Pile cards={buildingPiles[suit].pile} />
              </div>
            );
          }

          return elements;
        })()}
        {/* The waste */}
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">
          <Pile areFacedUp="true" cards={waste} doubleClickHandler={wasteDoubleClickHandler} />
        </div>
        {/* The deck */}
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">
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
