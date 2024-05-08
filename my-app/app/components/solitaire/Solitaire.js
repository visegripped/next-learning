"use client";
import { useReducer } from "react";
import { suits, cards } from "@/app/constants.mjs";
import {
  shuffleArray,
  buildTableau,
  buildFullDeck,
  buildDeck,
  isCardRed,
  canCardBeAddedToBuildStack,
} from "@/app/utilities";
import Tableau from "@/app/components/tableau/Tableau";
import Pile from "@/app/components/pile/Pile";
import BuildPiles from "@/app/components/buildPiles/BuildPiles";
import solitaireReducer from "@/app/reducers/solitaire.reducer";
import SolitaireContext from "@/app/context/Solitaire.context";
import { DndContext, useSensors, useSensor, MouseSensor } from "@dnd-kit/core";

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
      meta: {},
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
      meta: {},
    },
    build_spade: {
      sequence: [],
      meta: {},
    },
    build_diamond: {
      sequence: [],
      meta: {},
    },
    build_club: {
      sequence: [],
      meta: {},
    },
  });

  const providerState = {
    state: pilesState,
    dispatch: pilesDispatch,
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // onActivation: (event) => console.log("onActivation", event), // Here!
      activationConstraint: { distance: 25 },
  }))
  // console.log(" -> Piles state: ", pilesState);

  const deckClickHandler = (event, card) => {
    pilesDispatch({
      type: "moveCardBetweenPiles",
      sourcePile: "deck",
      targetPile: "waste",
      card,
      isFaceUp: true,
      isDraggable: true,
    });
    pilesDispatch({
      targetPile: "waste",
      type: "makeOnlyLastCardInPileDraggable",
    });
  };
  const wasteDoubleClickHandler = (event, card) => {
    const [ face, suit] = card.split(':');
    const targetBuildPile = `build_${suit}`;
    if(canCardBeAddedToBuildStack(card, pilesState[targetBuildPile].sequence, suit)) {
      pilesDispatch({
        type: "moveCardBetweenPiles",
        sourcePile: "waste",
        targetPile: targetBuildPile,
        card,
        isFaceUp: true,
        isDraggable: true,
      });
      pilesDispatch({
        targetPile: targetBuildPile,
        type: "makeOnlyLastCardInPileDraggable",
      });
    }
  };

  const tryAddingCardToTableauPile = (
    newCard,
    cards,
    targetPileId,
    tableauPileFromState,
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
    console.log('BEGIN handleDragEnd')
    const originatingPile = event.activatorEvent.target
      .closest("ol")
      .getAttribute("data-pile");
    const [originatingPileType] = originatingPile.split("-");
    // const targetPile = event.over?.id;
    // const [targetPileType] = targetPile.split("-");
    // const card = event.active.id;
    // console.log(
    //   `Got to dragEnd:
    //   TargetPile: ${targetPile}
    //   targetPileType: ${targetPileType}
    //   OriginatingPile: ${originatingPile}
    //   OriginatingPileType: ${originatingPileType}
    //   Card: ${card}
    //   `,
    //   event,
    // );
    // if (
    //   targetPileType === "buildPile" &&
    //   originatingPileType === "tableauPile" &&
    //   tryAddingCardToBuildingPile(card, cards, buildingPiles)
    // ) {
    //   // todo: this is duplicated in Tableau double click handler. share it.
    //   const pileIdInState = originatingPile.replace("-", "");
    //   const newPile = tableauPiles[pileIdInState].pile;
    //   newPile.pop();
    //   tableauPiles[pileId].update(newPile);
    // } else if (
    //   targetPileType === "buildPile" &&
    //   originatingPileType === "wastePile" &&
    //   tryAddingCardToBuildingPile(card, cards, buildingPiles)
    // ) {
    //   const topCard = waste[waste.length - 1];
    //   updateWaste({
    //     card: topCard,
    //     type: "removeTopCard",
    //   });
    // } else {
    //   console.log(`Got to dragEnd w/out matching any conditionals`);
    // }
  };

  return (
    <SolitaireContext.Provider value={providerState}>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <section className="mt-20 bg-slate-800 size-full flex">
          {/* Building piles - todo: componetize this */}
          <BuildPiles />
          {/* The waste */}
          <div className="bg-slate-600 grow mx-2 justify-center">
            <Pile
              doubleClickHandlerForLastCard={wasteDoubleClickHandler}
              pileId="waste"
            />
          </div>
          {/* The deck */}
          <div className="bg-slate-600 grow mx-2 justify-center">
            <Pile pileId="deck" clickHandlerForLastCard={deckClickHandler} />
          </div>
        </section>
        <section className="mt-20 bg-slate-800 size-full flex">
          <Tableau
          // tryAddingCardToBuildingPile={tryAddingCardToBuildingPile}
          // buildingPiles={buildingPiles}
          />
        </section>
      </DndContext>
    </SolitaireContext.Provider>
  );
}
