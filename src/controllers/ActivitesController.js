const express = require("express");
// const router = express.Router();
// const { admin, db } = require("../services/firebase.js");

// const collection = db.collection("Activites");

// // Ajouter une activité
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
//       .json({ message: "Activité ajoutée avec succès", id: docRef.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Récupérer toutes les activités
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

// // Modifier une activité
// router.put("/:id", async (req, res) => {
//   try {
//     const docRef = collection.doc(req.params.id);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: "Activité non trouvée." });
//     }

//     await docRef.update({
//       ...req.body,
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.status(200).json({ message: "Activité modifiée avec succès." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Supprimer une activité
// router.delete("/:id", async (req, res) => {
//   try {
//     const docRef = collection.doc(req.params.id);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: "Activité non trouvée." });
//     }

//     await docRef.delete();
//     res.status(200).json({ message: "Activité supprimée avec succès." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const { admin, db } = require("../services/firebase.js");
const collection = db.collection("Activites");

// Ajouter une activité
const createActivite = async (req, res) => {
  try {
    const { Nom, description, date, lieu } = req.body;

    if (!Nom || !date || !lieu) {
      return res.status(400).json({ error: "Nom, date et lieu sont requis." });
    }

    const docRef = await collection.add({
      Nom,
      description: description || "",
      date,
      lieu,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "Activité ajoutée avec succès", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les activités
const getActivites = async (req, res) => {
  try {
    const snapshot = await collection.orderBy("date", "desc").get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une activité par ID
const getActiviteParId = async (req, res) => {
  try {
    const docRef = collection.doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Activité non trouvée." });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier une activité
const updateActivite = async (req, res) => {
  try {
    const docRef = collection.doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Activité non trouvée." });
    }

    await docRef.update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: "Activité modifiée avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une activité
const deleteActivite = async (req, res) => {
  try {
    const docRef = collection.doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Activité non trouvée." });
    }

    await docRef.delete();
    res.status(200).json({ message: "Activité supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createActivite,
  getActivites,
  updateActivite,
  deleteActivite,
  getActiviteParId
};
