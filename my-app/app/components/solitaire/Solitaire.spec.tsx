import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { DndContext } from '@dnd-kit/core';
import { useDroppable, useDraggable } from "@dnd-kit/core";
import Solitaire from "./Solitaire";
import SolitaireContext from "@/app/context/Solitaire.context";
import { buildTableau, buildDeck } from "@/app/utilities";
import { CardFaceInterface } from "@/app/types/solitaire.types";
import { useReducer } from "react";
import solitaireReducer from "@/app/reducers/solitaire.reducer";
import { expect, test, describe, vi } from "vitest";
import winnableDeck from "../../../tests/winnable-shuffled-deck.json";

const shuffledDeck: CardFaceInterface[] = [...winnableDeck];

vi.mock("@dnd-kit/core", () => ({
  ...vi.importActual("@dnd-kit/core"),
  DndContext: ({ children }) => <div>{children}</div>,
  useSensors: vi.fn(),
  useSensor: vi.fn(),
  MouseSensor: vi.fn(),
  useDroppable: vi.fn(),
  useDraggable: vi.fn(),
}));

const renderWithProvider = (component, initialState) => {
  const ProviderWrapper = ({ children }) => {
    const [state, dispatch] = useReducer(solitaireReducer, initialState);
    return (
      <SolitaireContext.Provider value={{ state, dispatch }}>
        {children}
      </SolitaireContext.Provider>
    );
  };

  return render(<ProviderWrapper>{component}</ProviderWrapper>);
};

describe("Solitaire Component", () => {
  beforeEach(() => {
    useDroppable.mockReturnValue({
      isOver: false,
      setNodeRef: vi.fn(),
    });

    useDraggable.mockReturnValue({
      attributes: {},
      listeners: {},
      transform: "",
      setNodeRef: vi.fn(),
    });
  });

  const {
    tableau_0,
    tableau_1,
    tableau_2,
    tableau_3,
    tableau_4,
    tableau_5,
    tableau_6,
  } = buildTableau(shuffledDeck);
  const initialState = {
    deck: buildDeck(shuffledDeck),
    waste: {
      sequence: [],
      meta: {},
    },
    tableau_0,
    tableau_1,
    tableau_2,
    tableau_3,
    tableau_4,
    tableau_5,
    tableau_6,
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
  };

  test("renders initial layout correctly", () => {
    renderWithProvider(<Solitaire shuffledDeck={shuffledDeck} />, initialState);
    expect(screen.getByTestId("solitaire")).toBeInTheDocument();
  });

  test("should initialize state correctly", () => {
    renderWithProvider(<Solitaire shuffledDeck={shuffledDeck} />, {
      ...initialState,
    });
    expect(initialState.deck.sequence.length).toBe(24);
    expect(initialState.tableau_0.sequence.length).toBe(1);
    expect(initialState.tableau_1.sequence.length).toBe(2);
    expect(initialState.tableau_2.sequence.length).toBe(3);
    expect(initialState.tableau_3.sequence.length).toBe(4);
    expect(initialState.tableau_4.sequence.length).toBe(5);
    expect(initialState.tableau_5.sequence.length).toBe(6);
    expect(initialState.tableau_6.sequence.length).toBe(7);
    expect(initialState.waste.sequence.length).toBe(0);
    expect(initialState.build_heart.sequence.length).toBe(0);
    expect(initialState.build_spade.sequence.length).toBe(0);
    expect(initialState.build_diamond.sequence.length).toBe(0);
    expect(initialState.build_club.sequence.length).toBe(0);
  });

  // test("Drag and drop test", () => {
  //   const testState = {...initialState}
  //   renderWithProvider(<Solitaire shuffledDeck={shuffledDeck} />, testState);
  //   const dropzone = screen.getByTestId('pile_build_club');
  //   expect(dropzone).toBeInTheDocument();
  //   fireEvent.drop(dropzone, {
  //     active: {id: "ace:club",
  //     activatorEvent : {
  //       target: screen.getByTestId('card_ace:club')
  //     }}
  //   });
  //   expect(initialState.build_spade.sequence.length).toBe(testState);
  // })

  // test("handles drag and drop between piles correctly", () => {
  //   const testState = {...initialState}
  //   renderWithProvider(<Solitaire shuffledDeck={shuffledDeck} />, testState);

  //   const dragEvent = {
  //     activatorEvent: {
  //       target: {
  //         closest: () => ({ getAttribute: () => "waste" }),
  //       },
  //     },
  //     over: { id: "build_spade" },
  //     active: { id: "ace:spade" },
  //   };

  //   fireEvent(
  //     screen.getByTestId("solitaire"),
  //     new CustomEvent("dragend", { detail: dragEvent }),
  //   );
  //   expect(testState.build_spade.sequence.length).toBe(1);
  // });

  test("should handle unsupported drop location", () => {
    const card: CardInterface = "ace:spade";
    const sourcePile: PileIdsInterface = "waste";
    const targetPile: PileIdsInterface = "build_heart";

    const { getByTestId } = render(<Solitaire shuffledDeck={shuffledDeck} />);
    const sourceElement = getByTestId(`pile_${sourcePile}`);

    // Mock the drag event
    const dragEndEvent = {
      activatorEvent: { target: sourceElement },
      over: { id: targetPile },
      active: { id: card },
    };

    fireEvent.dragEnd(sourceElement, dragEndEvent);
  });

  // TODO - fix these.

  // test('should handle drag end event correctly', () => {
  //   const card: CardInterface = 'ace:club';
  //   const sourcePile: PileIdsInterface = 'tableau_0';
  //   const targetPile: PileIdsInterface = 'build_club';

  //   const { getByTestId } = render(<Solitaire shuffledDeck={shuffledDeck} />);
  //   const sourceElement = getByTestId(`pile_${sourcePile}`);

  //   // Mock the drag event
  //   const dragEndEvent = {
  //     activatorEvent: { target: sourceElement },
  //     over: { id: targetPile },
  //     active: { id: card }
  //   };

  //   fireEvent.dragEnd(sourceElement, dragEndEvent);

  //   expect(canCardBeAddedToBuildPile).toHaveBeenCalledWith(
  //     card,
  //     [],
  //     'spade'
  //   );
  // });

  // test('displays win message when game is won', () => {
  //   const winningState = {
  //     ...initialState,
  //     build_heart: { sequence: shuffledDeck.slice(0, 13), meta: {} },
  //     build_spade: { sequence: shuffledDeck.slice(13, 26), meta: {} },
  //     build_diamond: { sequence: shuffledDeck.slice(26, 39), meta: {} },
  //     build_club: { sequence: ['ace:club', 'two:club'], meta: {'ace:club': {isDraggable: false, isFaceUp: true}, 'two:club': {isDraggable: false, isFaceUp: true}} },
  //   };

  //   renderWithProvider(<Solitaire shuffledDeck={shuffledDeck} />, winningState);
  //   expect(screen.getByText('You Win!')).toBeInTheDocument();
  // });
});
