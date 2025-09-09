const express = require("express");
// const router = express.Router();
// const { admin, db } = require("../services/firebase.js");

// const collection = db.collection("Evenements");

// // Ajouter un Evenement
// router.post("/", async (req, res) => {
//   try {
//     const { Nom, description, date, lieu } = req.body;

//     if (!Nom || !date || !lieu) {
//       return res.status(400).json({ error: "Nom, date et lieu sont requis." });
//     }

//     const docRef = await collection.add({
//       Nom,
//       description: description || "",
//       date,
//       lieu,
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res
//       .status(201)
//       .json({ message: "Evenement ajoutée avec succès", id: docRef.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Récupérer toutes les Evenements
// router.get("/", async (req, res) => {
//   try {
//     const snapshot = await collection.orderBy("date", "desc").get();
//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Modifier un Evenement
// router.put("/:id", async (req, res) => {
//   try {
//     const docRef = collection.doc(req.params.id);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: "Evenement non trouvée." });
//     }

//     await docRef.update({
//       ...req.body,
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.status(200).json({ message: "Evenement modifiée avec succès." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Supprimer un evenement
// router.delete("/:id", async (req, res) => {
//   try {
//     const docRef = collection.doc(req.params.id);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: "Evenement non trouvée." });
//     }

//     await docRef.delete();
//     res.status(200).json({ message: "Evenement supprimée avec succès." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const { admin, db } = require("../services/firebase.js");
const collection = db.collection("Evenement");

// Ajouter un Evenement
const createEvenement = async (req, res) => {
    try {
        const { nom, type_evenement, lieu, adresse, contact, description, date_debut, date_fin, prix } = req.body;

        if (!nom || !type_evenement || !lieu || !date_debut || !date_fin) {
            return res.status(400).json({ error: "Nom, type_evenement, lieu, date_debut et date_fin sont requis." });
        }

        const docRef = await collection.add({
            nom,
            type_evenement,
            lieu,
            adresse: adresse || "",
            contact: contact || "",
            description: description || "",
            date_debut,
            date_fin,
            prix: prix || 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({ message: "Evenement ajouté avec succès", id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les Evenements
const getEvenements = async (req, res) => {
    try {
        const snapshot = await collection.orderBy("date_debut", "desc").get();
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un Evenement
const updateEvenement = async (req, res) => {
    try {
        const docRef = collection.doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Evenement non trouvé." });
        }

        await docRef.update({
            ...req.body,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(200).json({ message: "Evenement modifié avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un Evenement
const deleteEvenement = async (req, res) => {
    try {
        const docRef = collection.doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Evenement non trouvé." });
        }

        await docRef.delete();
        res.status(200).json({ message: "Evenement supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Compter le nombre d'évènements
const countEvenements = async (req, res) => {
    try {
        const snapshot = await collection.get();
        const count = snapshot.size;
        res.status(200).json({ totalEvenements: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvenement,
    getEvenements,
    updateEvenement,
    deleteEvenement,
};

