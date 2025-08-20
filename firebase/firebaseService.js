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

// Fonction pour créer un utilisateur
//const createUser = async (email, password) => {
// const userRecord = await admin.auth().createUser({
//  email: email,
// password: password,
// });
//return userRecord;
//};

//module.exports = {
//getUserData,
//createUser,
//};
