const { db } = require("../services/firebase");
const collection = db.collection("Menu");

const MenuController = {
    // Créer un menu
    async createMenu(req, res) {
        try {
            const { id_restaurant, nom_du_plat, prix, Description } = req.body;

            if (!id_restaurant || !nom_du_plat || !prix) {
                return res.status(400).json({ message: "Champs requis manquants." });
            }

            const newMenu = {
                id_restaurant,
                nom_du_plat,
                prix,
                Description: Description || "",
            };

            const docRef = await collection.add(newMenu);
            res.status(201).json({ id: docRef.id, ...newMenu });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du menu", error: error.message });
        }
    },

    // Lire tous les menus
    async getMenus(req, res) {
        try {
            const snapshot = await collection.get();
            const menus = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(menus);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des menus", error: error.message });
        }
    },

    // Lire un menu par ID
    async getMenuById(req, res) {
        try {
            const { id } = req.params;
            const doc = await collection.doc(id).get();

            if (!doc.exists) {
                return res.status(404).json({ message: "Menu introuvable" });
            }

            res.status(200).json({ id: doc.id, ...doc.data() });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du menu", error: error.message });
        }
    },

    // Mettre à jour un menu
    async updateMenu(req, res) {
        try {
            const { id } = req.params;
            const { id_restaurant, nom_du_plat, prix, Description } = req.body;

            const docRef = collection.doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).json({ message: "Menu introuvable" });
            }

            await docRef.update({
                id_restaurant,
                nom_du_plat,
                prix,
                Description
            });

            res.status(200).json({ message: "Menu mis à jour avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du menu", error: error.message });
        }
    },

    // Supprimer un menu
    async deleteMenu(req, res) {
        try {
            const { id } = req.params;
            const docRef = collection.doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).json({ message: "Menu introuvable" });
            }

            await docRef.delete();
            res.status(200).json({ message: "Menu supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du menu", error: error.message });
        }
    }
};

module.exports = MenuController;
