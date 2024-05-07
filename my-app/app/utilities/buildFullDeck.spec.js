import { expect, test } from 'vitest'
import buildFullDeck from './buildFullDeck';

test('Returns an array with 52 cards', () => {
  expect(buildFullDeck().length).toBe(52);
});

test('Returns an array with 13 cards of each suit', () => {
  const deck = buildFullDeck();
  expect(deck.filter(card => card.indexOf('spade') > 0).length).toBe(13);
  expect(deck.filter(card => card.indexOf('heart') > 0).length).toBe(13);
  expect(deck.filter(card => card.indexOf('club') > 0).length).toBe(13);
  expect(deck.filter(card => card.indexOf('diamond') > 0).length).toBe(13);
});
