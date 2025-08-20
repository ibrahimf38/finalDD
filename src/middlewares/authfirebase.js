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
