const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Import des routes
const profilRoutes = require("./src/routes/profil.routes");
const authRoutes = require("./src/routes/auth.routes");
const restaurantRoutes = require("./src/routes/restaurant.routes");
const evenementRoutes = require("./src/routes/evenement.routes");
const activitesRoutes = require("./src/routes/activites.routes");
const reservationsRoutes = require("./src/routes/reservation.routes");
const hotelRoutes = require("./src/routes/hotel.routes");
const commandesRoutes = require("./src/routes/Commande.routes");
const gestionnairesRoutes = require("./src/routes/Gestionnaire.routes");
const menuRoutes = require("./src/routes/menu.routes");
const swaggerDocs = require("./config/swagger");
const path = require("path");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Montage des routes
app.use("/api/profil", profilRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/evenements", evenementRoutes);
app.use("/api/activites", activitesRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/commandes", commandesRoutes);
app.use("/api/gestionnaires", gestionnairesRoutes);
app.use("/api/menu", menuRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes de test simples
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API !");
});


// Démarrage du serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serveur démarré à l'adresse : http://localhost:${PORT}`);
});

// Swagger docs
swaggerDocs(app, PORT);