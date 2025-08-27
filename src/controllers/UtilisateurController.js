const { db } = require("../services/firebase.js");
const { validationResult } = require("express-validator");

// Ajouter un utilisateur avec validation
const addUtilisateur = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erreurs: errors.array() });
  }

  try {
    const { nom, email } = req.body;
    const docRef = db.collection("utilisateur").doc();
    await docRef.set({ nom, email });
    res.status(201).send({ message: "Compte créé avec succès", id: docRef.id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//Lire tous les utilisateurs
const getUtilisateurs = async (req, res) => {
  try {
    const snapshot = await db.collection("utilisateur").get();
    const utilisateurs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send(utilisateurs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Modifier un utilisateur
const updateUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email } = req.body;
    await db.collection("utilisateur").doc(id).update({ nom, email });
    res.status(200).send("Utilisateur mis à jour");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Supprimer un utilisateur
const deleteUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("utilisateur").doc(id).delete();
    res.status(200).send("Utilisateur supprimé");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addUtilisateur,
  getUtilisateurs,
  updateUtilisateur,
  deleteUtilisateur,
};
