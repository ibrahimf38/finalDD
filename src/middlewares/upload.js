const multer = require("multer");
const path = require("path");

// Configuration du stockage temporaire
const storage = multer.memoryStorage();

// Filtrer les fichiers (images uniquement)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Seules les images sont autorisées (jpeg, jpg, png, gif)."));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5 Mo
    fileFilter,
});

module.exports = upload;
