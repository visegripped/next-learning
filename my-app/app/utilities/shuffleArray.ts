const shuffleArray = (arrayToShuffle: string[] = []) => {
  let currentIndex = arrayToShuffle.length,
    randomIndex;
  const array = [...arrayToShuffle];

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

export default shuffleArray;
