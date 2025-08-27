/*
const admin = require("firebase-admin");

// Initialisation de Firebase Admin SDK
const serviceAccount = require("../config/serviceAccountKey.json"); // Ajoutez le fichier de clé de service Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
*/

/*const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

// Vérifie si Firebase n'est pas déjà initialisé
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin; // On exporte uniquement admin*/

const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const auth = admin.auth();
const db = admin.firestore();

module.exports = { admin, auth, db };
