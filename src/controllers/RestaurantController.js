const express = require("express");
// const router = express.Router();
// const {admin, db} = require("../services/firebase.js");

// const collection = db.collection("Restaurants");

// // Ajouter un Restaurant
// router.post("/", async (req, res) => {
//   try {
//     const { nom, adresse, ville, description } = req.body;

//     if (!nom || !adresse || !ville) {
//       return res
//         .status(400)
//         .json({ error: "Nom, adresse et ville sont requis." });
//     }

//     const docRef = await collection.add({
//       nom,
//       adresse,
//       ville,
//       description: description || "",
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res
//       .status(201)
//       .json({ message: "Restaurant ajouté avec succès", id: docRef.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Récupérer les Restaurants
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

// // Modifier un restaurant
// router.put("/:id", async (req, res) => {
//   try {
//     const docRef = collection.doc(req.params.id);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: "restaurant non trouvé." });
//     }

//     await docRef.update({
//       ...req.body,
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.status(200).json({ message: "restaurant modifié avec succès." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Supprimer un restaurant
// router.delete("/:id", async (req, res) => {
//   try {
//     const docRef = collection.doc(req.params.id);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: "restaurant non trouvé." });
//     }

//     await docRef.delete();
//     res.status(200).json({ message: "restaurant supprimé avec succès." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const { admin, db } = require("../services/firebase.js");
const collection = db.collection("Restaurant");

// Ajouter un restaurant
const createRestaurant = async (req, res) => {
    try {
        const {
            nom,
            localisation,
            description,
            ownerFirstName,
            ownerLastName,
            phone,
            plat,
            price,
            quantity,
            payment,
            image
        } = req.body;

        if (!nom || !localisation) {
            return res.status(400).json({ error: "Nom et localisation sont requis." });
        }

        const docRef = await collection.add({
            nom,
            localisation,
            ownerFirstName,
            ownerLastName,
            phone,
            plat,
            price,
            quantity,
            payment,
            image: image || "",
            description: description || "",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({ message: "Restaurant ajouté avec succès", id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les restaurants
const getRestaurants = async (req, res) => {
    try {
        const snapshot = await collection.orderBy("nom").get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un restaurant par id
const getRestaurantById = async (req, res) => {
    try {
        const docRef = collection.doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Restaurant non trouvé." });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un restaurant
const updateRestaurant = async (req, res) => {
    try {
        const docRef = collection.doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Restaurant non trouvé." });
        }

        await docRef.update({
            ...req.body,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(200).json({ message: "Restaurant modifié avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un restaurant
const deleteRestaurant = async (req, res) => {
    try {
        const docRef = collection.doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Restaurant non trouvé." });
        }

        await docRef.delete();
        res.status(200).json({ message: "Restaurant supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Compter le nombre de restaurants
const countRestaurants = async (req, res) => {
    try {
        const snapshot = await collection.get();
        const count = snapshot.size;
        res.status(200).json({ totalRestaurants: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    countRestaurants
};
