import React from "react";
import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
// import Card, { CardSVG } from './Card';
import SolitaireContext from "../../context/Solitaire.context";
import BuildPiles from "./BuildPiles";
// import Pile from '@/app/components/pile/Pile';
import { suits } from "../../constants.mjs";

describe("BuildPiles component", () => {
  const providerState = {
    state: {
      build_heart: { sequence: [], meta: {} },
      build_spade: { sequence: [], meta: {} },
      build_diamond: { sequence: [], meta: {} },
      build_club: { sequence: [], meta: {} },
    },
  };
  test("renders all build piles with correct props", () => {
    const { getByTestId } = render(
      <SolitaireContext.Provider value={providerState}>
        <BuildPiles />
      </SolitaireContext.Provider>,
    );

    suits.forEach((suit) => {
      const pileElement = getByTestId(`pile_build_${suit}`);
      expect(pileElement).toBeInTheDocument(); // Check if each pile is rendered
      const containerElement = getByTestId(`container_${suit}`);
      expect(containerElement).toHaveClass(`_${suit}_99ebf9`); // Check if the pile has the correct CSS class
    });
  });
});
