const express = require("express");
const { body } = require("express-validator");
const {
  addGestionnaire,
  getGestionnaires,
  updateGestionnaire,
  deleteGestionnaire,
} = require("../controllers/GestionnaireController");

const router = express.Router();

// 👉 Créer un gestionnaire avec validation
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

router.get("/", getGestionnaires);

router.put("/:id", updateGestionnaire);

router.delete("/:id", deleteGestionnaire);

module.exports = router;
