export const saveGuess = (playersList, clickedPlayer) => {
  const guessedPlayer = playersList.find(
    (pl) => pl.name === clickedPlayer.label
  );

  const storedObject = localStorage.getItem("guesses");

  const formattedDate = getFormattedDate();

  const parsedObject = JSON.parse(storedObject);

  if (!storedObject || !parsedObject[formattedDate]) {
    localStorage.setItem(
      "guesses",
      JSON.stringify({ [formattedDate]: [guessedPlayer.id] })
    );
    return;
  }

  if (parsedObject[formattedDate]) {
    const playersIdList = parsedObject[formattedDate];
    playersIdList.push(guessedPlayer.id);
    localStorage.setItem(
      "guesses",
      JSON.stringify({ [formattedDate]: playersIdList })
    );
  }
};

export const getFormattedDate = () => {
  const currDate = new Date();
  const day = String(currDate.getDate()).padStart(2, "0");
  const month = String(currDate.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}`;
};

export const setGusessesDistribution = (guessCount, isCorrect) => {
  const tempGuessDist = localStorage.getItem("guessDist");
  const parsedObject = JSON.parse(tempGuessDist);

  const guessNum = isCorrect ? guessCount : 0;

  const currCount = parsedObject[guessNum];

  parsedObject[guessNum] = currCount + 1;

  localStorage.setItem("guessDist", JSON.stringify({ parsedObject }));
};

export const getGuessesPlayersList = (allPlayersObj) => {
  const storedObject = localStorage.getItem("guesses");

  const formattedDate = getFormattedDate();

  const parsedObject = JSON.parse(storedObject);
  if (!storedObject || !parsedObject[formattedDate]) return;

  const playersIdList = parsedObject[formattedDate];

  const guessedStoredPlayers = [];
  playersIdList.forEach((id) => {
    const playerObj = allPlayersObj[id];
    if (!!playerObj) guessedStoredPlayers.push(playerObj.name);
  });

  return {
    guessedStoredPlayers,
    lastPlayerId: playersIdList[playersIdList.length - 1],
  };
};
