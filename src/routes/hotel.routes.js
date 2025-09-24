const express = require("express");
const router = express.Router();
const HotelController = require("../controllers/HotelController");
const RestaurantController = require("../controllers/RestaurantController");
const upload = require("../middlewares/upload");

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Gestion des hôtels
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hôtel Le Palace"
 *               location:
 *                 type: string
 *                 example: "Nice, France"
 *               ownerFirstName:
 *                 type: string
 *                 example: "Pierre"
 *               ownerLastName:
 *                 type: string
 *                 example: "Martin"
 *               phone:
 *                 type: string
 *                 example: "+33 4 93 12 34 56"
 *               email:
 *                 type: string
 *                 example: "contact@palace.com"
 *               description:
 *                 type: string
 *                 example: "Hôtel de luxe avec vue sur la mer"
 *               room:
 *                 type: integer
 *                 example: 120
 *               payment:
 *                 type: string
 *                 example: "Carte bancaire, Espèces"
 *               price:
 *                 type: number
 *                 example: 12000
 *               rating:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Hôtel créé avec succès
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/", upload.single("image"), HotelController.createHotel);


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
 * /api/hotels/count:
 *   get:
 *     summary: Récupérer nombre des hotels
 *     tags: [Count]
 *     responses:
 *       200:
 *         description: Nombre des Hôtels
 */
router.get("/count", HotelController.countHotels);

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
