export const buildFullDeck = (suits, cards) => {
  const deck = [];
  suits.forEach((suit) => {
    const cardKeys = Object.keys(cards);
    cardKeys.forEach((card) => {
      deck.push(`${card}:${suit}`);
    });
  });
  return deck;
};

export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const buildDeck = (fullDeck = []) => {
  const data = {
    sequence: [],
    meta: {}
  };
  fullDeck.forEach((card) => {
    data.sequence.push(card);
    data.meta[card] = {
      isFaceUp : false,
      isVisible: false,
    }
  });
  return data;
}

export const buildTableau = (shuffledDeck) => {
  const numTableaus = 6;
  const tableaus = {};
  let numPops = 1;
  for (let i = 0; i <= numTableaus; i++) {
    tableaus[`tableau_${i}`] = {
      sequence: [],
      meta: {},
    };
    for (let ipop = 0; ipop < numPops; ipop++) {
      const card = shuffledDeck.pop();
      tableaus[`tableau_${i}`].sequence.push(card);
      tableaus[`tableau_${i}`].meta[card] = {
        isFaceUp: (ipop === numPops - 1),
        draggable: (ipop === numPops - 1),
      };
    }
    numPops += 1;
  }
  return tableaus;
};

export const isCardRed = (card) => {
  return !!(card.includes("diamond") || card.includes("heart"));
};

