const express = require("express");
const router = express.Router();
const ProfilController = require("../controllers/ProfilController");
const verifyFirebaseToken = require("../middlewares/authfirebase");

/**
 * @swagger
 * tags:
 *   name: Profils
 *   description: Gestion des profils utilisateurs
 */

router.use(verifyFirebaseToken);

/**
 * @swagger
 * /api/profil/profil:
 *   get:
 *     summary: Récupérer le profil de l'utilisateur connecté
 *     tags: [Profils]
 *     security:
 *       - firebaseAuth: []
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *       401:
 *         description: Non autorisé, token invalide ou manquant
 */
router.get("/profil", ProfilController.getProfile);

/**
 * @swagger
 * /api/profil/profil:
 *   put:
 *     summary: Mettre à jour le profil de l'utilisateur connecté
 *     tags: [Profils]
 *     security:
 *       - firebaseAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Madou Kone"
 *               email:
 *                 type: string
 *                 example: "madou.kone@example.com"
 *               telephone:
 *                 type: string
 *                 example: "+223 70 00 00 00"
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       401:
 *         description: Non autorisé, token invalide ou manquant
 */
router.put("/profil", ProfilController.updateProfile);

router.use(verifyFirebaseToken);

module.exports = router;
