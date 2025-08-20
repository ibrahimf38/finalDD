const express = require("express");
const router = express.Router();
const ActiviteController = require("../controllers/ActivitesController");

router.post("/", ActiviteController.createActivite);

router.get("/", ActiviteController.getActivites);

router.get("/:id", ActiviteController.getActiviteParId);

router.put("/:id", ActiviteController.updateActivite);

router.delete("/:id", ActiviteController.deleteActivite);

module.exports = router;
