const express = require("express");
const router = express.Router();
const { admin, db } = require("../services/firebase.js");
const { validationResult } = require("express-validator");
const NotificationController = {
    // Envoyer une notification à un utilisateur spécifique
    async sendToUser(req, res) {
        try {
            const { userId, titre, contenu } = req.body;

            // Récupérer le token FCM de l'utilisateur dans Firestore
            const userDoc = await db.collection("users").doc(userId).get();
            if (!userDoc.exists) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            }

            const fcmToken = userDoc.data().fcmToken;
            if (!fcmToken) {
                return res.status(400).json({ error: "Pas d'identifiant FCM pour cet utilisateur." });
            }

            const message = {
                notification: { titre, contenu },
                token: fcmToken,
            };

            await admin.messaging().send(message);

            res.status(200).json({ message: "Notification envoyée avec succès " });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Envoyer une notification à TOUS les utilisateurs
    async sendToAll(req, res) {
        try {
            const { title, body } = req.body;

            const snapshot = await db.collection("users").get();
            const tokens = [];

            snapshot.forEach(doc => {
                const fcmToken = doc.data().fcmToken;
                if (fcmToken) tokens.push(fcmToken);
            });

            if (tokens.length === 0) {
                return res.status(400).json({ error: "Aucun identifiant trouvé." });
            }

            const message = {
                notification: { title, body },
                tokens,
            };

            const response = await admin.messaging().sendEachForMulticast(message);

            res.status(200).json({
                successCount: response.successCount,
                failureCount: response.failureCount,
                message: "Notification envoyée à tous les utilisateurs ",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = NotificationController;
