const express = require("express");
const { body, validationResult } = require("express-validator");
const ReservationController = require("../controllers/ReservationController");

const router = express.Router();

// Middleware de validation
const validateReservation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erreurs: errors.array() });
    }
    next();
};

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Ajouter une nouvelle réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - utilisateurId
 *               - restaurantId
 *               - date_reservation
 *               - nbre_personne
 *             properties:
 *               utilisateurId:
 *                 type: string
 *                 example: "64df90ab12cd3e4567ef89ab"
 *               restaurantId:
 *                 type: string
 *                 example: "64df91bc34ef56gh78ij90kl"
 *               date_reservation:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-09-21T19:30:00Z"
 *               nbre_personne:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post(
    "/",
    [
        body("utilisateurId").notEmpty().withMessage("L'id utilisateur est requis"),
        body("restaurantId").notEmpty().withMessage("L'id restaurant est requis"),
        body("date")
            .notEmpty()
            .withMessage("La date est requise")
            .isISO8601()
            .toDate(),
        body("nbre_personne")
            .isInt({ min: 1 })
            .withMessage("Nombre de personnes invalide"),
    ],
    validateReservation,
    ReservationController.createReservation
);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Récupérer la liste de toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Liste des réservations
 */
router.get("/", ReservationController.getReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Mettre à jour une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-09-22T19:30:00Z"
 *               nombrePersonnes:
 *                 type: integer
 *                 example: 4
 *               statut:
 *                 type: string
 *                 enum: [en attente, confirmée, annulée]
 *                 example: "confirmée"
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Réservation non trouvée
 */
router.put(
    "/:id",
    [
        body("date_reservation").optional().isISO8601().withMessage("date_reservation invalide"),
        body("nbre_personne")
            .optional()
            .isInt({ min: 1 })
            .withMessage("Nombre de personnes de personnes invalide"),
        body("statut")
            .optional()
            .isIn(["en attente", "confirmée", "annulée"])
            .withMessage("Statut invalide"),
    ],
    validateReservation,
    ReservationController.updateReservation
);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Réservation non trouvée
 */
router.delete("/:id", ReservationController.deleteReservation);

module.exports = router;
