import { render, screen, fireEvent } from "@testing-library/react";
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
    renderWithProvider(<Solitaire shuffledDeck={shuffledDeck} />, initialState);

    expect(initialState.deck.sequence.length).toBe(24); // Assuming buildDeck returns an empty deck
    expect(initialState.tableau_0.sequence.length).toBe(1); // Assuming buildTableau returns empty tableaus
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

  test("handles drag and drop between piles correctly", () => {
    renderWithProvider(<Solitaire shuffledDeck={shuffledDeck} />, initialState);

    // Simulate dragging a card from waste to tableau
    const dragEvent = {
      activatorEvent: {
        target: {
          closest: () => ({ getAttribute: () => "waste" }),
        },
      },
      over: { id: "tableau_0" },
      active: { id: "AS" },
    };

    fireEvent(
      screen.getByTestId("solitaire"),
      new CustomEvent("dragend", { detail: dragEvent }),
    );

    // Assertions to ensure state updated correctly
    // The actual card movements would need to be asserted based on the specific logic of the game.
  });

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
});
