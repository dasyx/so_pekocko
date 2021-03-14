const passwordValidator = require('password-validator');

const passSchema = new passwordValidator();

// Création du modèle de mot de passe

passSchema
  .is().min(8)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']); // On exclut les valeurs à éviter

// Exportation du schema de mot de passe
module.exports = passSchema;