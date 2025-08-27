const express = require("express");
const { body, validationResult } = require("express-validator");
const {
    addUtilisateur,
    getUtilisateurs,
    updateUtilisateur,
    deleteUtilisateur,
} = require("../controllers/UtilisateurController");

const router = express.Router();

// Middleware validation des erreurs
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erreurs: errors.array() });
    }
    next();
};

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/utilisateurs:
 *   post:
 *     summary: Ajouter un nouvel utilisateur
 *     tags: [Utilisateurs]
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
 *                 example: "Jean Dupont"
 *               email:
 *                 type: string
 *                 example: "jean.dupont@example.com"
 *               motDePasse:
 *                 type: string
 *                 example: "motdepasse123"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post(
    "/",
    [
        body("nom").notEmpty().withMessage("Le nom est requis"),
        body("email").isEmail().withMessage("Email invalide"),
        body("motDePasse")
            .isLength({ min: 8 })
            .withMessage("Le mot de passe doit contenir au moins 8 caractères"),
    ],
    validate,
    addUtilisateur
);

/**
 * @swagger
 * /api/utilisateurs:
 *   get:
 *     summary: Récupérer la liste de tous les utilisateurs
 *     tags: [Utilisateurs]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get("/", getUtilisateurs);

/**
 * @swagger
 * /api/utilisateurs/{id}:
 *   put:
 *     summary: Modifier un utilisateur existant
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’utilisateur à modifier
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
 *                 example: "Nouveau Nom"
 *               email:
 *                 type: string
 *                 example: "nouveau.email@example.com"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put(
    "/:id",
    [
        body("nom")
            .optional()
            .notEmpty()
            .withMessage("Le nom ne peut pas être vide"),
        body("email").optional().isEmail().withMessage("Email invalide"),
    ],
    validate,
    updateUtilisateur
);

/**
 * @swagger
 * /api/utilisateurs/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete("/:id", deleteUtilisateur);

module.exports = router;
