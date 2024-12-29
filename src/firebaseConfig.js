import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBsqqRkKEEdjLs8VCHbXtdBrXUKB_CFJ3I",
  authDomain: "poeltl-9d625.firebaseapp.com",
  databaseURL:
    "https://poeltl-9d625-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "poeltl-9d625",
  storageBucket: "poeltl-9d625.firebasestorage.app",
  messagingSenderId: "200405047830",
  appId: "1:200405047830:web:3c8f20d562a669193f3337",
  measurementId: "G-13QLGZE7V7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// adding the date field and updating player of the day object
const setNewPlayerOfTheDay = async (player) => {
  const [[playerKey, playerData]] = Object.entries(player);

  const playerOfTheDay = {
    [playerKey]: { ...playerData, dateUpdated: new Date().toISOString() },
  };
  const db = getDatabase();

  try {
    await set(ref(db, "playerOfTheDay"), playerOfTheDay);
    console.log("Player of the day updated successfully!");
  } catch (error) {
    console.error("Error updating player of the day:", error);
  }
};

//calculates if were on diffrent day and earlier hour - then need to change player
const needNewPlayer = (player) => {
  const values = Object.values(player);
  const playerTime = values["0"].dateUpdated;

  const date1 = new Date();
  const date2 = new Date(playerTime);

  const day1 = date1.getDay();
  const day2 = date2.getDay();

  return day1 !== day2;
};

//picking up random player from players list
const pickNewPlayer = () => {
  const dbRef = ref(getDatabase());

  get(child(dbRef, "players"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const players = snapshot.val();
        const keys = Object.keys(players);

        const randIndex = Math.floor(
          Math.random() * Object.values(players).length
        );

        const randomKey = keys[randIndex];
        const randomPlayer = players[randomKey];

        const playerObject = { [randomKey]: randomPlayer };

        setNewPlayerOfTheDay(playerObject);
        return playerObject;
      } else console.log("No data available");
    })
    .catch((error) => {
      console.error(error);
    });
};

//returns an object of the player
export const getTodayPlayer = async () => {
  const dbRef = ref(getDatabase());

  try {
    const snapshot = await get(child(dbRef, "playerOfTheDay"));
    if (!snapshot.exists()) return {};
    const player = snapshot.val();
    if (needNewPlayer(player)) return pickNewPlayer();
    return player;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPlayers = async () => {
  const dbRef = ref(getDatabase());

  try {
    const snapshot = await get(child(dbRef, "players"));
    if (!snapshot.exists()) return {};
    const players = snapshot.val();
    return players;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
