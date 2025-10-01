const express = require("express");
const router = express.Router();
const ProfilController = require("../controllers/ProfilController");
const verifyFirebaseToken = require("../middlewares/authfirebase");

/**
 * @swagger
 * tags:
 *   - name: Authentification et Profils
 *     description: Gestion de l'inscription, connexion et profils utilisateurs
 */

// =====================================================================
// ROUTES D'AUTHENTIFICATION (PAS BESOIN DE TOKEN)
// =====================================================================

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Authentification et Profils]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - password
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Kone"
 *               prenom:
 *                 type: string
 *                 example: "Madou"
 *               email:
 *                 type: string
 *                 example: "madou.kone@example.com"
 *               password:
 *                 type: string
 *                 example: "MotDePasse123"
 *               phoneNumber:
 *                 type: string
 *                 example: "+223 70 00 00 00"
 *     responses:
 *       "201":
 *         description: Utilisateur créé avec succès.
 *       "400":
 *         description: Données manquantes ou invalides.
 *       "409":
 *         description: Cet email est déjà utilisé.
 */
router.post("/users/register", ProfilController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     tags: [Authentification et Profils]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "madou.kone@example.com"
 *               password:
 *                 type: string
 *                 example: "MotDePasse123"
 *     responses:
 *       "200":
 *         description: Connexion réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Jeton d'authentification (à utiliser pour les routes sécurisées).
 *       "401":
 *         description: Mot de passe ou email incorrect.
 */
router.post("/users/login", ProfilController.login);

// =====================================================================
// ROUTES DE PROFIL (NÉCESSITENT LE TOKEN D'AUTHENTIFICATION)
// =====================================================================

// Appliquer le middleware d'authentification pour les routes ci-dessous
router.use("/profils", verifyFirebaseToken);

/**
 * @swagger
 * /profils/{userId}:
 *   get:
 *     summary: Récupérer le profil de l'utilisateur connecté
 *     tags: [Authentification et Profils]
 *     security:
 *       - firebaseAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'utilisateur (UID Firebase)
 *     responses:
 *       "200":
 *         description: Profil récupéré avec succès
 *       "401":
 *         description: Non autorisé, token invalide ou manquant
 *       "404":
 *         description: Profil non trouvé
 */
router.get("/profils/:userId", ProfilController.getProfile);

/**
 * @swagger
 * /profils/{userId}:
 *   put:
 *     summary: Mettre à jour le profil de l'utilisateur connecté
 *     tags: [Authentification et Profils]
 *     security:
 *       - firebaseAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'utilisateur (UID Firebase)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Kone"
 *               prenom:
 *                 type: string
 *                 example: "Madou"
 *               phoneNumber:
 *                 type: string
 *                 example: "+223 70 00 00 00"
 *               email:
 *                 type: string
 *                 example: "madou.kone@example.com"
 *     responses:
 *       "200":
 *         description: Profil mis à jour avec succès
 *       "400":
 *         description: Aucune donnée à mettre à jour.
 *       "401":
 *         description: Non autorisé
 */
router.put("/profils/:userId", ProfilController.updateProfile);

/**
 * @swagger
 * /profils/{userId}:
 *   delete:
 *     summary: Supprimer le profil de l'utilisateur
 *     tags: [Authentification et Profils]
 *     security:
 *       - firebaseAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'utilisateur à supprimer (doit correspondre au token)
 *     responses:
 *       "200":
 *         description: Profil utilisateur supprimé avec succès.
 *       "401":
 *         description: Non autorisé, token manquant ou invalide.
 *       "403":
 *         description: Non autorisé à supprimer ce profil.
 *       "500":
 *         description: Échec de la suppression du profil.
 */
router.delete("/profils/:userId", ProfilController.deleteProfile);

module.exports = router;
