
const { admin, db } = require("../services/firebase.js");
const collection = db.collection("Activites");

// Ajouter une activité
const createActivite = async (req, res) => {
    try {
        const {
            nom,
            latitude,
            longitude,
            location,
            phone,
            email,
            description,
            prix,
            payment,
            category,
            image,
        } = req.body;

        if (!nom || !location) {
            return res.status(400).json({ error: "Nom et lieu sont requis." });
        }

        let imageUrl = "";

        if (req.file) {
            const bucket = admin.storage().bucket();
            const filename = `activites/${Date.now()}_${req.file.originalname}`;
            const file = bucket.file(filename);

            await file.save(req.file.buffer, {
                metadata: { contentType: req.file.mimetype },
            });

            // Rendre le fichier public
            await file.makePublic();
            imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        }

        const docRef = await collection.add({
            nom,
            latitude,
            longitude,
            location,
            phone: phone || "",
            email: email || "",
            description: description || "",
            prix: prix || 0,
            payment: payment || "non spécifié",
            category: category || "autre",
            image: imageUrl,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({
            message: "Activité ajoutée avec succès",
            id_activite: docRef.id,
            image: imageUrl,
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
