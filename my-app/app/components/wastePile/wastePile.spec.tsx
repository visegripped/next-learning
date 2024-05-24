import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import WastePile from "@/app/components/WastePile";
import { useSolitaireContext } from "@/app/context/Solitaire.context";
import { canCardBeAddedToBuildPile } from "@/app/utilities";
import {
  PilesInterface,
  CardInterface,
  SuitInterface,
} from "@/app/types/solitaire.types";

// Mock the useSolitaireContext hook
vi.mock("@/app/context/Solitaire.context", () => ({
  useSolitaireContext: vi.fn(),
}));

// Mock the canCardBeAddedToBuildPile utility function
vi.mock("@/app/utilities", () => ({
  canCardBeAddedToBuildPile: vi.fn(),
}));

describe("WastePile Component", () => {
  let stateMock: PilesInterface;
  let dispatchMock: vi.Mock;

  beforeEach(() => {
    stateMock = {
      waste: { sequence: [], meta: {} },
      build_heart: { sequence: [], meta: {} },
      build_spade: { sequence: [], meta: {} },
      build_diamond: { sequence: [], meta: {} },
      build_club: { sequence: [], meta: {} },
    };

    dispatchMock = vi.fn();

    // @ts-ignore
    useSolitaireContext.mockReturnValue({
      state: stateMock,
      dispatch: dispatchMock,
    });
    // @ts-ignore
    canCardBeAddedToBuildPile.mockReturnValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render the waste pile", () => {
    const { getByTestId } = render(<WastePile />);
    const wastePile = getByTestId("pile_waste");
    expect(wastePile).toBeInTheDocument();
  });

  test("should handle card double click correctly", () => {
    const card: CardInterface = "ace:spade";
    const suit: SuitInterface = "spade";
    const targetBuildPile = `build_${suit}`;

    // Mock the state to have a card in the waste
    stateMock.waste.sequence = [card];
    stateMock.waste.meta = {
      [card]: { isFaceUp: true, isDraggable: true },
    };

    const { getByTestId } = render(<WastePile />);
    const cardElement = getByTestId("container_ace:spade");

    fireEvent.doubleClick(cardElement);

    expect(canCardBeAddedToBuildPile).toHaveBeenCalledWith(
      card,
      stateMock[targetBuildPile].sequence,
      suit,
    );
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "moveCardBetweenPiles",
      sourcePile: "waste",
      targetPile: targetBuildPile,
      card,
      isFaceUp: true,
      isDraggable: true,
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      targetPile: targetBuildPile,
      type: "makeOnlyLastCardInPileDraggable",
    });
  });

  test("should not dispatch actions if card cannot be added to build pile", () => {
    const card: CardInterface = "ace:spade";
    const suit: SuitInterface = "spade";
    const targetBuildPile = `build_${suit}`;

    // Mock the state to have a card in the waste
    stateMock.waste.sequence = [card];
    stateMock.waste.meta = {
      [card]: { isFaceUp: true, isDraggable: true },
    };

    // Mock canCardBeAddedToBuildPile to return false
    canCardBeAddedToBuildPile.mockReturnValue(false);

    const { getByTestId } = render(<WastePile />);
    const cardElement = getByTestId("container_ace:spade");

    fireEvent.doubleClick(cardElement);

    expect(canCardBeAddedToBuildPile).toHaveBeenCalledWith(
      card,
      stateMock[targetBuildPile].sequence,
      suit,
    );
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
