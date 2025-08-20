const express = require("express");
const { body } = require("express-validator");
const AdministrateurController = require("../controllers/AdministrateurController");
const ProfilController = require("../controllers/ProfilController");
const verifyFirebaseToken = require("../middlewares/authfirebase");

const router = express.Router();

router.use(verifyFirebaseToken);

//Routes de profil personnel (Firebase auth user)
router.get("/profil", ProfilController.getProfile);
router.put("/profil", ProfilController.updateProfile);

//Création d’un administrateur avec validation
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

//Liste de tous les administrateurs
router.get("/administrateurs", AdministrateurController.getAll);

//Mise à jour d’un administrateur
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

// Suppression d’un administrateur
router.delete("/administrateurs/:id", AdministrateurController.remove);

module.exports = router;
