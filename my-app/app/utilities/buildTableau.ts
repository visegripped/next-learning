import { CardFaceInterface, PileInterface } from "@/app/types/solitaire.types";
const buildTableau = (shuffledDeck: CardFaceInterface[] = []) => {
  const numTableaus = 7;
  const tableaus = {} as { [key: string]: PileInterface };
  let numPops = 1;
  for (let i = 0; i < numTableaus; i++) {
    const tableauId: string = `tableau_${i}`;
    tableaus[tableauId] = {
      sequence: [],
      meta: {},
    };
    for (let ipop = 0; ipop < numPops; ipop++) {
      const card: CardFaceInterface = shuffledDeck.pop();
      tableaus[tableauId].sequence.push(card);
      tableaus[tableauId].meta[card] = {
        isFaceUp: ipop === numPops - 1,
        isDraggable: ipop === numPops - 1,
      };
    }
    numPops += 1;
  }
  return tableaus;
};

export default buildTableau;
