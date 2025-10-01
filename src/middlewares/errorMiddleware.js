//module.exports = (err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).json({ error: "Quelque chose s'est mal passé!" });
//};
// middlewares/debugAuth.js
const debugAuth = (req, res, next) => {
    console.log('🔐 === DEBUG AUTH MIDDLEWARE ===');
    console.log('📨 Méthode:', req.method);
    console.log('📍 URL:', req.originalUrl);
    console.log('🔑 Headers Authorization:', req.headers.authorization);
    console.log('🍪 Cookies:', req.cookies);
    console.log('🔐 === FIN DEBUG ===');
    next();
};

module.exports = debugAuth;