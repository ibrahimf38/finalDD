const { db } = require("../services/firebase.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Ajouter un gestionnaire avec validation
const addGestionnaire = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erreurs: errors.array() });
  }

  try {
    const { nom, email, motDePasse } = req.body;

    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const docRef = db.collection("Gestionnaire").doc();
    await docRef.set({
      nom,
      email,
      motDePasse: hashedPassword,
    });

    res.status(201).json({
      message: "Compte gestionnaire créé avec succès",
      id: docRef.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire tous les gestionnaires
const getGestionnaires = async (req, res) => {
  try {
    const snapshot = await db.collection("gestionnaires").get();
    const gestionnaires = snapshot.docs.map((doc) => {
      const data = doc.data();
      delete data.motDePasse; // Ne jamais exposer les mots de passe
      return { id: doc.id, ...data };
    });

    res.status(200).json(gestionnaires);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un gestionnaire
const updateGestionnaire = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, motDePasse } = req.body;

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (email) updateData.email = email;
    if (motDePasse) {
      updateData.motDePasse = await bcrypt.hash(motDePasse, 10);
    }

    await db.collection("gestionnaires").doc(id).update(updateData);
    res.status(200).json({ message: "Gestionnaire mis à jour avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un gestionnaire
const deleteGestionnaire = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("gestionnaires").doc(id).delete();
    res.status(200).json({ message: "Gestionnaire supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addGestionnaire,
  getGestionnaires,
  updateGestionnaire,
  deleteGestionnaire,
};
