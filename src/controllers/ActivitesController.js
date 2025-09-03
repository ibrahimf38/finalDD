
const { admin, db } = require("../services/firebase.js");
const collection = db.collection("Activites");

// Ajouter une activité
const createActivite = async (req, res) => {
    try {
        const {
            nom,
            type_activite,
            lieu,
            contact,
            email,
            description,
            prix,
            payment,
            category,
            image,
        } = req.body;

        if (!nom || !lieu) {
            return res.status(400).json({ error: "Nom et lieu sont requis." });
        }

        const docRef = await collection.add({
            nom,
            type_activite: type_activite || "",
            lieu,
            contact: contact || "",
            email: email || "",
            description: description || "",
            prix: prix || 0,
            payment: payment || "non spécifié",
            category: category || "autre",
            image: image || "",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({
            message: "Activité ajoutée avec succès",
            id_activite: docRef.id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer toutes les activités
const getActivites = async (req, res) => {
    try {
        const snapshot = await collection.orderBy("createdAt", "desc").get();
        const data = snapshot.docs.map((doc) => ({
            id_activite: doc.id,
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

        res.status(200).json({ id_activite: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//  Modifier une activité
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

//  Supprimer une activité
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
    getActiviteParId,
};
