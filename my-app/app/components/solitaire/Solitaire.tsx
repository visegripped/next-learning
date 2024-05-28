"use client";
import { useReducer, Dispatch, useState } from "react";
import {
  buildTableau,
  buildDeck,
  canCardBeAddedToBuildPile,
  canCardBeAddedToTableauPile,
} from "@/app/utilities";
import Tableau from "@/app/components/tableau/Tableau";
import BuildPiles from "@/app/components/buildPiles/BuildPiles";
import WastePile from "@/app/components/wastePile/WastePile";
import DeckPile from "@/app/components/deckPile/DeckPile";
import solitaireReducer, {
  ActionInterface,
} from "@/app/reducers/solitaire.reducer";
import SolitaireContext from "@/app/context/Solitaire.context";
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  CardFaceInterface,
  PilesInterface,
  CardInterface,
} from "@/app/types/solitaire.types";

interface SolitaireProps {
  shuffledDeck: CardFaceInterface[];
}

export default function Solitaire(props: SolitaireProps) {
  const { shuffledDeck } = props;
  // console.log(` These are the shuffledDeck for solitaire: ` );
  // console.log(`["${shuffledDeck.join('",\n"')}"]`)
  // we can use localStorage to save games in progress.
  const {
    tableau_0,
    tableau_1,
    tableau_2,
    tableau_3,
    tableau_4,
    tableau_5,
    tableau_6,
  } = buildTableau(shuffledDeck);
  const [gameIsWon, setGameIsWon] = useState(false);
  const deck = buildDeck(shuffledDeck);
  const [state, dispatch]: {
    state: PilesInterface;
    dispatch: Dispatch<ActionInterface>;
  } = useReducer(solitaireReducer, {
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
    state,
    dispatch,
  };
  // This applies a minimum drag distance. Helps to make sure click/doubleclick are recognized.
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // onActivation: (event) => console.log("onActivation", event), // Here!
      activationConstraint: { distance: 25 },
    }),
  );
  // console.log(" -> Piles state: ", state);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log(" -> handleDragEnd");
    console.log(event);
    const dragTarget = event?.activatorEvent?.target;
    if (!dragTarget) {
      console.log(
        " -> DragEndEvent had no target (event.activatorEvent.target) detected.",
      );
      return false;
    }
    const sourcePile = dragTarget.closest("ol").getAttribute("data-pile");
    const [sourcePileType] = sourcePile.split("_");
    const targetPile = event?.over?.id;
    if (!targetPile) {
      console.log(
        " -> DragEndEvent had no targetPile (event.over.id) detected.",
      );
      return false;
    }
    const [targetPileType, targetPileData] = targetPile.split("_"); // targetPileData could be the suit OR the tableau id.
    const card = event.active.id as CardInterface;
    const action = `${sourcePileType}2${targetPileType}`;
    // console.log(
    //   `Got to dragEnd:
    //   TargetPile: ${targetPile}
    //   targetPileType: ${targetPileType}
    //   sourcePile: ${sourcePile}
    //   sourcePileType: ${sourcePileType}
    //   Card: ${card}
    //   action: ${action}
    //   `,
    // );

    switch (action) {
      case "waste2build":
      case "tableau2build":
        if (
          canCardBeAddedToBuildPile(
            card,
            state[targetPile].sequence,
            targetPileData,
          )
        ) {
          dispatch({
            type: "moveCardBetweenPiles",
            sourcePile,
            targetPile,
            card,
            isFaceUp: true,
            isDraggable: true,
          });
          if (action === "tableau2build") {
            dispatch({
              type: "makeLastCardInPileFaceUp",
              targetPile: sourcePile,
            });
            dispatch({
              type: "makeAllFaceUpCardsInPileDraggable",
              targetPile: sourcePile,
            });
          }
        }
        break;
      case "tableau2tableau":
      case "build2tableau":
      case "waste2tableau":
        if (canCardBeAddedToTableauPile(card, state[targetPile].sequence)) {
          dispatch({
            type: "moveCardBetweenPiles",
            sourcePile,
            targetPile,
            card,
            isFaceUp: true,
            isDraggable: true,
          });
          dispatch({
            type: "makeLastCardInPileFaceUp",
            targetPile: sourcePile,
          });
          dispatch({
            type: "makeAllFaceUpCardsInPileDraggable",
            targetPile: sourcePile,
          });
        }
        break;
      default:
        console.log(`Unsupported drop location`);
    }
  };

  const isGameWon = (states: PilesInterface) => {
    return !!(
      states.build_diamond.sequence.length +
        states.build_spade.sequence.length +
        states.build_club.sequence.length +
        states.build_heart.sequence.length >=
      52
    );
  };

  return (
    <SolitaireContext.Provider value={providerState}>
      <div className="md:max-w-screen-xl ml-auto mr-auto">
        {isGameWon(state) ? (
          <div className="flex flex-row justify-center bg-slate-800 items-stretch p-20">
            <h2 className="text-9xl font-bold tracking-wide text-green-500">
              You Win!
            </h2>
          </div>
        ) : (
          <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <section
              className="mt-20 bg-slate-800 grid grid-cols-7 gap-4"
              data-testid="solitaire"
            >
              <BuildPiles />
              <div></div> {/* empty column so top and tableau align */}
              <WastePile />
              <DeckPile />
            </section>

            <section className="mt-20 bg-slate-800 grid grid-cols-7 gap-4">
              <Tableau />
            </section>
          </DndContext>
        )}
      </div>
    </SolitaireContext.Provider>
  );
}
