import { expect, test } from "vitest";
import shuffleArray from "./shuffleArray";

const fruits = ["apple", "orange", "lemon", "cherry", "banana", "rasberry"];

test("Returns an empty array when not passed an argument", () => {
  expect(shuffleArray()).toEqual([]);
});

test("Returns an array of the same length as the argument", () => {
  expect(shuffleArray(fruits).length).toEqual(fruits.length);
});

test("Returns an array that does not exactly match the argument", () => {
  expect(shuffleArray(fruits)).not.toMatchObject(fruits);
});
