const {
    auth,
    admin,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
} = require('../../services/firebase');

class AuthController {

    async registerUser(req, res) {
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
    }

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

module.exports = new AuthController();