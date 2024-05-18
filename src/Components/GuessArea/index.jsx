import { useState } from "react";
import { GuessedPlayers } from "../GuessedPlayers";
import { SearchInput } from "../SearchInput/SearchInput";
import { Silhouette } from "../Silhouette";
import { currPlayer } from "../utils";
import { Modal } from "../Common/Modal";

import "./style.scss";

export const GuessArea = () => {
  const [guessCount, setGuessCount] = useState(1);
  const [guessedPlayersList, setGuessedPlayersList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [revealPlayer, setRevealPlayer] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuess = (clickedPlayer) => {
    setGuessedPlayersList((prevState) => [...prevState, clickedPlayer]);
    if (clickedPlayer.value === currPlayer[3] || guessCount + 1 === 9) {
      setShowModal(true);
      setRevealPlayer(true);
      if (clickedPlayer.value !== currPlayer[3] && guessCount + 1 === 9) {
        setIsGameOver(true);
        setGuessCount(guessCount + 1);
      }
    } else setGuessCount(guessCount + 1);
  };
  return (
    <div className="guess-container">
      <SearchInput
        guessCount={guessCount}
        handleGuess={(clickedPlayer) => handleGuess(clickedPlayer)}
        revealPlayer={revealPlayer}
      />
      <Silhouette showModal={() => setShowModal(true)} />
      {guessCount > 1 && (
        <GuessedPlayers
          playersList={guessedPlayersList}
          isGameOver={isGameOver}
          guessCount={guessCount}
        />
      )}
      <Modal
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        isHidden={!revealPlayer}
        guessCount={guessCount}
        revealPlayer={revealPlayer}
        isGameOver={isGameOver}
      />
    </div>
  );
};
