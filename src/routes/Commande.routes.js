const express = require("express");
const router = express.Router();
const CommandeController = require("../controllers/CommandeController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Commande:
 *       type: object
 *       required:
 *         - id_restaurant
 *         - id_gestionnaire
 *         - qte_commande
 *         - clientName
 *         - phone
 *         - address
 *         - total
 *       properties:
 *         id_personne:
 *           type: string
 *           description: ID de l'utilisateur (récupéré du token si authentifié)
 *         id_restaurant:
 *           type: string
 *         id_gestionnaire:
 *           type: string
 *         qte_commande:
 *           type: number
 *         clientName:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         total:
 *           type: number
 *         time:
 *           type: string
 *           description: Heure de livraison souhaitée
 *         notes:
 *           type: string
 *           description: Notes spéciales
 *         plat_name:
 *           type: string
 *         price_per_unit:
 *           type: number
 *         date_commande:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/commandes:
 *   post:
 *     summary: Créer une commande
 *     tags: [Commandes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commande'
 *     responses:
 *       "201":
 *         description: Commande créée avec succès
 *       "400":
 *         description: Erreur de validation (champs manquants)
 *       "500":
 *         description: Erreur serveur
 */
router.post("/", CommandeController.createCommande);

/**
 * @swagger
 * /api/commandes:
 *   get:
 *     summary: Récupérer toutes les commandes
 *     tags: [Commandes]
 *     responses:
 *       "200":
 *         description: Liste des commandes
 */
router.get("/", CommandeController.getCommandes);

/**
 * @swagger
 * /api/commandes/{id}:
 *   get:
 *     summary: Récupérer une commande par ID
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Commande trouvée
 *       "404":
 *         description: Commande non trouvée
 */
router.get("/:id", CommandeController.getCommandeById);

/**
 * @swagger
 * /api/commandes/{id}:
 *   put:
 *     summary: Mettre à jour une commande
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commande'
 *     responses:
 *       "200":
 *         description: Commande mise à jour
 */
router.put("/:id", CommandeController.updateCommande);

/**
 * @swagger
 * /api/commandes/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Commande supprimée
 *       "404":
 *         description: Commande non trouvée
 */
router.delete("/:id", CommandeController.deleteCommande);

module.exports = router;
