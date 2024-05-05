export type CardMetaInterface = {
  isFaceUp: boolean;
  isDraggable: boolean;
}

export type CardInterface = {
  [key: string]: CardMetaInterface,
}

export type PilesInterface = {
  waste: {
    sequence: string[],
    meta: CardInterface,
  },
  deck: {
    sequence: string[],
    meta: CardInterface,
  },
  'tableau_0': {
    sequence: string[],
    meta: CardInterface,
  },
  'tableau_1': {
    sequence: string[],
    meta: CardInterface,
  },
  'tableau_2': {
    sequence: string[],
    meta: CardInterface,
  },
  'tableau_3': {
    sequence: string[],
    meta: CardInterface,
  },
  'tableau_4': {
    sequence: string[],
    meta: CardInterface,
  },
  'tableau_5': {
    sequence: string[],
    meta: CardInterface,
  },
  'tableau_6': {
    sequence: string[],
    meta: CardInterface,
  },
  'build_heart': {
    sequence: string[],
    meta: CardInterface,
  },
  'build_spade': {
    sequence: string[],
    meta: CardInterface,
  },
  'build_diamond': {
    sequence: string[],
    meta: CardInterface,
  },
  'build_club': {
    sequence: string[],
    meta: CardInterface,
  },
}


export type PileIdsInterface = 'waste' | 'deck' | 'tableau_0' | 'tableau_1' | 'tableau_2' | 'tableau_3' | 'tableau_4' | 'tableau_5' | 'tableau_6' | 'build_heart' | 'build_spade' | 'build_diamond' | 'build_club'