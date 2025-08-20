const express = require("express");
const router = express.Router();
const HotelController = require("../controllers/HotelController");

router.post("/", HotelController.createHotel);

router.get("/", HotelController.getHotels);

router.get("/:id", HotelController.getHotelParId);

router.put("/:id", HotelController.updateHotel);

router.delete("/:id", HotelController.deleteHotel);

module.exports = router;
