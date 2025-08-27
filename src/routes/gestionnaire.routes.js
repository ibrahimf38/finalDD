const express = require("express");
const { body } = require("express-validator");
const {
    addGestionnaire,
    getGestionnaires,
    updateGestionnaire,
    deleteGestionnaire,
} = require("../controllers/GestionnaireController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Gestionnaires
 *   description: Gestion des gestionnaires
 */

/**
 * @swagger
 * /api/gestionnaires:
 *   post:
 *     summary: Créer un nouveau gestionnaire
 *     tags: [Gestionnaires]
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
 *                 example: "Madou Kone"
 *               email:
 *                 type: string
 *                 example: "madou.kone@example.com"
 *               motDePasse:
 *                 type: string
 *                 example: "motdepasse123"
 *     responses:
 *       201:
 *         description: Gestionnaire créé avec succès
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
    addGestionnaire
);

/**
 * @swagger
 * /api/gestionnaires:
 *   get:
 *     summary: Récupérer la liste de tous les gestionnaires
 *     tags: [Gestionnaires]
 *     responses:
 *       200:
 *         description: Liste des gestionnaires
 */
router.get("/", getGestionnaires);

/**
 * @swagger
 * /api/gestionnaires/{id}:
 *   put:
 *     summary: Mettre à jour un gestionnaire
 *     tags: [Gestionnaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du gestionnaire à modifier
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
 *                 example: "Madou Kone Modifié"
 *               email:
 *                 type: string
 *                 example: "madou.kone.mod@example.com"
 *               motDePasse:
 *                 type: string
 *                 example: "nouveaumdp123"
 *     responses:
 *       200:
 *         description: Gestionnaire mis à jour
 *       404:
 *         description: Gestionnaire non trouvé
 */
router.put("/:id", updateGestionnaire);

/**
 * @swagger
 * /api/gestionnaires/{id}:
 *   delete:
 *     summary: Supprimer un gestionnaire
 *     tags: [Gestionnaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du gestionnaire à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gestionnaire supprimé
 *       404:
 *         description: Gestionnaire non trouvé
 */
router.delete("/:id", deleteGestionnaire);

module.exports = router;
