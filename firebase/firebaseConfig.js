const admin = require("firebase-admin");

// Initialisation de Firebase Admin SDK
const serviceAccount = require("../config/serviceAccountKey.json"); // Ajoutez le fichier de clé de service Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
