import { expect, test } from "vitest";
import canCardBeAddedToTableauPile from "./canCardBeAddedToTableauPile";

test("returns false if card is empty", () => {
  expect(
    canCardBeAddedToTableauPile("", ["five:spade", "five:club", "five:hearts"]),
  ).toBe(false);
});
test("returns false if card and last card of sequence are not sequential", () => {
  expect(
    canCardBeAddedToTableauPile("four:spade", [
      "six:heart",
      "five:spade",
      "six:spade",
    ]),
  ).toBe(false);
});

test("returns false if cards are sequential and the same color", () => {
  expect(canCardBeAddedToTableauPile("four:spade", ["five:club"])).toBe(true);
});

// happy path
test("returns true if cards are sequential and a different color", () => {
  expect(canCardBeAddedToTableauPile("four:spade", ["five:heart"])).toBe(true);
});
test("returns true if sequence is empty and card is an king", () => {
  expect(canCardBeAddedToTableauPile("king:spade", [])).toBe(true);
});
