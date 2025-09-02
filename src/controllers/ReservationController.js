const express = require("express");
const router = express.Router();
const { admin, db } = require("../services/firebase.js");

const collection = db.collection("Reservation");

const { validationResult } = require("express-validator");

const ReservationController = {
    // Créer une réservation
    async createReservation(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erreurs: errors.array() });
        }

        try {
            const { restaurantId, date, nombrePersonnes, statut } = req.body;

            if (!restaurantId || !date || !nombrePersonnes) {
                return res
                    .status(400)
                    .json({ error: "Tous les champs requis doivent être remplis." });
            }

            const docRef = await db.collection("reservations").add({
                utilisateurId: req.user.uid, // 🔑 Récupéré automatiquement via authFirebase
                restaurantId,
                date: new Date(date),
                nombrePersonnes,
                statut: statut || "en attente",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            res.status(201).json({
                message: "Réservation créée avec succès",
                id: docRef.id,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Récupérer toutes les réservations
    async getReservations(req, res) {
        try {
            const snapshot = await db
                .collection("reservations")
                .orderBy("date", "desc")
                .get();

            const reservations = snapshot.docs.map((doc) => ({
                id: doc.id,
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
            updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

            await docRef.update(updateData);

            res
                .status(200)
                .json({ message: "Réservation mise à jour avec succès." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Supprimer une réservation
    async deleteReservation(req, res) {
        try {
            const docRef = db.collection("reservations").doc(req.params.id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).json({ error: "Réservation non trouvée." });
            }

            await docRef.delete();

            res
                .status(200)
                .json({ message: "Réservation supprimée avec succès." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ReservationController;