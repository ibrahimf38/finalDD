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
const authFirebase = async (req, res, next) => {
    try {
        let idToken = null;

        //  Récupérer le token depuis l'en-tête Authorization
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith("Bearer ")) {
            idToken = authHeader.split(" ")[1];
        }

        //  Si pas trouvé, essayer dans les cookies
        if (!idToken && req.cookies?.access_token) {
            idToken = req.cookies.access_token;
        }

        //  Si toujours pas de token → accès refusé
        if (!idToken) {
            return res.status(401).json({ error: "Token d'authentification manquant. Connectez-vous." });
        }

        //  Vérifier le token avec Firebase Admin
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        // Attacher les infos utilisateur à la requête
        req.user = {
            uid: decodedToken.uid,          // Identifiant unique Firebase
            email: decodedToken.email,
            emailVerified: decodedToken.email_verified || false,
        };

        next(); // passe au contrôleur
    } catch (error) {
        console.error("Erreur authFirebase:", error);

        let errorMessage = "Token invalide ou non autorisé.";
        if (error.code === "auth/id-token-expired") {
            errorMessage = "Token expiré. Veuillez vous reconnecter.";
        } else if (error.code === "auth/argument-error") {
            errorMessage = "Format du token invalide.";
        }

        return res.status(403).json({
            error: errorMessage,
            code: error.code || "auth/unknown-error",
        });
    }
};

module.exports = authFirebase;