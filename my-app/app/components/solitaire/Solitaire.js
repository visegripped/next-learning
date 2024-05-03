"use client";
import { useReducer } from "react";
import { suits, cards } from "@/app/constants.mjs";
import {
  shuffleArray,
  buildDeck,
  buildTableau,
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
  const fullDeck = buildDeck(suits, cards);
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

  const [pilesState, pilesDispatch] = useReducer(solitaireReducer, {
    deck: shuffledDeck,
    waste: [],
    tableau_0: tableau_0,
    tableau_1: tableau_1,
    tableau_2: tableau_2,
    tableau_3: tableau_3,
    tableau_4: tableau_4,
    tableau_5: tableau_5,
    tableau_6: tableau_6,
    build_heart: [],
    build_spade: [],
    build_diamond: [],
    build_club: [],
  });

  const providerState = {
    state: pilesState,
    dispatch: pilesDispatch,
  };

  console.log(" -> Piles state: ", pilesState);

  // const [heartPile, heartPileUpdate] = useState([]);
  // const [spadePile, spadePileUpdate] = useState([]);
  // const [diamondPile, diamondPileUpdate] = useState([]);
  // const [clubPile, clubPileUpdate] = useState([]);
  // const buildingPiles = {
  //   heart: {
  //     pile: heartPile,
  //     update: heartPileUpdate,
  //   },
  //   spade: {
  //     pile: spadePile,
  //     update: spadePileUpdate,
  //   },
  //   diamond: {
  //     pile: diamondPile,
  //     update: diamondPileUpdate,
  //   },
  //   club: {
  //     pile: clubPile,
  //     update: clubPileUpdate,
  //   },
  // };

  // const [tableauPile0, tableauPile0Update] = useState(tableau[0]);
  // const [tableauPile1, tableauPile1Update] = useState(tableau[1]);
  // const [tableauPile2, tableauPile2Update] = useState(tableau[2]);
  // const [tableauPile3, tableauPile3Update] = useState(tableau[3]);
  // const [tableauPile4, tableauPile4Update] = useState(tableau[4]);
  // const [tableauPile5, tableauPile5Update] = useState(tableau[5]);
  // const [tableauPile6, tableauPile6Update] = useState(tableau[6]);
  // const tableauPiles = {
  //   tableauPile0: { pile: tableauPile0, update: tableauPile0Update },
  //   tableauPile1: { pile: tableauPile1, update: tableauPile1Update },
  //   tableauPile2: { pile: tableauPile2, update: tableauPile2Update },
  //   tableauPile3: { pile: tableauPile3, update: tableauPile3Update },
  //   tableauPile4: { pile: tableauPile4, update: tableauPile4Update },
  //   tableauPile5: { pile: tableauPile5, update: tableauPile5Update },
  //   tableauPile6: { pile: tableauPile6, update: tableauPile6Update },
  // };

  // const wasteReducer = (state, action) => {
  //   switch (action.type) {
  //     case "addCard": {
  //       if (state.includes(action.card)) {
  //         return state;
  //       }
  //       return [...state, action.card];
  //     }
  //     case "removeTopCard": {
  //       if (state.includes(action.card)) {
  //         return state.pop();
  //       }
  //       return state;
  //     }
  //     case "moveWasteToDeck": {
  //       // this needs to move all cards back to the deck and preserve the order.
  //       return [];
  //     }
  //     default:
  //       throw new Error();
  //   }
  // };
  // const [waste, updateWaste] = useReducer(wasteReducer, []);

  // const deckReducer = (state = shuffledDeck, action) => {
  //   switch (action.type) {
  //     case "addCardToWaste": {
  //       // this needs to pop a card off of the deck reducer and add it to the waste
  //       const newState = [...state];
  //       const flippedCard = newState.pop();
  //       updateWaste({ type: "addCard", card: flippedCard });
  //       return newState;
  //     }
  //     case "resetDeck": {
  //       // this needs to move all cards back to the shuffled deck
  //       return [];
  //     }
  //     default:
  //       throw new Error();
  //   }
  // };
  // const [deck, updateDeck] = useReducer(deckReducer, shuffledDeck);

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
          {/* <div className="bg-slate-600 grow mx-2 justify-center">
          <Pile
            cards={pilesState.waste}
            doubleClickHandler={wasteDoubleClickHandler}
            id="wastePile"
          />
        </div> */}
          {/* The deck */}
          {/* <div className="bg-slate-600 grow mx-2 justify-center">
          <Pile
            cards={pilesState.deck}
            clickHandler={deckClickHandler}
            id="deckPile"
            cardFaceBehavior="down"
          />
        </div> */}
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
