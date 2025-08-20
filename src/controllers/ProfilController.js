const { db, auth } = require("../services/firebase.js");

const ProfilController = {
  
  // Récupérer le profil de l'utilisateur
  async getProfile(req, res) {
    try {
      const userRecord = await auth.getUser(req.user.uid);

      res.status(200).json({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName || null,
        photoURL: userRecord.photoURL || null,
      });
    } catch (error) {
      res.status(500).json({
        error: "Erreur lors de la récupération du profil",
        details: error.message,
      });
    }
  },

  // Mettre à jour le profil de l'utilisateur
  async updateProfile(req, res) {
    const { displayName, photoURL } = req.body;

    if (!displayName && !photoURL) {
      return res.status(400).json({
        error: "Aucune donnée à mettre à jour.",
      });
    }

    try {
      const updatedUser = await auth.updateUser(req.user.uid, {
        ...(displayName && { displayName }),
        ...(photoURL && { photoURL }),
      });

      res.status(200).json({
        message: "Profil mis à jour avec succès",
        user: {
          uid: updatedUser.uid,
          email: updatedUser.email,
          displayName: updatedUser.displayName,
          photoURL: updatedUser.photoURL,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: "Erreur lors de la mise à jour du profil",
        details: error.message,
      });
    }
  },
};

module.exports = ProfilController;
