const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");

router.post("/", RestaurantController.createRestaurant);

// router.get("/", RestaurantController.getRestaurants);

router.get("/:id", RestaurantController.getRestaurantById);

router.put("/:id", RestaurantController.updateRestaurant);

router.delete("/:id", RestaurantController.deleteRestaurant);

module.exports = router;
