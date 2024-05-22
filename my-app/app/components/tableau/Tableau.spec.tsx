import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi, afterEach, beforeEach, describe } from 'vitest';
import Tableau from '@/app/components/Tableau';
import { useSolitaireContext } from '@/app/context/Solitaire.context';
import { canCardBeAddedToBuildPile } from '@/app/utilities';
import { PilesInterface, CardInterface, SuitInterface } from '@/app/types/solitaire.types';

// Mock the useSolitaireContext hook
vi.mock('@/app/context/Solitaire.context', () => ({
  useSolitaireContext: vi.fn(),
}));

// Mock the canCardBeAddedToBuildPile utility function
vi.mock('@/app/utilities', () => ({
  canCardBeAddedToBuildPile: vi.fn(),
}));

describe('Tableau Component', () => {
  let stateMock: PilesInterface;
  let dispatchMock: vi.Mock;

  beforeEach(() => {
    stateMock = {
      tableau_0: { sequence: [], meta: {} },
      tableau_1: { sequence: [], meta: {} },
      tableau_2: { sequence: [], meta: {} },
      tableau_3: { sequence: [], meta: {} },
      tableau_4: { sequence: [], meta: {} },
      tableau_5: { sequence: [], meta: {} },
      tableau_6: { sequence: [], meta: {} },
      build_heart: { sequence: [], meta: {} },
      build_spade: { sequence: [], meta: {} },
      build_diamond: { sequence: [], meta: {} },
      build_club: { sequence: [], meta: {} },
    };

    dispatchMock = vi.fn();

    // @ts-ignore
    useSolitaireContext.mockReturnValue({ state: stateMock, dispatch: dispatchMock });
    // @ts-ignore
    canCardBeAddedToBuildPile.mockReturnValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render the correct number of tableau piles', () => {
    const { getByTestId } = render(<Tableau />);
    
    for (let i = 0; i < 7; i++) {
      const tableauPile = getByTestId(`pile_tableau_${i}`);
      expect(tableauPile).toBeInTheDocument();
    }
  });

  test('should handle card double click correctly', () => {
    const card: CardInterface = 'ace:spade';
    const suit: SuitInterface = 'spade';
    const targetBuildPile = `build_${suit}`;
    const originPileId = 'tableau_0';

    // Mock the state to have a card in the tableau_0
    stateMock.tableau_0.sequence = [card];
    stateMock.tableau_0.meta = {
      [card]: { isFaceUp: true, isDraggable: true }
    };

    const { getByTestId } = render(<Tableau />);
    const cardElement = getByTestId('container_ace:spade');

    fireEvent.doubleClick(cardElement);

    expect(canCardBeAddedToBuildPile).toHaveBeenCalledWith(card, stateMock[targetBuildPile].sequence, suit);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'moveCardBetweenPiles',
      sourcePile: originPileId,
      targetPile: targetBuildPile,
      card,
      isFaceUp: true,
      isDraggable: true,
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      targetPile: targetBuildPile,
      type: 'makeOnlyLastCardInPileDraggable',
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      targetPile: originPileId,
      type: 'makeLastCardInPileFaceUp',
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      targetPile: originPileId,
      type: 'makeAllFaceUpCardsInPileDraggable',
    });
  });

  test('should not dispatch actions if card cannot be added to build pile', () => {
    const card: CardInterface = 'ace:spade';
    const suit: SuitInterface = 'spade';
    const originPileId = 'tableau_0';

    // Mock the state to have a card in the tableau_0
    stateMock.tableau_0.sequence = [card];
    stateMock.tableau_0.meta = {
      [card]: { isFaceUp: true, isDraggable: true }
    };

    // Mock canCardBeAddedToBuildPile to return false
    canCardBeAddedToBuildPile.mockReturnValue(false);

    const { getByTestId } = render(<Tableau />);
    const cardElement = getByTestId('container_ace:spade');

    fireEvent.doubleClick(cardElement);

    expect(canCardBeAddedToBuildPile).toHaveBeenCalledWith(card, stateMock[`build_${suit}`].sequence, suit);
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
