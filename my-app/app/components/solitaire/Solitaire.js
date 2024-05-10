"use client";
import { useReducer } from "react";
import { suits, cards } from "@/app/constants.mjs";
import {
  shuffleArray,
  buildTableau,
  buildFullDeck,
  buildDeck,
  canCardBeAddedToBuildPile,
  canCardBeAddedToTableauPile,
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
// event typings: https://www.tderflinger.com/en/event-typings-of-react-with-type-script

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
    }),
  );
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
    const [face, suit] = card.split(":");
    const targetBuildPile = `build_${suit}`;
    if (
      canCardBeAddedToBuildPile(
        card,
        pilesState[targetBuildPile].sequence,
        suit,
      )
    ) {
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

  const handleDragEnd = (event) => {
    console.log("BEGIN handleDragEnd");
    const sourcePile = event.activatorEvent.target
      .closest("ol")
      .getAttribute("data-pile");
    const [sourcePileType] = sourcePile.split("_");
    const targetPile = event.over?.id;
    const [targetPileType, targetPileData] = targetPile.split("_"); // targetPileData could be the suit OR the tableau id.
    const card = event.active.id;
    const action = `${sourcePileType}2${targetPileType}`;
    console.log(
      `Got to dragEnd:
      TargetPile: ${targetPile}
      targetPileType: ${targetPileType}
      sourcePile: ${sourcePile}
      sourcePileType: ${sourcePileType}
      Card: ${card}
      action: ${action}
      `,
    );

    switch (action) {
      case "waste2build":
      case "tableau2build":
        if (
          canCardBeAddedToBuildPile(
            card,
            pilesState[targetPile].sequence,
            targetPileData,
          )
        ) {
          pilesDispatch({
            type: "moveCardBetweenPiles",
            sourcePile,
            targetPile,
            card,
            isFaceUp: true,
            isDraggable: true,
          });
          if (action === "tableau2build") {
            pilesDispatch({
              type: "makeLastCardInPileFaceUp",
              targetPile: sourcePile,
            });
            pilesDispatch({
              type: "makeAllFaceUpCardsInPileDraggable",
              targetPile: sourcePile,
            });
          }
        }
        break;
      case "tableau2tableau":
      case "build2tableau":
      case "waste2tableau":
        if (
          canCardBeAddedToTableauPile(card, pilesState[targetPile].sequence)
        ) {
          pilesDispatch({
            type: "moveCardBetweenPiles",
            sourcePile,
            targetPile,
            card,
            isFaceUp: true,
            isDraggable: true,
          });
          pilesDispatch({
            type: "makeLastCardInPileFaceUp",
            targetPile: sourcePile,
          });
          pilesDispatch({
            type: "makeAllFaceUpCardsInPileDraggable",
            targetPile: sourcePile,
          });
        }
        break;
      default:
        console.log(`Unsupported drop location`);
    }
  };

  const emptyDeckClickHandler = () => {
    if(pilesState.deck.sequence.length === 0) {
      console.log(' WOOT !')
      pilesDispatch({
        type: "movePileToAnotherPile",
        sourcePile : 'waste',
        targetPile : 'deck',
        isFaceUp: false,
        isDraggable: false,
      });
    }
  }
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
          <div className="bg-slate-600 grow mx-2 justify-center" onDoubleClick={emptyDeckClickHandler}>
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
