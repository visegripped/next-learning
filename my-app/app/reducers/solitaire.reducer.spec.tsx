import { expect, test, describe } from "vitest";
import solitaireReducer, {
  validateReducerActionsByType,
} from "./solitaire.reducer";

describe("validateReducerActionsByType", () => {
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
        validateReducerActionsByType({
          ...sampleAction,
          isDraggable: undefined,
        }),
      ).toEqual(false);
      expect(
        validateReducerActionsByType({ ...sampleAction, isFaceUp: undefined }),
      ).toEqual(false);
      expect(
        validateReducerActionsByType({
          ...sampleAction,
          sourcePile: undefined,
        }),
      ).toEqual(false);
      expect(
        validateReducerActionsByType({
          ...sampleAction,
          targetPile: undefined,
        }),
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
        validateReducerActionsByType(
          makeOnlyLastCardInPileDraggableSampleAction,
        ),
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
});

// Mock validateReducerActionsByType function
vi.mock("@/app/utilities", () => ({
  validateReducerActionsByType: vi.fn(() => true),
}));

describe("solitaireReducer", () => {
  const initialState: PilesInterface = {
    deck: { sequence: [], meta: {} },
    waste: { sequence: [], meta: {} },
    tableau_0: { sequence: [], meta: {} },
    tableau_1: { sequence: [], meta: {} },
    tableau_2: { sequence: [], meta: {} },
    tableau_3: { sequence: [], meta: {} },
    tableau_4: { sequence: [], meta: {} },
    tableau_5: { sequence: [], meta: {} },
    tableau_6: { sequence: [], meta: {} },
    build_heart: { sequence: [], meta: {} },
    build_spade: { sequence: [], meta: {} },
    build_diamond: { sequence: [], meta: {} },
    build_club: { sequence: [], meta: {} },
  };

  test('should handle "movePileToAnotherPile" action', () => {
    const action: ActionInterface = {
      type: "movePileToAnotherPile",
      sourcePile: "tableau_0",
      targetPile: "tableau_1",
      isFaceUp: true,
      isDraggable: true,
    };

    const state = {
      ...initialState,
      tableau_0: {
        sequence: ["card1", "card2"],
        meta: {
          card1: { isFaceUp: false, isDraggable: false },
          card2: { isFaceUp: false, isDraggable: false },
        },
      },
      tableau_1: {
        sequence: [],
        meta: {},
      },
    };

    const newState = solitaireReducer(state, action);

    expect(newState.tableau_0.sequence).toEqual([]);
    expect(newState.tableau_1.sequence).toEqual(["card2", "card1"]);
    expect(newState.tableau_1.meta).toEqual({
      card1: { isFaceUp: true, isDraggable: true },
      card2: { isFaceUp: true, isDraggable: true },
    });
  });

  test('should handle "moveCardBetweenPiles" action for single card', () => {
    const action: ActionInterface = {
      type: "moveCardBetweenPiles",
      sourcePile: "tableau_0",
      targetPile: "tableau_1",
      card: "card1",
      isFaceUp: true,
      isDraggable: true,
    };

    const state = {
      ...initialState,
      tableau_0: {
        sequence: ["card1"],
        meta: {
          card1: { isFaceUp: false, isDraggable: false },
        },
      },
      tableau_1: {
        sequence: [],
        meta: {},
      },
    };

    const newState = solitaireReducer(state, action);

    expect(newState.tableau_0.sequence).toEqual([]);
    expect(newState.tableau_1.sequence).toEqual(["card1"]);
    expect(newState.tableau_1.meta.card1).toEqual({
      isFaceUp: true,
      isDraggable: true,
    });
  });

  test('should handle "makeOnlyLastCardInPileDraggable" action', () => {
    const action: ActionInterface = {
      type: "makeOnlyLastCardInPileDraggable",
      targetPile: "tableau_0",
    };

    const state = {
      ...initialState,
      tableau_0: {
        sequence: ["card1", "card2"],
        meta: {
          card1: { isFaceUp: true, isDraggable: true },
          card2: { isFaceUp: true, isDraggable: false },
        },
      },
    };

    const newState = solitaireReducer(state, action);

    expect(newState.tableau_0.meta.card1.isDraggable).toBe(false);
    expect(newState.tableau_0.meta.card2.isDraggable).toBe(true);
  });

  test('should handle "makeAllFaceUpCardsInPileDraggable" action', () => {
    const action: ActionInterface = {
      type: "makeAllFaceUpCardsInPileDraggable",
      targetPile: "tableau_0",
    };

    const state = {
      ...initialState,
      tableau_0: {
        sequence: ["card1", "card2"],
        meta: {
          card1: { isFaceUp: true, isDraggable: false },
          card2: { isFaceUp: true, isDraggable: false },
        },
      },
    };

    const newState = solitaireReducer(state, action);

    expect(newState.tableau_0.meta.card1.isDraggable).toBe(true);
    expect(newState.tableau_0.meta.card2.isDraggable).toBe(true);
  });

  test('should handle "makeLastCardInPileFaceUp" action', () => {
    const action: ActionInterface = {
      type: "makeLastCardInPileFaceUp",
      targetPile: "tableau_0",
    };

    const state = {
      ...initialState,
      tableau_0: {
        sequence: ["card1", "card2"],
        meta: {
          card1: { isFaceUp: false, isDraggable: false },
          card2: { isFaceUp: false, isDraggable: false },
        },
      },
    };

    const newState = solitaireReducer(state, action);

    expect(newState.tableau_0.meta.card2.isFaceUp).toBe(true);
  });

  test("should return current state for unsupported action type", () => {
    const action: ActionInterface = {
      type: "unsupported_action",
    };

    const state = {
      ...initialState,
    };

    const newState = solitaireReducer(state, action);

    expect(newState).toEqual(state);
  });
});
