import { expect, test } from "vitest";
import buildTableau from "./buildTableau";
import buildFullDeck from "./buildFullDeck";

test("Returns an object with the correct number of piles", () => {
  expect(Object.keys(buildTableau()).length).toEqual(7);
});

test("Only the last card in a pile should be face up", () => {
  const deck = buildFullDeck();
  const tableau = buildTableau(deck);
  const results = tableau.tableau_6.sequence.filter((card) => {
    return tableau.tableau_6.meta[card].isFaceUp === false;
  }).length;
  const lastCard = tableau.tableau_6.sequence.pop();
  expect(results).toEqual(6); //face down cards
  expect(tableau.tableau_6.meta[lastCard].isFaceUp).toBe(true);
});

test("Only the last card in a pile should be draggable", () => {
  const deck = buildFullDeck();
  const tableau = buildTableau(deck);
  const results = tableau.tableau_6.sequence.filter((card) => {
    return tableau.tableau_6.meta[card].isDraggable === false;
  }).length;
  const lastCard = tableau.tableau_6.sequence.pop();
  expect(results).toEqual(6); //face down cards
  expect(tableau.tableau_6.meta[lastCard].isDraggable).toBe(true);
});

test("Piles have the correct number of cards", () => {
  const deck = buildFullDeck();
  const tableau = buildTableau(deck);
  expect(tableau.tableau_0.sequence.length).toEqual(1);
  expect(tableau.tableau_1.sequence.length).toEqual(2);
  expect(tableau.tableau_2.sequence.length).toEqual(3);
  expect(tableau.tableau_3.sequence.length).toEqual(4);
  expect(tableau.tableau_4.sequence.length).toEqual(5);
  expect(tableau.tableau_5.sequence.length).toEqual(6);
  expect(tableau.tableau_6.sequence.length).toEqual(7);
});
