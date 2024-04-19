export const buildDeck = (suits, cards) => {
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

export const deal = (shuffledDeck) => {
  const numTableaus = 6;
  const tableaus = {};
  let numPops = 1;
  for (let i = 0; i <= numTableaus; i++ ) {
    tableaus[i] = [];
    for (let ipop = 0; ipop < numPops; ipop++) {
      tableaus[i].push(shuffledDeck.pop());
    }
    numPops += 1;
  }
  return tableaus;
};

export const isCardRed = (card) => {
  return !!(card.includes("diamond") || card.includes("heart"));
};
