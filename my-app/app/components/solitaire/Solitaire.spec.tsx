import { render, fireEvent } from "@testing-library/react";
import { expect, test, vi, afterEach, beforeEach, describe } from "vitest";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import Solitaire from "@/app/components/Solitaire";
import winnableDeck from "../../../tests/winnable-shuffled-deck.json";
import { useSolitaireContext } from "@/app/context/Solitaire.context";
import {
  canCardBeAddedToBuildPile,
  canCardBeAddedToTableauPile,
} from "@/app/utilities";
import {
  CardFaceInterface,
  PilesInterface,
  CardInterface,
  PileIdsInterface,
} from "@/app/types/solitaire.types";

// Mock the useDroppable hook
vi.mock("@dnd-kit/core", () => ({
  useDroppable: vi.fn(),
  useDraggable: vi.fn(),
}));

// Mock the utility functions
vi.mock("@/app/utilities", () => ({
  buildTableau: vi.fn(() => ({
    tableau_0: { sequence: [], meta: {} },
    tableau_1: { sequence: [], meta: {} },
    tableau_2: { sequence: [], meta: {} },
    tableau_3: { sequence: [], meta: {} },
    tableau_4: { sequence: [], meta: {} },
    tableau_5: { sequence: [], meta: {} },
    tableau_6: { sequence: [], meta: {} },
  })),
  buildDeck: vi.fn(() => ({
    sequence: [],
    meta: {},
  })),
  canCardBeAddedToBuildPile: vi.fn(),
  canCardBeAddedToTableauPile: vi.fn(),
}));

vi.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }) => <div>{children}</div>,
  useSensors: vi.fn(),
  useSensor: vi.fn(),
  MouseSensor: vi.fn(),
  useDroppable: vi.fn(),
  useDraggable: vi.fn(),
}));

describe("Solitaire Component", () => {
  let shuffledDeck: CardFaceInterface[];

  beforeEach(() => {
    shuffledDeck = [...winnableDeck];

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

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render the Solitaire component", () => {
    const { getByTestId } = render(<Solitaire shuffledDeck={shuffledDeck} />);
    expect(getByTestId("solitaire")).toBeInTheDocument();
  });

  // TODO - fix this.

  // test('should initialize state correctly', () => {
  //   render(<Solitaire shuffledDeck={shuffledDeck} />);
  //   const { state } = useSolitaireContext();

  //   expect(state.deck.sequence.length).toBe(0); // Assuming buildDeck returns an empty deck
  //   expect(state.tableau_0.sequence.length).toBe(0); // Assuming buildTableau returns empty tableaus
  // });

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
