import canCardBeAddedToBuildStack from './canCardBeAddedToBuildStack'

describe('canCardBeAddedToBuildStack utility', () => {
  test('returns false if suits do not match', () => {
    expect(canCardBeAddedToBuildStack('four:spade', ['four:hearts'])).toBe(false);
  });
});