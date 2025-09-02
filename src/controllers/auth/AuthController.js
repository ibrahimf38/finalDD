/*
const {
    auth,
    admin,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
} = require('../../services/firebase');
const Personne = require('../../models/Personne');


class AuthController {

    async registerUser(req, res) {
        try {
            const { nom, email, motDePasse, telephone, adresse, role } = req.body;

            if (!email || !motDePasse) {
                return res.status(422).json({ error: "Email et mot de passe requis" });
            }

            // 1. Créer l’utilisateur Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
            const user = userCredential.user;

            // 2. Enregistrer aussi en base dans la table "personne"
            await Personne.create({
                id: user.uid,       // uid Firebase comme clé primaire
                nom,
                email,
                telephone,
                adresse,
                mot_de_passe: motDePasse, // ⚠️ à hasher avec bcrypt !
                role: role || "USER"
            });

            res.status(201).json({
                message: "Utilisateur créé dans Firebase + Base de données",
                userId: user.uid
            });

        } catch (error) {
            console.error("Erreur inscription :", error);
            res.status(500).json({ error: error.message });
        }
    }

   /!* async registerUser(req, res) {
        try {
            const { email, motDePasse, nom } = req.body;

            if (!email || !motDePasse) {
                return res.status(422).json({
                    error: "Email et mot de passe requis"
                });
            }

            // Créer l'utilisateur avec Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
            const user = userCredential.user;

            // Optionnel : Ajouter des informations supplémentaires dans Firestore
            if (nom) {
                await admin.firestore().collection('users').doc(user.uid).set({
                    nom: nom,
                    email: email,
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                });
            }

            // Envoyer l'email de vérification
            //await sendEmailVerification(user);

            res.status(201).json({
                message: "Utilisateur créé avec succès. Email de vérification envoyé!",
                userId: user.uid
            });

        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            res.status(500).json({
                error: "Erreur lors de la création de l'utilisateur",
                details: error.message
            });
        }
    }*!/

    async loginUser(req, res) {
        try {
            const { email, motDePasse } = req.body;

            if (!email || !motDePasse) {
                return res.status(422).json({
                    error: "Email et mot de passe requis"
                });
            }

            // Connecter l'utilisateur
            const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
            const user = userCredential.user;

            // Générer un token personnalisé pour les sessions côté serveur
            const customToken = await admin.auth().createCustomToken(user.uid);

            // Obtenir le token ID
            const idToken = await user.getIdToken();

            // Définir le cookie avec le token
            res.cookie('access_token', idToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000 // 1 heure
            });

            res.status(200).json({
                message: "Connexion réussie",
                user: {
                    uid: user.uid,
                    email: user.email,
                    emailVerified: user.emailVerified
                },
                customToken
            });

        } catch (error) {
            console.error('Erreur lors de la connexion:', error);

            let errorMessage = "Erreur lors de la connexion";
            if (error.code === 'auth/user-not-found') {
                errorMessage = "Utilisateur non trouvé";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "Mot de passe incorrect";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Email invalide";
            }

            res.status(401).json({ error: errorMessage });
        }
    }

    async logout(req, res) {
        try {
            // Supprimer le cookie
            res.clearCookie('access_token');
            res.status(200).json({ message: "Déconnexion réussie" });
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            res.status(500).json({ error: "Erreur lors de la déconnexion" });
        }
    }

    async refreshToken(req, res) {
        try {
            const idToken = req.cookies.access_token;

            if (!idToken) {
                return res.status(401).json({ error: "Token manquant" });
            }

            // Vérifier le token actuel
            const decodedToken = await admin.auth().verifyIdToken(idToken);

            // Générer un nouveau token personnalisé
            const newCustomToken = await admin.auth().createCustomToken(decodedToken.uid);

            res.status(200).json({
                message: "Token rafraîchi",
                customToken: newCustomToken
            });

        } catch (error) {
            console.error('Erreur lors du rafraîchissement du token:', error);
            res.status(401).json({ error: "Token invalide" });
        }
    }
}

module.exports = new AuthController();*/


const { auth, db } = require('../../services/firebase');
const Personne = require('../../models/Personne');
const bcrypt = require('bcrypt');
const {createPersonne} = require("../../models/Personne");

class AuthController {
    /*async registerUser(req, res) {
        try {
            const { nom, email, motDePasse, telephone, adresse, role } = req.body;

            if (!email || !motDePasse) {
                return res.status(422).json({ error: "Email et mot de passe requis" });
            }

            // Vérifie si l'utilisateur existe déjà
            try {
                await auth.getUserByEmail(email);
                return res.status(409).json({ error: "Utilisateur déjà existant" });
            } catch (err) {
                // L'utilisateur n'existe pas, on continue
            }

            // Hash le mot de passe avant de l'enregistrer
            const hashedPassword = await bcrypt.hash(motDePasse, 10);

            // Créer l’utilisateur Firebase via Admin SDK
            const userRecord = await auth.createUser({
                email,
                password: motDePasse,
                displayName: nom
            });

            // Enregistrer dans la table Personne
            await Personne.create({
                id: userRecord.uid, // uid Firebase
                nom,
                email,
                telephone,
                adresse,
                mot_de_passe: hashedPassword,
                role: role || "USER"
            });

            res.status(201).json({
                message: "Utilisateur créé dans Firebase + Base de données",
                userId: userRecord.uid
            });

        } catch (error) {
            console.error("Erreur inscription :", error);
            res.status(500).json({ error: error.message });
        }
    }*/

    async registerUser(req, res) {
        try {
            const { nom, email, motDePasse, telephone, adresse, role } = req.body;
            if (!email || !motDePasse) {
                return res.status(422).json({ error: "Email et mot de passe requis" });
            }

            // Vérifier si l'utilisateur existe déjà
            try {
                await auth.getUserByEmail(email);
                return res.status(409).json({ error: "Utilisateur déjà existant" });
            } catch (_) {}

            // Créer l'utilisateur Firebase
            const userRecord = await auth.createUser({
                email,
                password: motDePasse,
                displayName: nom,
            });

            const hashedPassword = await bcrypt.hash(motDePasse, 10);

            await db.collection("personnes").doc(userRecord.uid).set({
                nom,
                email,
                telephone,
                adresse,
                mot_de_passe: hashedPassword,
                role: role || "USER",
                createdAt: new Date(),
            });

            res.status(201).json({
                message: "Utilisateur créé dans Firebase + Firestore",
                userId: userRecord.uid,
            });
        } catch (error) {
            console.error("Erreur inscription:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(422).json({ error: "Email requis" });
            }

            const userRecord = await auth.getUserByEmail(email);
            const customToken = await auth.createCustomToken(userRecord.uid);

            res.status(200).json({
                message: "Connexion réussie",
                user: {
                    uid: userRecord.uid,
                    email: userRecord.email,
                    displayName: userRecord.displayName,
                },
                customToken,
            });
        } catch (error) {
            console.error("Erreur login:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();