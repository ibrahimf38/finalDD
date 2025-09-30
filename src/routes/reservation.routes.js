const express = require("express");
const { body, validationResult } = require("express-validator");
const ReservationController = require("../controllers/ReservationController");
const authFirebase = require("../middlewares/authFirebase"); // 👈 import du middleware

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
 *   - name: Reservations
 *     description: Gestion des réservations
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Ajouter une nouvelle réservation
 *     description: Crée une réservation pour un hôtel, un restaurant, un événement ou une activité.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date_reservation
 *               - nbre_personne
 *             properties:
 *               id_restaurant:
 *               id_hotel:
 *                 type: string
 *                 example: "64df91bc34ef56gh78ij90kl"
 *               id_restaurant:
 *                 type: string
 *                 example: "64df91bc34ef56gh78ij90kl"
 *               id_evenement:
 *                 type: string
 *                 example: "64df91bc34ef56gh78ij90kl"
 *               id_activite:
 *                 type: string
 *                 example: "64df91bc34ef56gh78ij90kl"
 *               id_hotel:
 *                 type: string
 *                 example: "65df91bc34ef56gh78ij45mn"
 *               date_reservation:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-09-21T19:30:00Z"
 *               nbre_personne:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       "201":
 *         description: Réservation créée avec succès
 *       "400":
 *         description: Erreur de validation
 *       "401":
 *         description: Non autorisé (authentification manquante)
 */
router.post(
    "/",
    authFirebase, // protège et ajoute req.user
    [
        // Suppression des champs utilisateurId et restaurantId obligatoires du BODY
        // L'ID utilisateur vient du token, l'ID de ressource est optionnel (hôtel, resto, etc.)
        body("id_hotel").optional().isString().withMessage("L'id hôtel doit être une chaîne"),
        body("id_restaurant").optional().isString().withMessage("L'id restaurant doit être une chaîne"),
        body("id_evenement").optional().isString().withMessage("L'id événement doit être une chaîne"),
        body("id_activite").optional().isString().withMessage("L'id activité doit être une chaîne"),

        // Validation des champs OBLIGATOIRES pour toutes les réservations
        body("date_reservation")
            .notEmpty()
            .withMessage("La date de réservation est requise")
            .isISO8601()
            .withMessage("Format de date invalide"),
        body("nbre_personne")
            .notEmpty().withMessage("Le nombre de personnes est requis")
            .isInt({ min: 1 })
            .withMessage("Nombre de personnes invalide"),
    ],
    validateReservation,
    // NOTE TRÈS IMPORTANTE : Vous devez ajouter votre middleware d'authentification ici
    // Exemple: router.post('/', authMiddleware, validateReservation, ReservationController.createReservation);
    ReservationController.createReservation
);

/**
 * @swagger
 * /api/reservations/me:
 *   get:
 *     summary: Récupérer les infos de l'utilisateur connecté
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Infos utilisateur
 */
router.get("/me", authFirebase, ReservationController.getUserInfo);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Récupérer la liste de toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       "200":
 *         description: Liste des réservations
 */
router.get("/", ReservationController.getReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Mettre à jour une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.put(
    "/:id",
    authFirebase, // protège la mise à jour
    [
        body("date_reservation").optional().isISO8601().withMessage("date invalide"),
        body("nbre_personne").optional().isInt({ min: 1 }).withMessage("Nombre invalide"),
        body("statut").optional().isIn(["en attente", "confirmée", "annulée"]).withMessage("Statut invalide"),
    ],
    validateReservation,
    ReservationController.updateReservation
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
 *               date_reservation:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-09-22T19:30:00Z"
 *               nbre_personne:
 *                 type: integer
 *                 example: 4
 *               statut:
 *                 type: string
 *                 enum: [en attente, confirmée, annulée]
 *                 example: "confirmée"
 *     responses:
 *       "200":
 *         description: Réservation mise à jour
 *       "400":
 *         description: Erreur de validation
 *       "404":
 *         description: Réservation non trouvée
 */
router.put(
  "/:id",
  [
    body("date_reservation").optional().isISO8601().withMessage("date_reservation invalide"),
    body("nbre_personne")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Nombre de personnes invalide"),
    body("statut")
      .optional()
      .isIn(["en attente", "confirmée", "annulée"])
      .withMessage("Statut invalide"),
  ],
  validateReservation,
  ReservationController.updateReservation
>>>>>>> 0450303384d793addde8694ee5e5bfbc84919c33
);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
<<<<<<< HEAD
 *     security:
 *       - bearerAuth: []
=======
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Réservation supprimée
 *       "404":
 *         description: Réservation non trouvée
>>>>>>> 0450303384d793addde8694ee5e5bfbc84919c33
 */
router.delete("/:id", authFirebase, ReservationController.deleteReservation);

module.exports = router;
