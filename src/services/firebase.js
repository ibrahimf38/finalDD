/*
/!*const admin = require("firebase-admin");
const serviceAccount = require("../../config/serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };*!/
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail

} = require("firebase/auth") ;

const admin = require("firebase-admin");
const serviceAccount = require("../../config/serviceAccountKey.json");

// ✅ Vérifie si aucune app n’est déjà initialisée
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };


module.exports = {
    admin,
    db,
    auth,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
};
*/


const admin = require("firebase-admin");
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
} = require("firebase/auth");
const { initializeApp } = require("firebase/app");

// Configuration Firebase Admin SDK
const serviceAccount = require("../../config/serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
// Initialiser Firestore
const db = admin.firestore();

// Configuration Firebase Client SDK pour l'authentification
const firebaseConfig = {
    // Vos paramètres de configuration Firebase
    apiKey: "AIzaSyDzCHg3SlMDM_kmDQGQZYVHaS44rDgoV7Q",
    authDomain: "your-project.firebaseapp.com",
    projectId: "malidicover",
    // ... autres paramètres
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = {
    admin,
    db,  // ← Important : exporter Firestore
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
};