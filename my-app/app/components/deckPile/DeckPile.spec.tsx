import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi, afterEach, describe } from 'vitest';
import DeckPile from '@/app/components/DeckPile';
import { useSolitaireContext } from '../../context/Solitaire.context';

// Mock the context
vi.mock('@/app/context/Solitaire.context', () => ({
  useSolitaireContext: vi.fn(),
}));

describe('DeckPile Component', () => {
  let dispatchMock: vi.Mock;
  let stateMock: any;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should dispatch movePileToAnotherPile action when deck is empty and double-clicked', () => {

    dispatchMock = vi.fn();
    stateMock = {
      deck: {
        sequence: [],
        meta: {

        }
      },
      waste: {
        sequence: ['three:heart','ace:heart','ace:spade'],
        meta: {
          'three:heart': {
            isFaceUp: false,
            isDraggable: false,
          },
          'ace:heart': {
            isFaceUp: false,
            isDraggable: false,
          },
          'ace:spade': {
            isFaceUp: false,
            isDraggable: false,
          }
        }
      },
    };

    // @ts-ignore
    useSolitaireContext.mockReturnValue({ state: stateMock, dispatch: dispatchMock });

    const { getByTestId } = render(<DeckPile />);

    const deckPileContainer = getByTestId('container_deck');
    fireEvent.doubleClick(deckPileContainer);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'movePileToAnotherPile',
      sourcePile: 'waste',
      targetPile: 'deck',
      isFaceUp: false,
      isDraggable: false,
    });
  });

  test('should dispatch moveCardBetweenPiles and makeOnlyLastCardInPileDraggable actions when card in deck is clicked', () => {
    dispatchMock = vi.fn();
    stateMock = {
      deck: {
        sequence: ['three:heart'],
        meta: {
          'three:heart': {
            isFaceUp: false,
            isDraggable: false,
          },
        }
      },
      waste: {
        sequence: ['ace:spade'],
        meta: {
          'ace:spade': {
            isFaceUp: false,
            isDraggable: false,
          }
        }
      },
    };

    // @ts-ignore
    useSolitaireContext.mockReturnValue({ state: stateMock, dispatch: dispatchMock });

    const { getByTestId } = render(<DeckPile />);

    const deckPileContainer = getByTestId('container_facedown');
    const card = stateMock.deck.sequence[0];

    fireEvent.click(deckPileContainer); // this needs to be the card, not deckpile or pile

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'moveCardBetweenPiles',
      sourcePile: 'deck',
      targetPile: 'waste',
      card,
      isFaceUp: true,
      isDraggable: true,
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      targetPile: 'waste',
      type: 'makeOnlyLastCardInPileDraggable',
    });
  });

  test('should render the DeckPile component', () => {
    const { getByTestId } = render(<DeckPile />);

    const deckPileContainer = getByTestId('container_deck');
    expect(deckPileContainer).toBeInTheDocument();
  });
});