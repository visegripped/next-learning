export type CardInterface = {
  card: string;
  visible: boolean;
  draggable: boolean;
}

export type PilesInterface = {
  waste: CardInterface[],
  deck: CardInterface[],
  'tableau_0': CardInterface[],
  'tableau_1': CardInterface[],
  'tableau_2': CardInterface[],
  'tableau_3': CardInterface[],
  'tableau_4': CardInterface[],
  'tableau_5': CardInterface[],
  'tableau_6': CardInterface[],
  'build_heart': CardInterface[],
  'build_spade': CardInterface[],
  'build_diamond': CardInterface[],
  'build_club': CardInterface[],
}