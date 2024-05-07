import { expect, test } from "vitest";
import buildDeck from "./buildDeck";

test("Returns an empty array when not passed an argument", () => {
  expect(buildDeck().sequence.length).toEqual(0);
});

test("Returns a sequence that matches the length of the array passed", () => {
  expect(buildDeck(["ace:heart"]).sequence.length).toEqual(1);
  expect(
    buildDeck(["ace:heart", "ace:heart", "ace:heart", "ace:heart", "ace:heart"])
      .sequence.length,
  ).toEqual(5);
});

test("Returns meta with all cards set to face down", () => {
  const deck = buildDeck([
    "ace:heart",
    "two:heart",
    "three:heart",
    "four:heart",
    "five:heart",
  ]);
  const results = deck.sequence.filter((card) => {
    return deck.meta[card].isFaceUp === false;
  }).length;
  expect(results).toEqual(5);
});

test("Returns meta with all cards set to not draggable", () => {
  const deck = buildDeck([
    "ace:heart",
    "two:heart",
    "three:heart",
    "four:heart",
    "five:heart",
  ]);
  const results = deck.sequence.filter((card) => {
    return deck.meta[card].isDraggable === false;
  }).length;
  expect(results).toEqual(5);
});
