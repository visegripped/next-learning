import { expect, test } from "vitest";
import canCardBeAddedToBuildPile from "./canCardBeAddedToBuildPile";

test("returns false if card is empty", () => {
  expect(
    canCardBeAddedToBuildPile(
      "",
      ["five:spade", "five:club", "five:hearts"],
      "spade",
    ),
  ).toBe(false);
});
test("returns false if card and last card of sequence are not sequential", () => {
  expect(
    canCardBeAddedToBuildPile(
      "four:spade",
      ["six:heart", "five:spade", "six:spade"],
      "spade",
    ),
  ).toBe(false);
});
test("returns false if targetBuildPileSuit is empty", () => {
  expect(
    canCardBeAddedToBuildPile(
      "four:spade",
      ["six:heart", "five:diamond", "five:spade"],
      "",
    ),
  ).toBe(false);
});

// happy path
test("returns true if cards are sequential and the same suit", () => {
  expect(
    canCardBeAddedToBuildPile(
      "six:spade",
      ["three:spade", "four:spade", "five:spade"],
      "spade",
    ),
  ).toBe(true);
});
test("returns true if sequence is empty and card is an ace", () => {
  expect(canCardBeAddedToBuildPile("ace:spade", [], "spade")).toBe(true);
});
