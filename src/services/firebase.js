const admin = require("firebase-admin");
const serviceAccount = require("../../config/serviceAccountKey.json");

// ✅ Debug: Vérifiez le contenu du serviceAccount
console.log("Project ID from serviceAccount:", serviceAccount.project_id);

// ✅ Fermez toutes les apps existantes
admin.apps.forEach(app => {
    console.log("Deleting existing app:", app.name);
    app.delete();
});

try {

    const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "discover-a5ac1.firebasestorage.app",
    });

    const bucket1 = admin.storage().bucket("discover-a5ac1.firebasestorage.app");

    const bucket2 = admin.storage().bucket();

} catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Error code:", error.code);
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = {
    admin,
    db,
    auth,
    storage,
    getBucket: () => admin.storage().bucket("discover-a5ac1.firebasestorage.app"),
};