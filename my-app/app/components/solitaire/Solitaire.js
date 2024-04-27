"use client";
import { useReducer, useState } from "react";
import { numTableaus, suits, cards } from "../../constants.mjs";
import { shuffleArray, buildDeck, deal } from "../../cardUtilities.mjs";
import Tableau from "../tableau/Tableau";
import {DndContext} from '@dnd-kit/core';

import Pile from "../pile/Pile";

//solitaire anatomy: https://www.britannica.com/topic/solitaire-card-game
//reducer tutorial: https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/

/*
TODO:
TableauPiles need to be managed w/ state, probably similar to how buildingPiles work.
 - Tableau component will need this state based object passed in instead.
 - want to manage each pile individually because otherwise updating state will be a nightmare.
*/

export default function Solitaire(props) {
  // console.log(` These are the props for home: `, props);
  // we can use localStorage to save games in progress.
  const fullDeck = buildDeck(suits, cards);
  const shuffledDeck = shuffleArray(fullDeck);
  const tableau = deal(shuffledDeck);
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

  const [tableauPile0, tableauPile0Update] = useState(tableau[0]);
  const [tableauPile1, tableauPile1Update] = useState(tableau[1]);
  const [tableauPile2, tableauPile2Update] = useState(tableau[2]);
  const [tableauPile3, tableauPile3Update] = useState(tableau[3]);
  const [tableauPile4, tableauPile4Update] = useState(tableau[4]);
  const [tableauPile5, tableauPile5Update] = useState(tableau[5]);
  const [tableauPile6, tableauPile6Update] = useState(tableau[6]);
  const tableauPiles = {
    tableauPile0: { pile: tableauPile0, update: tableauPile0Update },
    tableauPile1: { pile: tableauPile1, update: tableauPile1Update },
    tableauPile2: { pile: tableauPile2, update: tableauPile2Update },
    tableauPile3: { pile: tableauPile3, update: tableauPile3Update },
    tableauPile4: { pile: tableauPile4, update: tableauPile4Update },
    tableauPile5: { pile: tableauPile5, update: tableauPile5Update },
    tableauPile6: { pile: tableauPile6, update: tableauPile6Update },
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
    if (tryAddingCardToBuildingPile(topCard, cards, buildingPiles)) {
      updateWaste({
        card: topCard,
        type: "removeTopCard",
      });
    }
  };

  const tryAddingCardToBuildingPile = (card, cards, buildingPiles) => {
    const [newCardFace, suit] = card.split(":");
    const newCardValue = cards[newCardFace];
    let topOfPileCardValue = 0;
    if (buildingPiles[suit] && buildingPiles[suit].pile.length) {
      const [topOfPileCardFace] =
        buildingPiles[suit].pile[buildingPiles[suit].pile.length - 1].split(
          ":"
        );
      topOfPileCardValue = cards[topOfPileCardFace];
    }
    if (newCardValue === topOfPileCardValue + 1) {
      buildingPiles[suit].update([...buildingPiles[suit].pile, card]);
      return true;
    } else {
      console.log(
        `Try adding the ${newCardFace} of ${suit}s to their respective pile`
      );
      // throw an error
      console.log(
        ` -> BuildingPiles[suit] is defined: ${!!buildingPiles[
          suit
        ]} and length: ${buildingPiles[suit].pile.length}`
      );
      console.log(
        `-> topOfPileCardValue: ${topOfPileCardValue} and newCardValue ${newCardValue}`
      );
      return false;
    }
  };

  const handleDragEnd = (event) => {

    if (event.over && event.over.id.indexOf('buildPile') === 0) {
      // setIsDropped(true);
      console.log('Got to dragEnd w/ matching buildPile ID', event);
      const card = event.active.id;
      if(tryAddingCardToBuildingPile(card, cards, buildingPiles)) {
        //determine if originating pile was waste or a tableau pile.

        const cardTableauPile = event.activatorEvent.target.closest('[data-tableau-pile]').getAttribute('data-tableau-pile')
        const pileId = `tableauPile${cardTableauPile}`;
        const newPile = tableauPiles[pileId].pile;
        newPile.pop();
        tableauPiles[pileId].update(newPile);
      }
      
    } else {
      console.log(`Got to dragEnd w/out matching ID (${event.over.id})`, event)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="mt-20 bg-slate-800 size-full flex">
        {/* Building piles - todo: componetize this */}
        {(() => {
          const elements = [];
          for (let i = 0; i < suits.length; i++) {
            const suit = suits[i];
            elements.push(
              <div
                className="bg-slate-600 grow mx-2 justify-center"
                key={`suits-${i}`}
              >
                <h2>{suit}</h2>
                <Pile cards={buildingPiles[suit].pile} areFacedUp='true' id={`buildPile-${suit}`} droppable='true' />
              </div>
            );
          }

          return elements;
        })()}
        {/* The waste */}
        <div className="bg-slate-600 grow mx-2 justify-center">
          <Pile
            areFacedUp="true"
            cards={waste}
            doubleClickHandler={wasteDoubleClickHandler}
            id='wastePile'
          />
        </div>
        {/* The deck */}
        <div className="bg-slate-600 grow mx-2 justify-center">
          <Pile cards={deck} clickHandler={deckClickHandler} id='deckPile' />
        </div>
      </section>
      <section className="mt-20 bg-slate-800 size-full flex">
        <Tableau
          tableauPiles={tableauPiles}
          tryAddingCardToBuildingPile={tryAddingCardToBuildingPile}
          buildingPiles={buildingPiles}
        />
      </section>
    </DndContext>
  );
}
