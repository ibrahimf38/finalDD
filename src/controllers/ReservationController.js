const express = require("express");
const router = express.Router();
const { admin, db } = require("../services/firebase.js");
const { validationResult } = require("express-validator");

const ReservationController = {
    // Créer une réservation
    async createReservation(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erreurs: errors.array() });
        }

        try {
            const {
                id_restaurant,
                id_hotel,
                id_evenement,
                id_activite,
                date_reservation,
                nbre_personne,
            } = req.body;

            // Vérification des champs requis
            if (!date_reservation || !nbre_personne) {
                return res.status(400).json({
                    error: "Les champs 'date_reservation' et 'nbre_personne' sont obligatoires.",
                });
            }

            // Récupération de l'UID (doit être fourni par un middleware d'auth, ex: Firebase)
            const utilisateurId = req.user ? req.user.uid : null;

            if (!utilisateurId) {
                 // Le serveur renvoie une 401 si l'utilisateur n'est pas authentifié
                 return res.status(401).json({ error: "Authentification requise. L'ID utilisateur est manquant (jeton non fourni ou invalide)." });
            }

            const docRef = await db.collection("reservations").add({
                // CORRECTION: Utilisation de la variable utilisateurId
                id_personne: utilisateurId,
                id_restaurant: id_restaurant || null,
                id_hotel: id_hotel || null,
                id_evenement: id_evenement || null,
                id_activite: id_activite || null,
                date_reservation: new Date(date_reservation),
                nbre_personne: parseInt(nbre_personne, 10) || null,
                statut: "en attente",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            res.status(201).json({
                message: "Réservation créée avec succès",
                id: docRef.id,
            });
        } catch (error) {
             console.error("Erreur lors de la création de la réservation:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // Récupérer toutes les réservations (inchangé)
    async getReservations(req, res) {
        try {
            const snapshot = await db
                .collection("reservations")
                .orderBy("date_reservation", "desc")
                .get();

            const reservations = snapshot.docs.map((doc) => ({
                id_reservation: doc.id,
                ...doc.data(),
            }));

            res.status(200).json(reservations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Mettre à jour une réservation
    async updateReservation(req, res) {
        try {
            const docRef = db.collection("reservations").doc(req.params.id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).json({ error: "Réservation non trouvée." });
            }

            const updateData = { ...req.body };
            // CORRECTION: Assurer la bonne conversion des types pour la mise à jour
             if (updateData.date_reservation) {
                updateData.date_reservation = new Date(updateData.date_reservation);
            }
            if (updateData.nbre_personne) {
                updateData.nbre_personne = parseInt(updateData.nbre_personne, 10);
            }
            updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

            await docRef.update(updateData);

            res.status(200).json({ message: "Réservation mise à jour avec succès." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Supprimer une réservation (inchangé)
    async deleteReservation(req, res) {
        try {
            const docRef = db.collection("reservations").doc(req.params.id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).json({ error: "Réservation non trouvée." });
            }

            await docRef.delete();

            res.status(200).json({ message: "Réservation supprimée avec succès." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ReservationController;