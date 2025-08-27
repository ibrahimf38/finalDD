/*
/!*
const admin = require("../services/firebase");
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const idToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!idToken) {
    return res.status(401).json({ error: "Token manquant" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Token invalide", details: error.message });
  }
};

module.exports = verifyFirebaseToken;
module.exports = function (req, res, next) {
  // vérifie le token ici...
  next();
};
*!/

const { admin } = require("../services/firebase");
const verifyToken = async (req, res, next) => {
    const idToken = req.cookies.access_token;
    if (!idToken) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ error: 'Unauthorized' });
    }
};

module.exports = verifyToken;
*/


// ==========================================
// 3. middlewares/authfirebase.js - Middleware d'authentification
// ==========================================
const { admin } = require("../services/firebase");

const verifyFirebaseToken = async (req, res, next) => {
    try {
        // Essayer d'obtenir le token depuis l'en-tête Authorization
        const authHeader = req.headers.authorization;
        let idToken = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        // Si pas de token dans l'en-tête, essayer les cookies
        if (!idToken) {
            idToken = req.cookies.access_token;
        }

        if (!idToken) {
            return res.status(401).json({ error: "Token d'authentification manquant" });
        }

        // Vérifier le token
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        // Ajouter les informations utilisateur à la requête
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            emailVerified: decodedToken.email_verified
        };

        next();
    } catch (error) {
        console.error('Erreur de vérification du token:', error);

        let errorMessage = "Token invalide";
        if (error.code === 'auth/id-token-expired') {
            errorMessage = "Token expiré";
        } else if (error.code === 'auth/argument-error') {
            errorMessage = "Format de token invalide";
        }

        return res.status(403).json({
            error: errorMessage,
            code: error.code
        });
    }
};

module.exports = verifyFirebaseToken;