// Importation du modèle de mot de passe imposé
const passSchema = require("../models/password");

// Création de la logique du modèle pour valider le mot de passe
module.exports = (req, res, next) => {
    if (!passSchema.validate(req.body.password)) {
        res.writeHead(400,'{"Mot de passe pas assez fort, au moins une majuscule et une minuscule, 1 chiffre, sans espace, 8 caractères mini, 50 max !"}', {
        'content-type': 'application/json'
      });
        res.end('Modèle de mot de passe incorrect');
    } else {
        next();
    }
};