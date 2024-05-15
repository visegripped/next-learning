import { expect, test, describe } from "vitest";
import { validateReducerActionsByType } from "./solitaire.reducer";

const sampleAction = {
  sourcePile: { sequence: [] },
  targetPile: {},
  card: "something",
  isFaceUp: true,
  isDraggable: true,
  type: "moveCardBetweenPiles",
};

test("Returns false if type is not passed ", () => {
  const testData = { ...sampleAction };
  delete testData.type;
  expect(validateReducerActionsByType(testData)).toEqual(false);
});

describe("moveCardBetweenPiles", () => {
  test("Returns true if all required actions are passed ", () => {
    expect(validateReducerActionsByType(sampleAction)).toEqual(true);
  });

  test("Returns false if any of the required params are missing", () => {
    expect(
      validateReducerActionsByType({ ...sampleAction, isDraggable: undefined }),
    ).toEqual(false);
    expect(
      validateReducerActionsByType({ ...sampleAction, isFaceUp: undefined }),
    ).toEqual(false);
    expect(
      validateReducerActionsByType({ ...sampleAction, sourcePile: undefined }),
    ).toEqual(false);
    expect(
      validateReducerActionsByType({ ...sampleAction, targetPile: undefined }),
    ).toEqual(false);
    expect(
      validateReducerActionsByType({ ...sampleAction, card: undefined }),
    ).toEqual(false);
  });
});

describe("movePileToAnotherPile", () => {
  const moveCardBetweenPilesSampleAction = {
    ...sampleAction,
    type: "movePileToAnotherPile",
  };
  test("Returns true if all required actions are passed ", () => {
    expect(
      validateReducerActionsByType(moveCardBetweenPilesSampleAction),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...moveCardBetweenPilesSampleAction,
        card: undefined,
      }),
    ).toEqual(true);
  });

  test("Returns false if any of the required params are missing", () => {
    expect(
      validateReducerActionsByType({
        ...moveCardBetweenPilesSampleAction,
        isDraggable: undefined,
      }),
    ).toEqual(false);
    expect(
      validateReducerActionsByType({
        ...moveCardBetweenPilesSampleAction,
        isFaceUp: undefined,
      }),
    ).toEqual(false);
    expect(
      validateReducerActionsByType({
        ...moveCardBetweenPilesSampleAction,
        sourcePile: undefined,
      }),
    ).toEqual(false);
    expect(
      validateReducerActionsByType({
        ...moveCardBetweenPilesSampleAction,
        targetPile: undefined,
      }),
    ).toEqual(false);
  });
});

describe("makeOnlyLastCardInPileDraggable", () => {
  const makeOnlyLastCardInPileDraggableSampleAction = {
    ...sampleAction,
    type: "makeOnlyLastCardInPileDraggable",
  };
  test("Returns true if all required actions are passed ", () => {
    expect(
      validateReducerActionsByType(makeOnlyLastCardInPileDraggableSampleAction),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeOnlyLastCardInPileDraggableSampleAction,
        sourcePile: undefined,
      }),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeOnlyLastCardInPileDraggableSampleAction,
        card: undefined,
      }),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeOnlyLastCardInPileDraggableSampleAction,
        isFaceUp: undefined,
      }),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeOnlyLastCardInPileDraggableSampleAction,
        isDraggable: undefined,
      }),
    ).toEqual(true);
  });

  test("Returns false if any of the required params are missing", () => {
    expect(
      validateReducerActionsByType({
        ...makeOnlyLastCardInPileDraggableSampleAction,
        targetPile: undefined,
      }),
    ).toEqual(false);
  });
});

describe("makeAllFaceUpCardsInPileDraggable", () => {
  const makeAllFaceUpCardsInPileDraggableSampleAction = {
    ...sampleAction,
    type: "makeAllFaceUpCardsInPileDraggable",
  };
  test("Returns true if all required actions are passed ", () => {
    expect(
      validateReducerActionsByType(
        makeAllFaceUpCardsInPileDraggableSampleAction,
      ),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeAllFaceUpCardsInPileDraggableSampleAction,
        sourcePile: undefined,
      }),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeAllFaceUpCardsInPileDraggableSampleAction,
        card: undefined,
      }),
    ).toEqual(true);

    expect(
      validateReducerActionsByType({
        ...makeAllFaceUpCardsInPileDraggableSampleAction,
        isFaceUp: undefined,
      }),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeAllFaceUpCardsInPileDraggableSampleAction,
        isDraggable: undefined,
      }),
    ).toEqual(true);
  });

  test("Returns false if any of the required params are missing", () => {
    expect(
      validateReducerActionsByType({
        ...makeAllFaceUpCardsInPileDraggableSampleAction,
        targetPile: undefined,
      }),
    ).toEqual(false);
  });
});

describe("makeLastCardInPileFaceUp", () => {
  const makeLastCardInPileFaceUpSampleAction = {
    ...sampleAction,
    type: "makeLastCardInPileFaceUp",
  };
  test("Returns true if all required actions are passed ", () => {
    expect(
      validateReducerActionsByType(makeLastCardInPileFaceUpSampleAction),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeLastCardInPileFaceUpSampleAction,
        sourcePile: undefined,
      }),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeLastCardInPileFaceUpSampleAction,
        card: undefined,
      }),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeLastCardInPileFaceUpSampleAction,
        isFaceUp: undefined,
      }),
    ).toEqual(true);
    expect(
      validateReducerActionsByType({
        ...makeLastCardInPileFaceUpSampleAction,
        isDraggable: undefined,
      }),
    ).toEqual(true);
  });

  test("Returns false if any of the required params are missing", () => {
    expect(
      validateReducerActionsByType({
        ...makeLastCardInPileFaceUpSampleAction,
        targetPile: undefined,
      }),
    ).toEqual(false);
  });
});
