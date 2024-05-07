import { expect, test } from 'vitest'
import canCardBeAddedToBuildStack from './canCardBeAddedToBuildStack';



  test('returns false if card is empty', () => {
    expect(canCardBeAddedToBuildStack('', ['five:spade','five:club','five:hearts'], 'spade')).toBe(false);
  });
  test('returns false if card and last card of sequence are not sequential', () => {
    expect(canCardBeAddedToBuildStack('four:spade', ['six:heart','five:spade','six:spade'], 'spade')).toBe(false);
  });
  test('returns false if targetBuildPileSuit is empty', () => {
    expect(canCardBeAddedToBuildStack('four:spade', ['six:heart','five:diamond','five:spade'], '')).toBe(false);
  });

  // happy path
  test('returns true if cards are sequential and the same suit', () => {
    expect(canCardBeAddedToBuildStack('four:spade', ['five:spade'], 'spade')).toBe(true);
  });
  test('returns true if sequence is empty and card is an ace', () => {
    expect(canCardBeAddedToBuildStack('ace:spade', [], 'spade')).toBe(true);
  });
