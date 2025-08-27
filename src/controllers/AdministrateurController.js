const { admin, db, auth } = require("../services/firebase.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const firebase = require("../services/firebase")


const addAdministrateurController = {
  // Ajouter un administrateur
  async create(req, res) {
    try {
      const { nom, email } = req.body;
      if (!nom || !email) {
        return res.status(400).json({ error: "Nom et email sont requis." });
      }

      const docRef = await db.collection("Administrateur").add({ nom, email });
      res
        .status(201)
        .json({ id: docRef.id, message: "Administrateur ajouté avec succès." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Récupérer tous les administrateurs
  async getAll(req, res) {
    try {
      const snapshot = await db.collection("administrateurs").get();
      const administrateurs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(administrateurs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Modifier un administrateur
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nom, email } = req.body;

      if (!nom && !email) {
        return res
          .status(400)
          .json({ error: "Aucune donnée à mettre à jour." });
      }

      const updateData = {};
      if (nom) updateData.nom = nom;
      if (email) updateData.email = email;

      await db.collection("administrateurs").doc(id).update(updateData);
      res
        .status(200)
        .json({ message: "Administrateur mis à jour avec succès." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Supprimer un administrateur
  async remove(req, res) {
    try {
      const { id } = req.params;
      await db.collection("administrateurs").doc(id).delete();
      res.status(200).json({ message: "Administrateur supprimé avec succès." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Ajouter un administrateur avec validation et mot de passe
  async addWithValidation(req, res) {
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

      const docRef = db.collection("administrateurs").doc();
      await docRef.set({
        nom,
        email,
        motDePasse: hashedPassword,
      });

      res.status(201).json({
        message: "Compte administrateur créé avec succès.",
        id: docRef.id,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
      if (!res.body.email || !res.body.motDePasse){
          return res.status(422).json({
              email: "email is obligatoire",
              motDePasse: "mot de passe est obligatoire"
          });
      }
      firebase
          .auth
  }
};


module.exports = addAdministrateurController;
