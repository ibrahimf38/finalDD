admin.initializeApp();

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();

//   fonction Cloud Function pour ajouter un utilisateur
exports.createUser = functions.https.onRequest(async (req, res) => {
  const { email, name } = req.body;

  try {
    const userRef = db.collection("users").doc();
    await userRef.set({
      email,
      name,
      createdAt: new Date(),
    });

    res.status(201).send({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Erreur lors de la création de l'utilisateur" });
  }
});
