const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController.js");

router.post("/send-user", NotificationController.sendToUser);

router.post("/send-all", NotificationController.sendToAll);

module.exports = router;