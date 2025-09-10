const { auth, db } = require('../../services/firebase');
const Personne = require('../../models/Personne');
const bcrypt = require('bcrypt');
const {createPersonne} = require("../../models/Personne");
const collection = db.collection("personnes");


class AuthController {

    async registerUser(req, res) {
        try {
            const { nom, email, motDePasse, telephone, adresse } = req.body;
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
                password: hashedPassword,
                role: "USER", // Rôle défini en dur pour un utilisateur standard
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

    async registerAdmin(req, res) {
        try {
            const { nom, email, motDePasse, telephone, adresse } = req.body;
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
                password: hashedPassword,
                role: "ADMIN", // Rôle défini en dur pour un administrateur
                createdAt: new Date(),
            });

            res.status(201).json({
                message: "Administrateur créé dans Firebase + Firestore",
                userId: userRecord.uid,
            });
        } catch (error) {
            console.error("Erreur création administrateur:", error);
            res.status(500).json({ error: error.message });
        }
    }
     //Compter le nombre d'Utilisateurs
     countPersonnes = async (req, res) => {
        try {
            const snapshot = await collection.get();
            const count = snapshot.size;
            res.status(200).json({ totalPersonnes: count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    async loginUser(req, res) {
        try {
            // Le mot de passe est nécessaire pour une authentification sécurisée
            const { email, motDePasse } = req.body;
            if (!email || !motDePasse) {
                return res.status(422).json({ error: "Email et mot de passe requis." });
            }

            // 1. Authentifier l'utilisateur via son email
            const userRecord = await auth.getUserByEmail(email);

            // 2. Vérifier si l'utilisateur existe dans Firestore pour récupérer le rôle
            const userDoc = await db.collection("personnes").doc(userRecord.uid).get();

            if (!userDoc.exists) {
                return res.status(404).json({ error: "Profil utilisateur introuvable." });
            }

            const userData = userDoc.data();

            // 3. Inclure le rôle de l'utilisateur dans le token personnalisé
            const customClaims = {
                role: userData.role
            };

            const customToken = await auth.createCustomToken(userRecord.uid, customClaims);

            // 4. Renvoyer le rôle et les autres données de l'utilisateur au client
            res.status(200).json({
                message: "Connexion réussie",
                user: {
                    uid: userRecord.uid,
                    email: userRecord.email,
                },
                role: userData.role, // Le champ "role" est maintenant inclus !
                customToken: customToken
            });

        } catch (error) {
            console.error("Erreur de connexion:", error);
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = new AuthController();