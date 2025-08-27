/*
const admin = require("./firebaseConfig"); // Importation de la configuration Firebase

// Fonction pour récupérer les données d'un utilisateur dans Firestore
const getUserData = async (userId) => {
  const userRef = admin.firestore().collection("users").doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    throw new Error("Utilisateur non trouvé");
  }
  return doc.data();
};
*/

const admin = require("../firebase/firebaseConfig"); // import unique
const { db, auth } = require("../config/db");

/*// Firestore et Auth
const db = admin.firestore();
const auth = admin.auth();*/

module.exports = { admin, db, auth };
