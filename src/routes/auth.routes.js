/*
const authController = require("../controllers/auth/AuthController");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");



/!**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access_token
 *!/

/!**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel administrateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - motDePasse
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Admin Principal"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               motDePasse:
 *                 type: string
 *                 example: "motdepasse123"
 *     responses:
 *       201:
 *         description: Administrateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       422:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur serveur
 *!/
router.post(
    "/register",
    [
        body("nom").notEmpty().withMessage("Le nom est requis"),
        body("email").isEmail().withMessage("Email invalide"),
        body("motDePasse")
            .isLength({ min: 8 })
            .withMessage("Le mot de passe doit contenir au moins 8 caractères"),
    ],
    authController.registerUser
);

/!**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un administrateur avec email et mot de passe
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - motDePasse
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               motDePasse:
 *                 type: string
 *                 example: "motdepasse123"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     email:
 *                       type: string
 *                     emailVerified:
 *                       type: boolean
 *                 customToken:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: JWT token dans un cookie httpOnly
 *       422:
 *         description: Erreur de validation
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 *!/
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Email invalide"),
        body("motDePasse")
            .isLength({ min: 6 })
            .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
    ],
    authController.loginUser
);

/!**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion de l'administrateur
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 *!/
router.post("/logout", authController.logout);

/!**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Rafraîchir le token d'authentification
 *     tags: [Authentification]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Token rafraîchi avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customToken:
 *                   type: string
 *       401:
 *         description: Token manquant ou invalide
 *!/
router.post("/refresh-token", authController.refreshToken);

module.exports = router;*/


const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth/AuthController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access_token
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - motDePasse
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Admin Principal"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               motDePasse:
 *                 type: string
 *                 example: "motdepasse123"
 *               telephone:
 *                 type: string
 *                 example: "12345678"
 *               adresse:
 *                 type: string
 *                 example: "123 Rue Exemple"
 *               role:
 *                 type: string
 *                 example: "ADMIN"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       422:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur serveur
 */
router.post(
    "/register",
    [
        body("nom").notEmpty().withMessage("Le nom est requis"),
        body("email").isEmail().withMessage("Email invalide"),
        body("motDePasse")
            .isLength({ min:14 })
            .withMessage("Le mot de passe doit contenir au moins 14 caractères"),
    ],
    (req, res) => authController.registerUser(req, res)
);

/**
 * @swagger
 * /api/auth/count:
 *   get:
 *     summary: Récupérer nombre des personnes
 *     tags: [Count]
 *     responses:
 *       200:
 *         description: Nombre des personnes
 */
router.get("/count", authController.countPersonnes);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur avec email et mot de passe
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - motDePasse
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               motDePasse:
 *                 type: string
 *                 example: "motdepasse123"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     email:
 *                       type: string
 *                     emailVerified:
 *                       type: boolean
 *                 customToken:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: JWT token dans un cookie httpOnly
 *       422:
 *         description: Erreur de validation
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Email invalide"),
        body("motDePasse")
            .isLength({ min: 6 })
            .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
    ],
    (req, res) => authController.loginUser(req, res)
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 */
/*
router.post("/logout", (req, res) => authController.logout(req, res));
*/

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Rafraîchir le token d'authentification
 *     tags: [Authentification]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Token rafraîchi avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customToken:
 *                   type: string
 *       401:
 *         description: Token manquant ou invalide
 */
/*router.post("/refresh-token", (req, res) => authController.refreshToken(req, res));*/

module.exports = router;
