const express = require("express");
const router = express.Router();
const ProfilController = require("../controllers/ProfilController");
const verifyFirebaseToken = require("../middlewares/authfirebase");

router.use(verifyFirebaseToken);

router.get("/profil", ProfilController.getProfile);
router.put("/profil", ProfilController.updateProfile);

router.use(verifyFirebaseToken);

module.exports = router;



