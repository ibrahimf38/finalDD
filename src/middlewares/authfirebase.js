///*
///!*
//const admin = require("../services/firebase");
//const verifyFirebaseToken = async (req, res, next) => {
//  const authHeader = req.headers.authorization;
//  const idToken = authHeader?.startsWith("Bearer ")
//    ? authHeader.split(" ")[1]
//    : null;
//
//  if (!idToken) {
//    return res.status(401).json({ error: "Token manquant" });
//  }
//
//  try {
//    const decodedToken = await admin.auth().verifyIdToken(idToken);
//    req.user = decodedToken;
//    next();
//  } catch (error) {
//    return res
//      .status(403)
//      .json({ error: "Token invalide", details: error.message });
//  }
//};
//
//module.exports = verifyFirebaseToken;
//module.exports = function (req, res, next) {
//  // vérifie le token ici...
//  next();
//};
//*!/
//
//const { admin } = require("../services/firebase");
//const verifyToken = async (req, res, next) => {
//    const idToken = req.cookies.access_token;
//    if (!idToken) {
//        return res.status(403).json({ error: 'No token provided' });
//    }
//
//    try {
//        const decodedToken = await admin.auth().verifyIdToken(idToken);
//        req.user = decodedToken;
//        next();
//    } catch (error) {
//        console.error('Error verifying token:', error);
//        return res.status(403).json({ error: 'Unauthorized' });
//    }
//};
//
//module.exports = verifyToken;
//*/
//
//
//// ==========================================
//// 3. middlewares/authfirebase.js - Middleware d'authentification
//// ==========================================
//const admin = require('firebase-admin');
//
//// 2. Initialisation de l'application Firebase (si ce n'est pas déjà fait ailleurs)
//// Cette vérification empêche l'initialisation multiple en mode hot-reload.
//if (!admin.apps.length) {
//    // IMPORTANT : Vous devez pointer vers votre fichier de configuration de service
//    // Assurez-vous que le chemin est correct.
//    const serviceAccount = require('../../config/serviceAccountKey.json');
//
//    admin.initializeApp({
//        credential: admin.credential.cert(serviceAccount)
//    });
//}
//
///*const authFirebase = async (req, res, next) => {
//    try {
//        let idToken = null;
//
//        //  Récupérer le token depuis l'en-tête Authorization
//        const authHeader = req.headers.authorization;
//        if (authHeader?.startsWith("Bearer ")) {
//            idToken = authHeader.split(" ")[1];
//        }
//
//        //  Si pas trouvé, essayer dans les cookies
//        if (!idToken && req.cookies?.access_token) {
//            idToken = req.cookies.access_token;
//        }
//
//        //  Si toujours pas de token → accès refusé
//        if (!idToken) {
//            return res.status(401).json({ error: "Token d'authentification manquant. Connectez-vous." });
//        }
//
//        //  Vérifier le token avec Firebase Admin
//        const decodedToken = await admin.auth().verifyIdToken(idToken);
//
//        // Attacher les infos utilisateur à la requête
//        req.user = {
//            uid: decodedToken.uid,          // Identifiant unique Firebase
//            email: decodedToken.email,
//            emailVerified: decodedToken.email_verified || false,
//        };
//
//        next(); // passe au contrôleur
//    } catch (error) {
//        console.error("Erreur authFirebase:", error);
//
//        let errorMessage = "Token invalide ou non autorisé.";
//        if (error.code === "auth/id-token-expired") {
//            errorMessage = "Token expiré. Veuillez vous reconnecter.";
//        } else if (error.code === "auth/argument-error") {
//            errorMessage = "Format du token invalide.";
//        }
//
//        return res.status(403).json({
//            error: errorMessage,
//            code: error.code || "auth/unknown-error",
//        });
//    }
//
//};*/
//
//// ... (Initialisation de Firebase Admin)
//
//const authFirebase = async (req, res, next) => {
//    try {
//        let idToken = null;
//
//        //  Récupérer le token depuis l'en-tête Authorization
//        const authHeader = req.headers.authorization;
//        if (authHeader?.startsWith("Bearer ")) {
//            // 🔑 CORRECTION : Utiliser .trim() pour garantir qu'il n'y a pas d'espaces inutiles
//            idToken = authHeader.split(" ")[1]?.trim();
//        }
//
//        //  Si pas trouvé, essayer dans les cookies
//        // 🔑 CORRECTION : Utiliser .trim() ici aussi pour sécuriser la valeur du cookie
//        if (!idToken && req.cookies?.access_token) {
//            idToken = req.cookies.access_token.trim();
//        }
//
//        // ... (Le reste de la fonction est correct)
//
//        //  Si toujours pas de token → accès refusé
//        if (!idToken) {
//            return res.status(401).json({ error: "Token d'authentification manquant. Connectez-vous." });
//        }
//
//        //  Vérifier le token avec Firebase Admin
//        const decodedToken = await admin.auth().verifyIdToken(idToken); // Utilise la variable idToken nettoyée
//
//        // ... (Le reste du code)
//    } catch (error) {
//        // ... (Gestion des erreurs)
//    }
//};
//
//module.exports = authFirebase;
//
//module.exports = authFirebase;


// middlewares/authFirebase.js
const admin = require('firebase-admin');

// Initialisation de Firebase Admin (si pas déjà fait)
if (!admin.apps.length) {
    const serviceAccount = require('../../config/serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const authFirebase = async (req, res, next) => {
    try {
        let idToken = null;

        // Récupérer le token depuis l'en-tête Authorization
        const authHeader = req.headers.authorization;
        console.log('🔐 Header Authorization reçu:', authHeader);

        if (authHeader && authHeader.startsWith("Bearer ")) {
            idToken = authHeader.split(" ")[1]?.trim();
        }

        // Si pas trouvé, essayer dans les cookies
        if (!idToken && req.cookies?.access_token) {
            idToken = req.cookies.access_token.trim();
        }

        // Si toujours pas de token → accès refusé
        if (!idToken) {
            console.log('❌ Aucun token trouvé');
            return res.status(401).json({
                error: "Token d'authentification manquant. Connectez-vous."
            });
        }

        console.log('🔑 Token reçu:', idToken.substring(0, 20) + '...');

        // Vérifier le token avec Firebase Admin
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        console.log('✅ Token vérifié pour UID:', decodedToken.uid);

        // Attacher les infos utilisateur à la requête
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            email_verified: decodedToken.email_verified || false,
            name: decodedToken.name || null,
        };

        next(); // passe au contrôleur

    } catch (error) {
        console.error("❌ Erreur authFirebase:", error);

        let errorMessage = "Token invalide ou non autorisé.";
        let statusCode = 403;

        if (error.code === "auth/id-token-expired") {
            errorMessage = "Token expiré. Veuillez vous reconnecter.";
            statusCode = 401;
        } else if (error.code === "auth/argument-error") {
            errorMessage = "Format du token invalide.";
        }

        return res.status(statusCode).json({
            error: errorMessage,
            code: error.code || "auth/unknown-error",
        });
    }
};

module.exports = authFirebase;