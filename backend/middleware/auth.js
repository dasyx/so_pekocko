const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // On va utiliser le fait qu'on connait la forme du header
    // Pour récupérer le token :
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    // On n'authentifiera pas la requête si l'userId dans le corps de la requête
    // Est différent de l'userId du token décodé
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};