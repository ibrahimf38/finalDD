const express = require("express");
const { body } = require("express-validator");
const AdministrateurController = require("../controllers/AdministrateurController");
const ProfilController = require("../controllers/ProfilController");
const verifyFirebaseToken = require("../middlewares/authfirebase");
const router = express.Router();



router.use(verifyFirebaseToken);


/**
 * @swagger
 * /api/admin/profil:
 *   get:
 *     summary: Récupérer le profil de l’utilisateur connecté (Firebase Auth)
 *     tags: [Profil]
 *     responses:
 *       200:
 *         description: Informations du profil utilisateur
 *       401:
 *         description: Non autorisé
 */
router.get("/profil", ProfilController.getProfile);

/**
 * @swagger
 * /api/admin/profil:
 *   put:
 *     summary: Mettre à jour le profil de l’utilisateur connecté
 *     tags: [Profil]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Nouvel utilisateur"
 *               email:
 *                 type: string
 *                 example: "nouveau.email@example.com"
 *     responses:
 *       200:
 *         description: Profil mis à jour
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 */
router.put("/profil", ProfilController.updateProfile);


/**
 * @swagger
 * /api/admin/administrateurs:
 *   post:
 *     summary: Créer un nouvel administrateur
 *     tags: [Administrateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - motDePasse
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Admin Principal"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               motDePasse:
 *                 type: string
 *                 example: "motdepasse123"
 *     responses:
 *       201:
 *         description: Administrateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post(
    "/administrateurs",
    [
        body("nom").notEmpty().withMessage("Le nom est requis"),
        body("email").isEmail().withMessage("Email invalide"),
        body("motDePasse")
            .isLength({ min: 8 })
            .withMessage("Le mot de passe doit contenir au moins 8 caractères"),
    ],
    AdministrateurController.addWithValidation
);

/**
 * @swagger
 * /api/admin/administrateurs:
 *   get:
 *     summary: Récupérer la liste de tous les administrateurs
 *     tags: [Administrateurs]
 *     responses:
 *       200:
 *         description: Liste des administrateurs
 */
router.get("/administrateurs", AdministrateurController.getAll);

/**
 * @swagger
 * /api/admin/administrateurs/{id}:
 *   put:
 *     summary: Mettre à jour un administrateur par ID
 *     tags: [Administrateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’administrateur à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Admin Modifié"
 *               email:
 *                 type: string
 *                 example: "modifie@example.com"
 *     responses:
 *       200:
 *         description: Administrateur mis à jour
 *       404:
 *         description: Administrateur non trouvé
 */
router.put(
    "/administrateurs/:id",
    [
        body("nom")
            .optional()
            .notEmpty()
            .withMessage("Le nom ne peut pas être vide"),
        body("email").optional().isEmail().withMessage("Email invalide"),
    ],
    AdministrateurController.update
);

/**
 * @swagger
 * /api/admin/administrateurs/{id}:
 *   delete:
 *     summary: Supprimer un administrateur par ID
 *     tags: [Administrateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’administrateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Administrateur supprimé
 *       404:
 *         description: Administrateur non trouvé
 */
router.delete("/administrateurs/:id", AdministrateurController.remove);

module.exports = router;
