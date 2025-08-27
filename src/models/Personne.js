/*
class Personne {
  constructor(id, nom, email, telephone, adresse, mot_de_passe, role) {
    this.id = id;
    this.nom = nom;
    this.email = email;
    this.telephone = telephone;
    this.adresse = adresse;
    this.mot_de_passe = mot_de_passe;
    this.role = role;
  }
}
*/

// models/Personne.js
/*// src/models/Personne.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // ← ton instance Sequelize

const Personne = sequelize.define('Personne', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telephone: {
        type: DataTypes.STRING,
    },
    adresse: {
        type: DataTypes.STRING,
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER',
    },
}, {
    tableName: 'personnes',
    timestamps: true,
});

module.exports = Personne;*/


const { db } = require("../../firebase/firebaseConfig");

const createPersonne = async ({ id, nom, email, telephone, adresse, motDePasse, role }) => {
    const userRef = db.collection("personnes").doc(id);
    await userRef.set({
        nom,
        email,
        telephone,
        adresse,
        mot_de_passe: motDePasse, // ⚠️ hash si sensible
        role: role || "USER",
        createdAt: new Date().toISOString(),
    });
    return { id, nom, email };
};

module.exports = { createPersonne };
