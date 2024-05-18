const MAX_GUESTS = 8;

export const getPlaceHolderTitle = (revealPlayer, guessCount) => {
  if (revealPlayer) {
    if (guessCount === 9) return "Game Over";
    return `You solved it in ${guessCount}!`;
  }
  return `Guess ${guessCount} of ${MAX_GUESTS}`;
};
