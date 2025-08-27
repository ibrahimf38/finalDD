const express = require("express");
const router = express.Router();
const HotelController = require("../controllers/HotelController");

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Gestion des hôtels
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       required:
 *         - id_gestionnaire
 *         - name
 *         - location
 *         - ownerFirstName
 *         - ownerLastName
 *         - phone
 *         - email
 *       properties:
 *         id_hotel:
 *           type: string
 *           description: ID de l'hôtel
 *           example: "64df90ab12cd3e4567ef89ab"
 *         id_gestionnaire:
 *           type: string
 *           description: ID du gestionnaire
 *           example: "64df91bc34ef56gh78ij90kl"
 *         name:
 *           type: string
 *           example: "Hotel Plaza"
 *         location:
 *           type: string
 *           example: "123 Rue Principale, Bamako"
 *         ownerFirstName:
 *           type: string
 *           example: "Moussa"
 *         ownerLastName:
 *           type: string
 *           example: "Traoré"
 *         phone:
 *           type: string
 *           example: "+22370000000"
 *         email:
 *           type: string
 *           example: "hotelplaza@example.com"
 *         description:
 *           type: string
 *           example: "Hôtel 4 étoiles avec piscine et restaurant"
 *         room:
 *           type: integer
 *           example: 120
 *         payment:
 *           type: string
 *           example: "Carte bancaire, Mobile Money"
 *         image:
 *           type: string
 *           example: "https://exemple.com/images/hotel.jpg"
 *         rating:
 *           type: number
 *           format: float
 *           example: 4.5
 */

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     summary: Créer un nouvel hôtel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: Hôtel créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/", HotelController.createHotel);

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Récupérer la liste de tous les hôtels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: Liste des hôtels
 */
router.get("/", HotelController.getHotels);

/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     summary: Récupérer un hôtel par ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'hôtel à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hôtel trouvé
 *       404:
 *         description: Hôtel non trouvé
 */
router.get("/:id", HotelController.getHotelParId);

/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     summary: Mettre à jour un hôtel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'hôtel à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: Hôtel mis à jour
 *       404:
 *         description: Hôtel non trouvé
 */
router.put("/:id", HotelController.updateHotel);

/**
 * @swagger
 * /api/hotels/{id}:
 *   delete:
 *     summary: Supprimer un hôtel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'hôtel à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hôtel supprimé
 *       404:
 *         description: Hôtel non trouvé
 */
router.delete("/:id", HotelController.deleteHotel);

module.exports = router;
