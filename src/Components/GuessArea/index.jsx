import { useEffect, useState } from "react";
import { GuessedPlayers } from "../GuessedPlayers";
import { SearchInput } from "../SearchInput/SearchInput";
import { Silhouette } from "../Silhouette";
import { getAllPlayers } from "../utils";
import { Modal } from "../Common/Modal";
import { getTodayPlayer } from "../../firebaseConfig";

import "./style.scss";
import { getFormattedDate, saveGuess } from "./utils";

export const GuessArea = () => {
  const [guessCount, setGuessCount] = useState(1);
  const [guessedPlayersList, setGuessedPlayersList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [revealPlayer, setRevealPlayer] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [todaysPlayer, setTodaysPlayer] = useState({});
  const [playersNames, setPlayerNames] = useState([]);
  const [playersList, setPlayersList] = useState([]);

  const handleGuess = (clickedPlayer) => {
    saveGuess(playersList, clickedPlayer);
    setGuessedPlayersList((prevState) => [...prevState, clickedPlayer.value]);
    if (clickedPlayer.value === todaysPlayer.name || guessCount + 1 === 9) {
      setShowModal(true);
      setRevealPlayer(true);
      if (clickedPlayer.value !== todaysPlayer.name) {
        setIsGameOver(true);
        setGuessCount(guessCount + 1);
      }
    } else setGuessCount(guessCount + 1);
  };

  const getPlayer = async () => {
    const player = await getTodayPlayer();
    const currPlayer = Object.values(player)[0];
    setTodaysPlayer(currPlayer);
    return currPlayer;
  };

  const getNames = async () => {
    const allPlayers = await getAllPlayers();
    const retrievedPlayersList = Object.values(allPlayers);
    setPlayersList(retrievedPlayersList);

    const names = retrievedPlayersList.map((player) => player.name);
    setPlayerNames(names);
  };

  const checkForCurrentGuesses = async (todaysPlayer) => {
    const storedObject = localStorage.getItem("guesses");

    const formattedDate = getFormattedDate();

    const parsedObject = JSON.parse(storedObject);
    if (!storedObject || !parsedObject[formattedDate]) return;

    const allPlayersObj = await getAllPlayers();
    const playersIdList = parsedObject[formattedDate];

    const guessedStoredPlayers = [];
    playersIdList.forEach((id) => {
      const playerObj = allPlayersObj[id];
      if (!!playerObj) guessedStoredPlayers.push(playerObj.name);
    });

    setGuessedPlayersList(guessedStoredPlayers);
    setGuessCount(guessedStoredPlayers.length + 1);

    const lastGuessedPlayerId =
      guessedStoredPlayers[guessedStoredPlayers.length - 1];
    const lastGuessedPlayer = allPlayersObj[lastGuessedPlayerId];

    if (playersIdList.length >= 8 || todaysPlayer.name === lastGuessedPlayer) {
      setShowModal(true);
      setRevealPlayer(true);
      setIsGameOver(true);
      setGuessCount(playersIdList.length);
    }
  };

  useEffect(() => {
    const todaysPlayer = getPlayer();
    getNames();
    checkForCurrentGuesses(todaysPlayer);
  }, []);

  console.log(guessCount);
  console.log(guessedPlayersList);

  return (
    <div className="guess-container">
      <SearchInput
        guessCount={guessCount}
        handleGuess={(clickedPlayer) => handleGuess(clickedPlayer)}
        revealPlayer={revealPlayer}
        playersNames={playersNames}
        guessedPlayersList={guessedPlayersList}
      />
      <Silhouette showModal={() => setShowModal(true)} />
      {(revealPlayer || guessCount > 1) && (
        <GuessedPlayers
          playersList={playersList}
          guessedPlayersList={guessedPlayersList}
          isGameOver={isGameOver}
          guessCount={guessCount}
          todaysPlayer={todaysPlayer}
        />
      )}
      <Modal
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        isHidden={!revealPlayer}
        guessCount={guessCount}
        revealPlayer={revealPlayer}
        isGameOver={isGameOver}
        todaysPlayer={todaysPlayer}
      />
    </div>
  );
};
