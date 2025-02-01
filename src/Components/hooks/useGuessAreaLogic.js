import { useEffect, useState } from "react";
import { getTodayPlayer } from "../../firebaseConfig";
import {
  getGuessesPlayersList,
  saveGuess,
  setGusessesDistribution,
  setInitialGuessDist,
} from "../GuessArea/utils";
import { getAllPlayers } from "../utils";

export const useGuessAreaLogic = () => {
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
    const currPlayer = Object.values(player)[0] || {};
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
    const { guessedStoredPlayers = [], lastPlayerId = null } =
      getGuessesPlayersList(allPlayersObj);

    if (!guessedStoredPlayers.length || !lastPlayerId) return;

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

    fetchData(); // Call the async function
  }, []);

  return {
    handleGuess,
    guessedPlayersList,
    guessCount,
    revealPlayer,
    playersNames,
    playersList,
    setShowModal,
    isGameOver,
    showModal,
    todaysPlayer,
  };
};
