"use client";
import { useReducer } from "react";
import { suits, cards } from "@/app/constants.mjs";
import {
  shuffleArray,
  buildFullDeck,
  buildTableau,
  buildDeck,
  isCardRed,
} from "@/app/cardUtilities.mjs";
import Tableau from "@/app/components/tableau/Tableau";
import Pile from "@/app/components/pile/Pile";
import solitaireReducer from "@/app/reducers/solitaire.reducer";
import SolitaireContext from "@/app/context/Solitaire.context";
import { DndContext } from "@dnd-kit/core";

//solitaire anatomy: https://www.britannica.com/topic/solitaire-card-game
//reducer tutorial: https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/
// context/reducer: https://stackoverflow.com/questions/63687178/sharing-states-between-two-components-with-usereducer

export default function Solitaire(props) {
  // console.log(` These are the props for home: `, props);
  // we can use localStorage to save games in progress.
  const fullDeck = buildFullDeck(suits, cards);
  const shuffledDeck = shuffleArray(fullDeck);
  const {
    tableau_0,
    tableau_1,
    tableau_2,
    tableau_3,
    tableau_4,
    tableau_5,
    tableau_6,
  } = buildTableau(shuffledDeck);

  const deck = buildDeck(shuffledDeck);
  const [pilesState, pilesDispatch] = useReducer(solitaireReducer, {
    deck: deck,
    waste: {
      sequence: [],
      meta: {}
    },
    tableau_0: tableau_0,
    tableau_1: tableau_1,
    tableau_2: tableau_2,
    tableau_3: tableau_3,
    tableau_4: tableau_4,
    tableau_5: tableau_5,
    tableau_6: tableau_6,
    build_heart: {
      sequence: [],
      meta: {}
    },
    build_spade: {
      sequence: [],
      meta: {}
    },
    build_diamond: {
      sequence: [],
      meta: {}
    },
    build_club: {
      sequence: [],
      meta: {}
    },
  });

  const providerState = {
    state: pilesState,
    dispatch: pilesDispatch,
  };

  // console.log(" -> Piles state: ", pilesState);

  const deckClickHandler = (event, card) => {
    console.log(` -> deck click event on ${card}: `)
    pilesDispatch({ type: "moveCardBetweenPiles", sourcePile: "deck", destinationPile: "waste", card, isFaceUp: true, isDraggable: true });
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

  const tryAddingCardToTableauPile = (
    newCard,
    cards,
    targetPileId,
    tableauPileFromState
  ) => {
    const [newCardFace, suit] = newCard.split(":");
    const newCardValue = cards[newCardFace];
    const targetPileStateId = targetPileId.replace("-", "");
    const topCardInTargetPile =
      tableauPileFromState[tableauPileFromState.length - 1];
    const [topCardInTargetPileFace, topCardInTargetPileSuit] =
      topCardInTargetPile.split(":");
    const topCardInTargetPileValue = cards[topCardInTargetPileFace];

    console.log(`Attempting to move a card into a tableau pile
    card: ${card}
    card value: ${cardValue}
    targetPileStateId: ${targetPileStateId}
    topCardInTargetPile: ${topCardInTargetPile}
    topCardInTargetPileValue: ${topCardInTargetPileValue}
    `);

    // if the new card value is not exactly one less, disallow.
    // if the new card suit isn't opposing color for previous card, disallow.
    // if the pile is empty, card must be a king.
    if (topCardInTargetPileValue - newCardValue != 1) {
      console.log("New card and top pile card are not sequential.");
      return false;
    } else if (isCardRed(newCard) === isCardRed(topCardInTargetPile)) {
      console.log("New card and top pile card are the same color.");
      return false;
    }
  };

  const handleDragEnd = (event) => {
    const originatingPile = event.activatorEvent.target
      .closest("ol")
      .getAttribute("data-pile");
    const [originatingPileType] = originatingPile.split("-");
    const targetPile = event.over?.id;
    const [targetPileType] = targetPile.split("-");
    const card = event.active.id;
    console.log(
      `Got to dragEnd:
      TargetPile: ${targetPile}
      targetPileType: ${targetPileType}
      OriginatingPile: ${originatingPile}
      OriginatingPileType: ${originatingPileType}
      Card: ${card}
      `,
      event
    );
    if (
      targetPileType === "buildPile" &&
      originatingPileType === "tableauPile" &&
      tryAddingCardToBuildingPile(card, cards, buildingPiles)
    ) {
      // todo: this is duplicated in Tableau double click handler. share it.
      const pileIdInState = originatingPile.replace("-", "");
      const newPile = tableauPiles[pileIdInState].pile;
      newPile.pop();
      tableauPiles[pileId].update(newPile);
    } else if (
      targetPileType === "buildPile" &&
      originatingPileType === "wastePile" &&
      tryAddingCardToBuildingPile(card, cards, buildingPiles)
    ) {
      const topCard = waste[waste.length - 1];
      updateWaste({
        card: topCard,
        type: "removeTopCard",
      });
    } else {
      console.log(`Got to dragEnd w/out matching any conditionals`);
    }
  };

  return (
    <SolitaireContext.Provider value={providerState}>
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
                  <Pile
                    cards={pilesState[`build_${suit}`]}
                    id={`build_${suit}`}
                    droppable="true"
                  />
                </div>
              );
            }

            return elements;
          })()}
          {/* The waste */}
          <div className="bg-slate-600 grow mx-2 justify-center">
          <Pile
            cards={pilesState.waste}
            doubleClickHandler={wasteDoubleClickHandler}
            id="wastePile"
          />
        </div>
          {/* The deck */}
          <div className="bg-slate-600 grow mx-2 justify-center">
          <Pile
            cards={pilesState.deck}
            clickHandlerForLastCard={deckClickHandler}
            id="deckPile"
          />
        </div>
        </section>
        {/* <section className="mt-20 bg-slate-800 size-full flex">
        <Tableau
          tableauPiles={pilesState}
          tryAddingCardToBuildingPile={tryAddingCardToBuildingPile}
          buildingPiles={buildingPiles}
        />
      </section> */}
      </DndContext>
    </SolitaireContext.Provider>
  );
}
