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

// Ajouter un utilisateur avec validation
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

// Lire tous les utilisateurs
router.get("/", getUtilisateurs);

// Modifier un utilisateur avec validation
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

// Supprimer un utilisateur
router.delete("/:id", deleteUtilisateur);

module.exports = router;
