import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi, afterEach, beforeEach, describe } from 'vitest';
import { useDraggable } from '@dnd-kit/core';
import Card, { CardSVG } from './Card';
import { CardInterface } from '@/app/types/solitaire.types';

// Mock the useDraggable hook
vi.mock('@dnd-kit/core', () => ({
  useDraggable: vi.fn(),
}));

describe('Card Component', () => {
  const card: CardInterface = 'ace:spade';
  
  beforeEach(() => {
    // Mock the implementation of useDraggable
    useDraggable.mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      transform: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render face-up card correctly', () => {
    const { getByTestId } = render(
      <Card
        isFaceUp={true}
        isDraggable={false}
        card={card}
        doubleClickHandler={undefined}
        clickHandler={undefined}
      />
    );

    const cardElement = getByTestId(`card_${card}`);
    expect(cardElement).toBeInTheDocument();
  });

  test('should render face-down card correctly', () => {
    const { getByTestId } = render(
      <Card
        isFaceUp={false}
        isDraggable={false}
        card={card}
        doubleClickHandler={undefined}
        clickHandler={undefined}
      />
    );

    const cardElement = getByTestId('card_facedown');
    expect(cardElement).toBeInTheDocument();
  });

  test('should call clickHandler on card click', () => {
    const clickHandlerMock = vi.fn();
    const { getByTestId } = render(
      <Card
        isFaceUp={true}
        isDraggable={false}
        card={card}
        doubleClickHandler={undefined}
        clickHandler={clickHandlerMock}
      />
    );

    const cardContainer = getByTestId(`container_${card}`);
    fireEvent.click(cardContainer);

    expect(clickHandlerMock).toHaveBeenCalledWith(expect.any(Object), card);
  });

  test('should call doubleClickHandler on card double click', () => {
    const doubleClickHandlerMock = vi.fn();
    const { getByTestId } = render(
      <Card
        isFaceUp={true}
        isDraggable={false}
        card={card}
        doubleClickHandler={doubleClickHandlerMock}
        clickHandler={undefined}
      />
    );

    const cardContainer = getByTestId(`container_${card}`);
    fireEvent.doubleClick(cardContainer);

    expect(doubleClickHandlerMock).toHaveBeenCalledWith(expect.any(Object), card);
  });

  test('should apply draggable attributes when isDraggable is true', () => {
    const setNodeRefMock = vi.fn();
    const attributes = { 'data-draggable': 'true' };
    const listeners = { onMouseDown: vi.fn() };
    const transform = { x: 100, y: 200 };

    useDraggable.mockReturnValue({
      attributes,
      listeners,
      setNodeRef: setNodeRefMock,
      transform,
    });

    const { getByTestId } = render(
      <Card
        isFaceUp={true}
        isDraggable={true}
        card={card}
        doubleClickHandler={undefined}
        clickHandler={undefined}
      />
    );

    const cardContainer = getByTestId(`container_${card}`);

    expect(setNodeRefMock).toHaveBeenCalled();
    expect(cardContainer).toHaveStyle({
      transform: 'translate3d(100px, 200px, 0)',
    });
    expect(cardContainer).toHaveAttribute('data-draggable', 'true');
    // expect(cardContainer).toHaveAttribute('onMouseDown');
  });
});

describe('CardSVG Component', () => {
  const card: CardInterface = 'ace:spade';

  test('should render card SVG correctly', () => {
    const { getByTestId } = render(<CardSVG card={card} />);

    const cardElement = getByTestId(`card_${card}`);
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveStyle({
      backgroundPosition: '0% 33.4%',
      backgroundImage: "url('card-sprite.png')",
    });
  });
});
