import { GuessedPlayers } from "../GuessedPlayers";
import { SearchInput } from "../SearchInput/SearchInput";
import { Silhouette } from "../Silhouette";
import { Modal } from "../Common/Modal";
import { useGuessAreaLogic } from "../hooks/useGuessAreaLogic";
import "./style.scss";

export const GuessArea = () => {
  const {
    handleGuess,
    guessCount,
    revealPlayer,
    playersNames,
    playersList,
    guessedPlayersList,
    setShowModal,
    showModal,
    isGameOver,
    todaysPlayer,
  } = useGuessAreaLogic();

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
