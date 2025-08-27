/*
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();
module.exports = db;
*/

/*const admin = require("../firebase/firebaseConfig"); // import unique
const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };*/

const { Sequelize } = require('sequelize');
require('dotenv').config();

/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // ou postgres, sqlite…
});*/

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: false, // ou true pour voir les requêtes SQL
    }
);

module.exports = sequelize;
