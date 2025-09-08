/*
const express = require("express");
const router = express.Router();
const ActiviteController = require("../controllers/ActivitesController");

/!**
 * @swagger
 * tags:
 *   nom: Activités
 *   description: Gestion des activités
 *!/

/!**
 * @swagger
 * /api/activites:
 *   post:
 *     summary: Créer une nouvelle activité
 *     tags: [Activités]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - description
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Randonnée en montagne"
 *               description:
 *                 type: string
 *                 example: "Excursion guidée de 5 heures en montagne"
 *     responses:
 *       201:
 *         description: Activité créée avec succès
 *       400:
 *         description: Erreur de validation
 *!/
router.post("/", ActiviteController.createActivite);

/!**
 * @swagger
 * /api/activites:
 *   get:
 *     summary: Récupérer la liste des activités
 *     tags: [Activités]
 *     responses:
 *       200:
 *         description: Liste des activités
 *!/
router.get("/", ActiviteController.getActivites);

/!**
 * @swagger
 * /api/activites/{id}:
 *   get:
 *     summary: Récupérer une activité par ID
 *     tags: [Activités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’activité à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activité trouvée
 *       404:
 *         description: Activité non trouvée
 *!/
router.get("/:id", ActiviteController.getActiviteParId);

/!**
 * @swagger
 * /api/activites/{id}:
 *   put:
 *     summary: Mettre à jour une activité
 *     tags: [Activités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’activité à modifier
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
 *                 example: "Nouvelle activité"
 *               description:
 *                 type: string
 *                 example: "Description mise à jour"
 *     responses:
 *       200:
 *         description: Activité mise à jour
 *       404:
 *         description: Activité non trouvée
 *!/
router.put("/:id", ActiviteController.updateActivite);

/!**
 * @swagger
 * /api/activites/{id}:
 *   delete:
 *     summary: Supprimer une activité
 *     tags: [Activités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’activité à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activité supprimée
 *       404:
 *         description: Activité non trouvée
 *!/
router.delete("/:id", ActiviteController.deleteActivite);

module.exports = router;

*/


const express = require("express");
const router = express.Router();
const ActiviteController = require("../controllers/ActivitesController");
const upload = require("../middlewares/upload"); // multer config (ex: upload.single("image"))

/**
 * @swagger
 * tags:
 *   - name: Activités
 *     description: Gestion des activités
 */

/**
 * @swagger
 * /api/activites:
 *   post:
 *     summary: Créer une nouvelle activité
 *     tags: [Activités]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - description
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Randonnée en montagne"
 *               description:
 *                 type: string
 *                 example: "Excursion guidée de 5 heures en montagne"
 *               latitude:
 *                 type: number
 *                 example: 12.3456
 *               longitude:
 *                 type: number
 *                 example: -7.6543
 *               location:
 *                 type: string
 *                 example: "Bamako, Mali"
 *               phone:
 *                 type: string
 *                 example: "23456789"
 *               email:
 *                 type: string
 *                 example: "email@gmail.com"
 *               prix:
 *                 type: number
 *                 example: 12000
 *               payment:
 *                 type: string
 *                 example: "orange"
 *               category:
 *                 type: string
 *                 example: "soiree"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Activité créée avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/", upload.single("image"), ActiviteController.createActivite);

/**
 * @swagger
 * /api/activites:
 *   get:
 *     summary: Récupérer la liste des activités
 *     tags: [Activités]
 *     responses:
 *       200:
 *         description: Liste des activités
 */
router.get("/", ActiviteController.getActivites);

/**
 * @swagger
 * /api/activites/{id}:
 *   get:
 *     summary: Récupérer une activité par ID
 *     tags: [Activités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’activité à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activité trouvée
 *       404:
 *         description: Activité non trouvée
 */
router.get("/:id", ActiviteController.getActiviteParId);

/**
 * @swagger
 * /api/activites/{id}:
 *   put:
 *     summary: Mettre à jour une activité
 *     tags: [Activités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’activité à modifier
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
 *                 example: "Nouvelle activité"
 *               description:
 *                 type: string
 *                 example: "Description mise à jour"
 *     responses:
 *       200:
 *         description: Activité mise à jour
 *       404:
 *         description: Activité non trouvée
 */
router.put("/:id", ActiviteController.updateActivite);

/**
 * @swagger
 * /api/activites/{id}:
 *   delete:
 *     summary: Supprimer une activité
 *     tags: [Activités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l’activité à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activité supprimée
 *       404:
 *         description: Activité non trouvée
 */
router.delete("/:id", ActiviteController.deleteActivite);

module.exports = router;
