const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Gestion des restaurants
 */

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Créer un nouveau restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Restaurant Le Gourmet"
 *
 *
 *               description:
 *                 type: string
 *                 example: "Cuisine locale et internationale"
 *     responses:
 *       201:
 *         description: Restaurant créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/", RestaurantController.createRestaurant);

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Récupérer la liste de tous les hôtels
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Liste des restaurants
 */
router.get("/", RestaurantController.getRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Récupérer un restaurant par ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du restaurant à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant trouvé
 *       404:
 *         description: Restaurant non trouvé
 */
// router.get("/", RestaurantController.getRestaurants);
router.get("/:id", RestaurantController.getRestaurantById);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Mettre à jour un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du restaurant à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Restaurant Le Gourmet Modifié"
 *               adresse:
 *                 type: string
 *                 example: "456 Avenue Nouvelle"
 *
 *               description:
 *                 type: string
 *                 example: "Cuisine locale et internationale rénovée"
 *     responses:
 *       200:
 *         description: Restaurant mis à jour
 *       404:
 *         description: Restaurant non trouvé
 */
router.put("/:id", RestaurantController.updateRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Supprimer un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du restaurant à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant supprimé
 *       404:
 *         description: Restaurant non trouvé
 */
router.delete("/:id", RestaurantController.deleteRestaurant);

module.exports = router;
