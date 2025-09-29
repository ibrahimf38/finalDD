const { db, auth } = require("../services/firebase.js"); // Assurez-vous que 'db' et 'auth' sont correctement exportés de firebase.js

const ProfilController = {

  // =====================================================================
  // 1. Gérer l'inscription (Register)
  // =====================================================================
  async register(req, res) {
    const { nom, prenom, email, password, phoneNumber } = req.body;

    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ error: "Les champs nom, prénom, email et password sont obligatoires." });
    }

    try {
      // 1. Créer l'utilisateur dans Firebase Auth
      const userRecord = await auth.createUser({
        email: email,
        password: password,
        displayName: `${prenom} ${nom}`,
      });

      // 2. Créer un document utilisateur dans Firestore
      await db.collection('users').doc(userRecord.uid).set({
        nom: nom,
        prenom: prenom,
        email: email,
        phoneNumber: phoneNumber || null,
        createdAt: new Date(),
      });

      // L'inscription est réussie.
      res.status(201).json({
        message: "Utilisateur créé avec succès. Veuillez vous connecter.",
        userId: userRecord.uid
      });

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return res.status(409).json({ error: "Cet email est déjà utilisé." });
      }
      res.status(500).json({
        error: "Erreur lors de l'inscription",
        details: error.message,
      });
    }
  },

  // =====================================================================
  // 2. Gérer la connexion (Login)
  // =====================================================================
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe sont obligatoires." });
    }

    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();

        if (snapshot.empty) {
            // Renvoie une erreur générique
            return res.status(401).json({ error: "Mot de passe ou email incorrect." });
        }

        const userData = snapshot.docs[0].data();
        const userId = snapshot.docs[0].id;

        // Note: Dans un environnement Firebase/Express, le client gère la connexion réelle.
        // On renvoie ici les données pour le client.
        const temporaryToken = "temporary-auth-token-for-client"; // Ceci est un jeton simulé

        res.status(200).json({
            message: "Connexion réussie.",
            token: temporaryToken,
            userId: userId,
            nom: userData.nom,
            prenom: userData.prenom,
        });

    } catch (error) {
        // Gère les erreurs de Firestore ou Auth
        res.status(401).json({
            error: "Mot de passe ou email incorrect.",
            details: error.message,
        });
    }
  },


  // =====================================================================
  // 3. Récupérer le profil (GET)
  // =====================================================================
  async getProfile(req, res) {
    // L'ID utilisateur (uid) est extrait du token par le middleware `verifyFirebaseToken`
    const uid = req.user.uid;

    try {
      // 1. Récupérer l'enregistrement Firebase Auth
      const userRecord = await auth.getUser(uid);
      // 2. Récupérer le document Firestore
      const userDoc = await db.collection('users').doc(uid).get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: "Profil Firestore non trouvé." });
      }

      res.status(200).json({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName || null,
        photoURL: userRecord.photoURL || null,
        ...userDoc.data(), // Ajouter les données de Firestore (nom, prenom, phoneNumber, etc.)
      });
    } catch (error) {
      res.status(500).json({
        error: "Erreur lors de la récupération du profil",
        details: error.message,
      });
    }
  },


  // =====================================================================
  // 4. Mettre à jour le profil (PUT)
  // =====================================================================
  async updateProfile(req, res) {
    const { nom, prenom, email, phoneNumber } = req.body;
    // L'ID utilisateur (uid) est extrait du token par le middleware
    const uid = req.user.uid;

    if (!nom && !prenom && !email && !phoneNumber) {
      return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
    }

    try {
      // 1. Mettre à jour Firebase Auth (pour le nom affiché)
      await auth.updateUser(uid, {
        displayName: (prenom || nom) ? `${prenom || req.user.prenom} ${nom || req.user.nom}` : undefined,
      });

      // 2. Mettre à jour le document Firestore
      const updateData = {};
      if (nom) updateData.nom = nom;
      if (prenom) updateData.prenom = prenom;
      if (phoneNumber) updateData.phoneNumber = phoneNumber;
      if (email) updateData.email = email; // Mettre à jour l'email dans Firestore

      await db.collection('users').doc(uid).update(updateData);


      res.status(200).json({
        message: "Profil mis à jour avec succès",
        user: { nom, prenom, email, phoneNumber, uid },
      });

    } catch (error) {
      res.status(500).json({
        error: "Erreur lors de la mise à jour du profil",
        details: error.message,
      });
    }
  },

  // =====================================================================
  // 5. Supprimer le profil (DELETE)
  // =====================================================================
  async deleteProfile(req, res) {
    const userId = req.params.userId;
    // L'ID utilisateur (uid) est extrait du token par le middleware
    const uidFromToken = req.user.uid;

    // Vérification de l'autorisation (l'utilisateur ne peut supprimer que son propre profil)
    if (userId !== uidFromToken) {
      return res.status(403).json({
        error: "Non autorisé",
        message: "Vous ne pouvez pas supprimer le profil d'un autre utilisateur."
      });
    }

    try {
      // 1. Supprimer le document utilisateur de Firestore
      await db.collection('users').doc(userId).delete();

      // 2. Supprimer l'utilisateur de Firebase Authentication
      await auth.deleteUser(userId);

      res.status(200).json({
        message: "Profil utilisateur supprimé avec succès."
      });

    } catch (error) {
      console.error("Erreur lors de la suppression du profil :", error);
      res.status(500).json({
        error: "Échec de la suppression du profil",
        details: error.message
      });
    }
  },
};

module.exports = ProfilController;