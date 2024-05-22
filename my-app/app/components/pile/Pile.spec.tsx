import { render } from '@testing-library/react';
import { expect, test, vi, afterEach, beforeEach, describe } from 'vitest';
import Pile from '@/app/components/pile/Pile';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { useSolitaireContext } from '@/app/context/Solitaire.context';
import { PilesInterface, PileIdsInterface, CardInterface } from '@/app/types/solitaire.types';

// Mock the useDroppable hook
vi.mock('@dnd-kit/core', () => ({
  useDroppable: vi.fn(),
  useDraggable: vi.fn()
}));

// Mock the useSolitaireContext hook
vi.mock('@/app/context/Solitaire.context', () => ({
  useSolitaireContext: vi.fn(),
}));

describe('Pile Component', () => {
  let stateMock: PilesInterface;

  beforeEach(() => {
    stateMock = {
      deck: { sequence: [], meta: {} },
      waste: { sequence: [], meta: {} },
      build_heart: { sequence: ['ace:spade'], meta: { 'ace:spade': { isFaceUp: true, isDraggable: true } } },
      build_spade: { sequence: [], meta: {} },
      build_diamond: { sequence: [], meta: {} },
      build_club: { sequence: [], meta: {} },
    };

    useSolitaireContext.mockReturnValue({ state: stateMock, dispatch: vi.fn() });

    useDroppable.mockReturnValue({
      isOver: false,
      setNodeRef: vi.fn(),
    });

    useDraggable.mockReturnValue({
      attributes : {}, 
      listeners : {}, 
      transform : '',
      setNodeRef: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render pile with correct pileId', () => {
    const pileId: PileIdsInterface = 'build_heart';
    const { getByTestId } = render(<Pile pileId={pileId} />);

    const pileElement = getByTestId(`pile_${pileId}`);
    expect(pileElement).toBeInTheDocument();
    expect(pileElement).toHaveAttribute('data-pile', pileId);
  });

  test('should render cards within the pile', () => {
    const pileId: PileIdsInterface = 'build_heart';
    const { getByTestId } = render(<Pile pileId={pileId} />);

    const pileElement = getByTestId(`pile_${pileId}`);
    const cardElement = getByTestId('container_ace:spade');
    expect(pileElement).toContainElement(cardElement);
  });

  test('should apply dragOverStyle when isOver is true', () => {
    useDroppable.mockReturnValue({
      isOver: true,
      setNodeRef: vi.fn(),
    });

    const pileId: PileIdsInterface = 'build_heart';
    const { getByTestId } = render(<Pile pileId={pileId} droppable />);

    const pileElement = getByTestId(`pile_${pileId}`);
    expect(pileElement).toHaveAttribute('data-is-droppable', 'true');
  });

  test('should setNodeRef when droppable is true', () => {
    const setNodeRefMock = vi.fn();
    useDroppable.mockReturnValue({
      isOver: false,
      setNodeRef: setNodeRefMock,
    });

    const pileId: PileIdsInterface = 'build_heart';
    render(<Pile pileId={pileId} droppable />);

    expect(setNodeRefMock).toHaveBeenCalled();
  });

  test('should not setNodeRef when droppable is false', () => {
    const setNodeRefMock = vi.fn();
    useDroppable.mockReturnValue({
      isOver: false,
      setNodeRef: setNodeRefMock,
    });

    const pileId: PileIdsInterface = 'build_heart';
    render(<Pile pileId={pileId} droppable={false} />);

    expect(setNodeRefMock).not.toHaveBeenCalled();
  });

  test('should call clickHandlerForLastCard on last card click', () => {
    const clickHandlerMock = vi.fn();
    const pileId: PileIdsInterface = 'build_heart';

    const { getByTestId } = render(
      <Pile pileId={pileId} clickHandlerForLastCard={clickHandlerMock} />
    );

    const cardContainer = getByTestId('container_ace:spade');
    cardContainer.click();

    expect(clickHandlerMock).toHaveBeenCalledWith(expect.any(Object), 'ace:spade');
  });

  // TODO - figure out why doubleclick isn't working.

  // test('should call doubleClickHandlerForLastCard on last card double click', () => {
  //   const doubleClickHandlerMock = vi.fn();
  //   const pileId: PileIdsInterface = 'build_heart';

  //   const { getByTestId } = render(
  //     <Pile pileId={pileId} doubleClickHandlerForLastCard={doubleClickHandlerMock} />
  //   );

  //   const cardContainer = getByTestId('container_ace:spade');
  //   cardContainer.doubleClick();

  //   expect(doubleClickHandlerMock).toHaveBeenCalledWith(expect.any(Object), 'ace:spade');
  // });
});
