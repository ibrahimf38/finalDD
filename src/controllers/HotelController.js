const express = require("express");
// const router = express.Router();
// const { admin, db } = require("../services/firebase.js");

// const collection = db.collection("hotels");

// // Ajouter un hôtel
// router.post("/", async (req, res) => {
//   try {
//     const { nom, adresse, ville, etoiles, description } = req.body;

//     if (!nom || !adresse || !ville) {
//       return res
//         .status(400)
//         .json({ error: "Nom, adresse et ville sont requis." });
//     }

//     const docRef = await collection.add({
//       nom,
//       adresse,
//       ville,
//       etoiles: etoiles || null,
//       description: description || "",
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res
//       .status(201)
//       .json({ message: "Hôtel ajouté avec succès", id: docRef.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Récupérer les hôtels
// router.get("/", async (req, res) => {
//   try {
//     const snapshot = await collection.orderBy("nom").get();
//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Modifier un hôtel
// router.put("/:id", async (req, res) => {
//   try {
//     const docRef = collection.doc(req.params.id);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: "Hôtel non trouvé." });
//     }

//     await docRef.update({
//       ...req.body,
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.status(200).json({ message: "Hôtel modifié avec succès." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Supprimer un hôtel
// router.delete("/:id", async (req, res) => {
//   try {
//     const docRef = collection.doc(req.params.id);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: "Hôtel non trouvé." });
//     }

//     await docRef.delete();
//     res.status(200).json({ message: "Hôtel supprimé avec succès." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const { admin, db } = require("../services/firebase.js");
const collection = db.collection("Hotel");

// Ajouter un hôtel
const createHotel = async (req, res) => {
  try {
    const {name,location,ownerFirstName,ownerLastName,phone,email,description,room,payment,image,rating} = req.body;

    if (!name || !location) {
      return res
        .status(400)
        .json({ error: "Nom, adresse sont requis." });
    }

    const docRef = await collection.add({
      name,
      location,
      ownerFirstName,
      ownerLastName,
      phone,
      email,
        payment,
        image: image || "",
        rating: rating || null,
        room: room || null,
      description: description || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res
      .status(201)
      .json({ message: "Hôtel ajouté avec succès", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les hôtels
const getHotels = async (req, res) => {
  try {
    const snapshot = await collection.orderBy("name").get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un hôtel par ID
const getHotelParId = async (req, res) => {
  try {
    const docRef = collection.doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Hôtel non trouvé." });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un hôtel
const updateHotel = async (req, res) => {
  try {
    const docRef = collection.doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Hôtel non trouvé." });
    }

    await docRef.update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: "Hôtel modifié avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un hôtel
const deleteHotel = async (req, res) => {
  try {
    const docRef = collection.doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Hôtel non trouvé." });
    }

    await docRef.delete();
    res.status(200).json({ message: "Hôtel supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHotel,
  getHotels,
  getHotelParId,
  updateHotel,
  deleteHotel,
};
