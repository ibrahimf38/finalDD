const express = require("express");
const router = express.Router();
const { admin, db } = require("../services/firebase.js");
const { validationResult } = require("express-validator");

const CommandeController = {
    // Créer une commande
    async createCommande(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erreurs: errors.array() });
        }

        try {
            const {
                id_restaurant,
                id_gestionnaire,
                qte_commande,
                date_commande,
                // Récupération des données supplémentaires envoyées par le client Flutter
                clientName,
                phone,
                address,
                total,
                time,
                notes,
                plat_name,
                price_per_unit,
            } = req.body;

            // Vérification des champs obligatoires (ajustez selon votre besoin)
            if (!id_restaurant || !id_gestionnaire || !qte_commande) {
                return res.status(400).json({
                    error: "Les champs 'id_restaurant', 'id_gestionnaire' et 'qte_commande' sont obligatoires.",
                });
            }

            // Récupération automatique de l'utilisateur connecté (Nécessite un middleware d'authentification)
            // L'ID du client est récupéré depuis le token, ce qui est correct pour une app authentifiée.
            // Si l'utilisateur n'est pas connecté, cela échouera.
            const id_personne = req.user ? req.user.uid : "ANONYMOUS_USER"; // Utilisation de req.user.uid

            if (id_personne === "ANONYMOUS_USER") {
                 // Si vous avez besoin que l'utilisateur soit connecté, décommentez ceci:
                 // return res.status(401).json({ error: "Authentification requise." });
            }

            // Création d'une commande
            const docRef = await db.collection("commandes").add({
                id_personne,
                id_restaurant,
                id_gestionnaire,
                qte_commande: Number(qte_commande), // Assurez-vous que c'est un nombre
                date_commande: date_commande ? new Date(date_commande) : new Date(),
                // Enregistrement des données client
                clientName,
                phone,
                address,
                total: Number(total), // Assurez-vous que c'est un nombre
                deliveryTime: time,
                notes,
                plat_name,
                price_per_unit: Number(price_per_unit), // Assurez-vous que c'est un nombre
                statut: "En attente", // Statut initial

                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            res.status(201).json({
                message: "Commande créée avec succès",
                id_commande: docRef.id,
            });
        } catch (error) {
            console.error("Erreur lors de la création de la commande:", error);
            res.status(500).json({ error: "Erreur serveur: " + error.message });
        }
    },

    // ... (les autres fonctions getCommandes, getCommandeById, updateCommande, deleteCommande restent inchangées)
    async getCommandes(req, res) {
        try {
            const snapshot = await db
                .collection("commandes")
                .orderBy("date_commande", "desc")
                .get();

            const commandes = snapshot.docs.map((doc) => ({
                id_commande: doc.id,
                ...doc.data(),
            }));

            res.status(200).json(commandes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCommandeById(req, res) {
        try {
            const docRef = db.collection("commandes").doc(req.params.id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).json({ error: "Commande non trouvée." });
            }

            res.status(200).json({ id_commande: doc.id, ...doc.data() });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateCommande(req, res) {
        try {
            const docRef = db.collection("commandes").doc(req.params.id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).json({ error: "Commande non trouvée." });
            }

            const updateData = { ...req.body };
            updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

            await docRef.update(updateData);

            res.status(200).json({ message: "Commande mise à jour avec succès." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteCommande(req, res) {
        try {
            const docRef = db.collection("commandes").doc(req.params.id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).json({ error: "Commande non trouvée." });
            }

            await docRef.delete();
            res.status(200).json({ message: "Commande supprimée avec succès." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = CommandeController;