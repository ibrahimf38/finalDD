const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");
const upload = require("../middlewares/upload");

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - localisation
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Restaurant Le Gourmet"
 *               localisation:
 *                 type: string
 *                 example: "Paris, France"
 *               description:
 *                 type: string
 *                 example: "Cuisine locale et internationale"
 *               ownerFirstName:
 *                 type: string
 *                 example: "Jean"
 *               ownerLastName:
 *                 type: string
 *                 example: "Dupont"
 *               phone:
 *                 type: string
 *                 example: "+33 6 12 34 56 78"
 *               plat:
 *                 type: string
 *                 example: "Poulet Yassa"
 *               price:
 *                 type: number
 *                 example: 25.5
 *               quantity:
 *                 type: integer
 *                 example: 50
 *               payment:
 *                 type: string
 *                 example: "Carte bancaire, Espèces"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Restaurant créé avec succès
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/", upload.single("image"), RestaurantController.createRestaurant);


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
 * /api/restaurants/count:
 *   get:
 *     summary: Récupérer nombre des Restaurants
 *     tags: [Count]
 *     responses:
 *       200:
 *         description: Nombre des Restaurants
 */
router.get("/count", RestaurantController.countRestaurants);


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
