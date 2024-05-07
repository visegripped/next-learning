import { expect, test } from "vitest";
import isCardRed from "./isCardRed";

test("Returns false if card is not passed", () => {
  expect(isCardRed()).toEqual(false);
});

test("Returns false if card is a spade", () => {
  expect(isCardRed("one:spade")).toEqual(false);
});

test("Returns false if card is a club", () => {
  expect(isCardRed("one:club")).toEqual(false);
});

test("Returns true if card is a heart", () => {
  expect(isCardRed("one:heart")).toEqual(true);
});

test("Returns true if card is a diamond", () => {
  expect(isCardRed("one:diamond")).toEqual(true);
});
