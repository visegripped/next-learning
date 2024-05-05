export type PileMetaInterface = {
  isFaceUp: boolean;
  isDraggable: boolean;
};

export type PileInterface = {
  sequence: [];
  meta: PileMetaInterface;
};

export type PilesInterface = {
  waste: PileInterface
  deck: PileInterface
  tableau_0: PileInterface
  tableau_1: PileInterface
  tableau_2: PileInterface
  tableau_3: PileInterface
  tableau_4: PileInterface
  tableau_5: PileInterface
  tableau_6: PileInterface
  build_heart: PileInterface
  build_spade: PileInterface
  build_diamond: PileInterface
  build_club: PileInterface
};

export type PileIdsInterface =
  | "waste"
  | "deck"
  | "tableau_0"
  | "tableau_1"
  | "tableau_2"
  | "tableau_3"
  | "tableau_4"
  | "tableau_5"
  | "tableau_6"
  | "build_heart"
  | "build_spade"
  | "build_diamond"
  | "build_club";
