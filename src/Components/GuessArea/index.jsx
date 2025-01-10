import { useEffect, useState } from "react";
import { GuessedPlayers } from "../GuessedPlayers";
import { SearchInput } from "../SearchInput/SearchInput";
import { Silhouette } from "../Silhouette";
import { getAllPlayers } from "../utils";
import { Modal } from "../Common/Modal";
import { getTodayPlayer } from "../../firebaseConfig";
import {
  getGuessesPlayersList,
  saveGuess,
  setGusessesDistribution,
  setInitialGuessDist,
} from "./utils";
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
    saveGuess(playersList, clickedPlayer);
    setGuessedPlayersList((prevState) => [...prevState, clickedPlayer.value]);
    if (clickedPlayer.value === todaysPlayer.name || guessCount + 1 === 9) {
      setGusessesDistribution(
        guessCount,
        clickedPlayer.value === todaysPlayer.name
      );
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
    const allPlayersObj = await getAllPlayers();

    const { guessedStoredPlayers, lastPlayerId } =
      getGuessesPlayersList(allPlayersObj);

    setGuessedPlayersList(guessedStoredPlayers);

    const lastGuessedPlayer = allPlayersObj[lastPlayerId];
    const guessesLen = guessedStoredPlayers.length;

    if (guessesLen >= 8 || todaysPlayer.name === lastGuessedPlayer.name) {
      setGuessCount(guessesLen < 8 ? guessesLen : guessesLen + 1);
      setShowModal(true);
      setRevealPlayer(true);
      if (guessesLen >= 8) setIsGameOver(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todaysPlayer = await getPlayer();
        getNames();
        checkForCurrentGuesses(todaysPlayer);
        setInitialGuessDist();
      } catch (error) {
        console.error("Error fetching today's player:", error);
      }
    };
    // localStorage.setItem(
    //   "guessDist",
    //   JSON.stringify({
    //     1: 2,
    //     2: 1,
    //     3: 4,
    //     4: 4,
    //     5: 7,
    //     6: 6,
    //     7: 17,
    //     8: 2,
    //     0: 5,
    //   })
    // );

    fetchData(); // Call the async function
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
