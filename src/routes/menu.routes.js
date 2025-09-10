const express = require("express");
const router = express.Router();
const MenuController = require("../controllers/MenuController");

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Gestion des menus
 */

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Créer un nouveau menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_restaurant
 *               - nom_du_plat
 *               - prix
 *               - Description
 *             properties:
 *               id_restaurant:
 *                 type: string
 *                 example: "64df90ab12cd3e4567ef89ab"
 *               nom_du_plat:
 *                 type: string
 *                 example: "Mafé"
 *               prix:
 *                 type: string
 *                 example: "2000fcfa"
 *               Description:
 *                 type: string
 *                 example: "Sauce à base d'arachide"
 *     responses:
 *       201:
 *         description: Menu enregistré avec succès
 *       400:
 *         description: Erreur de validation
 */

router.post("/", MenuController.createMenu);
/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Mettre à jour un menu
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du menu à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_restaurant:
 *                 type: string
 *                 example: "64df90ab12cd3e4567ef89ab"
 *               nom_du_plat:
 *                 type: string
 *                 example: "Tiep Bou Dien"
 *               prix:
 *                 type: string
 *                 example: "3500fcfa"
 *               Description:
 *                 type: string
 *                 example: "Plat traditionnel sénégalais à base de poisson et riz"
 *     responses:
 *       200:
 *         description: Menu mis à jour avec succès
 *       404:
 *         description: Menu non trouvé
 */


router.get("/:id", MenuController.getMenuById);
router.put("/:id", MenuController.updateMenu);
/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Supprimer un menu
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du menu à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu supprimé avec succès
 *       404:
 *         description: Menu non trouvé
 */

router.delete("/:id", MenuController.deleteMenu);

module.exports = router;
