import { useEffect, useState } from "react";
import { GuessedPlayers } from "../GuessedPlayers";
import { SearchInput } from "../SearchInput/SearchInput";
import { Silhouette } from "../Silhouette";
import { getPlayerNames } from "../utils";
import { Modal } from "../Common/Modal";
import { getTodayPlayer } from "../../firebaseConfig";

import "./style.scss";

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
    setGuessedPlayersList((prevState) => [...prevState, clickedPlayer.value]);
    if (clickedPlayer.value === todaysPlayer.name || guessCount + 1 === 9) {
      setShowModal(true);
      setRevealPlayer(true);
      if (clickedPlayer.value !== todaysPlayer.name && guessCount + 1 === 9) {
        setIsGameOver(true);
        setGuessCount(guessCount + 1);
      }
    } else setGuessCount(guessCount + 1);
  };

  const getPlayer = async () => {
    const player = await getTodayPlayer();
    setTodaysPlayer(Object.values(player)[0]);
  };

  const getNames = async () => {
    const allPlayers = await getPlayerNames();
    setPlayersList(allPlayers);

    const names = allPlayers.map((player) => player.name);
    setPlayerNames(names);
  };

  useEffect(() => {
    getPlayer();
    getNames();
  }, []);

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
      {guessCount > 1 && (
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
