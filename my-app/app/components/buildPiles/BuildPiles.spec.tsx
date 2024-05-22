import { render } from '@testing-library/react';
import { expect, test, vi, afterEach, beforeEach, describe } from 'vitest';
import BuildPiles from '@/app/components/BuildPiles';
import { useSolitaireContext } from '@/app/context/Solitaire.context';
import { suits } from '@/app/constants.mjs';
import { PilesInterface } from '@/app/types/solitaire.types';

// Mock the useSolitaireContext hook
vi.mock('@/app/context/Solitaire.context', () => ({
  useSolitaireContext: vi.fn(),
}));

describe('BuildPiles Component', () => {
  let stateMock: PilesInterface;

  beforeEach(() => {
    stateMock = {
      deck: { sequence: [] },
      waste: { sequence: [] },
      build_heart: { sequence: [] },
      build_spade: { sequence: [] },
      build_diamond: { sequence: [] },
      build_club: { sequence: [] },
    };

    // @ts-ignore
    useSolitaireContext.mockReturnValue({ state: stateMock });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render the correct number of build piles based on suits', () => {
    const { getByTestId } = render(<BuildPiles />);

    suits.forEach((suit) => {
      const container = getByTestId(`container_${suit}`);
      expect(container).toBeInTheDocument();
    });
  });

  test('each build pile should have a Pile component with correct props', () => {
    const { getAllByTestId } = render(<BuildPiles />);

    const pileContainers = getAllByTestId((_, element) => element?.dataset?.testid?.startsWith('container_'));
    pileContainers.forEach((container, index) => {
      const pile = container.querySelector('ol');
      expect(pile).toHaveAttribute('data-pile', `build_${suits[index]}`);
    });
  });

  test('should apply correct styles to each build pile container', () => {
    const { getByTestId } = render(<BuildPiles />);

    suits.forEach((suit) => {
      const container = getByTestId(`container_${suit}`);
      expect(container).toHaveClass('bg-slate-600', 'flex', 'flex-col');
      expect(container).toHaveClass(`_pile_99ebf9`);
      expect(container).toHaveClass(`_${suit}_99ebf9`);
    });
  });
});
