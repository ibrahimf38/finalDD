const express = require("express");
const router = express.Router();
const EvenementController = require("../controllers/EvenementController");

/**
 * @swagger
 * tags:
 *   name: Evenements
 *   description: Gestion des événements
 */

/**
 * @swagger
 * /api/evenements:
 *   post:
 *     summary: Créer un nouvel événement
 *     tags: [Evenements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - date
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Conférence Tech"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-21"
 *               lieu:
 *                 type: string
 *                 example: "Salle A"
 *               description:
 *                 type: string
 *                 example: "Événement sur les nouvelles technologies"
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/", EvenementController.createEvenement);

/**
 * @swagger
 * /api/evenements:
 *   get:
 *     summary: Récupérer la liste de tous les événements
 *     tags: [Evenements]
 *     responses:
 *       200:
 *         description: Liste des événements
 */
router.get("/", EvenementController.getEvenements);

/**
 * @swagger
 * /api/evenements/{id}:
 *   put:
 *     summary: Mettre à jour un événement
 *     tags: [Evenements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement à modifier
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
 *                 example: "Conférence Tech 2025"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-01"
 *               lieu:
 *                 type: string
 *                 example: "Salle B"
 *               description:
 *                 type: string
 *                 example: "Nouvelle description de l'événement"
 *     responses:
 *       200:
 *         description: Événement mis à jour
 *       404:
 *         description: Événement non trouvé
 */
router.put("/:id", EvenementController.updateEvenement);

/**
 * @swagger
 * /api/evenements/{id}:
 *   delete:
 *     summary: Supprimer un événement
 *     tags: [Evenements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Événement supprimé
 *       404:
 *         description: Événement non trouvé
 */
router.delete("/:id", EvenementController.deleteEvenement);

module.exports = router;
