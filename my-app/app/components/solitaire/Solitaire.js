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
  let tableauPiles = deal(shuffledDeck);
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
    if (tryAddingCardToBuildingPile(topCard, cards)) {
      updateWaste({
        card: topCard,
        type: "removeTopCard",
      });
    }
  };

  const tryAddingCardToBuildingPile = (card, cards) => {
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
          <Pile
            areFacedUp="true"
            cards={waste}
            doubleClickHandler={wasteDoubleClickHandler}
          />
        </div>
        {/* The deck */}
        <div className="bg-slate-600 grow mx-2 p-4 justify-center">
          <Pile cards={deck} clickHandler={deckClickHandler} />
        </div>
      </section>
      <section className="mt-20 bg-slate-800 size-full flex">
        <Tableau
          tableauPiles={tableauPiles}
          tryAddingCardToBuildingPile={tryAddingCardToBuildingPile}
          buildingPiles={buildingPiles}
        />
      </section>
    </>
  );
}
