// eslint-disable-next-line @typescript-eslint/no-var-requires
const functions = require("firebase-functions");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.pickRandomItem = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = db.collection("players").doc("zkzIYsy9oBDjZyNkYTrJ");
      const playerSnapshot = await snapshot.get();

      if (!playerSnapshot.exists) {
        return res.status(404).send("Player not found");
      }

      console.log(playerSnapshot);
      res.send("Hello");

      const playerData = playerSnapshot.data();
      console.log(playerData);

      return res.status(200).json(playerData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error picking random item");
    }
  });
});
