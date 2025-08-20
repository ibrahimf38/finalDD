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

//Ajouter une réservation
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
    body("nombrePersonnes")
      .isInt({ min: 1 })
      .withMessage("Nombre de personnes invalide"),
  ],
  validateReservation,
  ReservationController.createReservation
);

//Lire toutes les réservations
router.get("/", ReservationController.getReservations);

// Mettre à jour une réservation
router.put(
  "/:id",
  [
    body("date").optional().isISO8601().withMessage("Date invalide"),
    body("nombrePersonnes")
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
);

// Supprimer une réservation
router.delete("/:id", ReservationController.deleteReservation);

module.exports = router;
