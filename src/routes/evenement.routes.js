const express = require("express");
const router = express.Router();
const EvenementController = require("../controllers/EvenementController");

router.post("/", EvenementController.createEvenement);
router.get("/", EvenementController.getEvenements);
router.put("/:id", EvenementController.updateEvenement);
router.delete("/:id", EvenementController.deleteEvenement);

module.exports = router;
