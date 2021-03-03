// Importation de mongoose
const mongoose = require('mongoose');
// Utilisation du plugin de mongoose pour faciliter la validation unique de l'utilisateur par son adresse email
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma utilisateur de notre api en utilisant la fonction Schema de mongoose
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Application du validateur au schéma utilisateur
// On appelle la méthode plugin au schéma, auquel on passe uniqueValidator comme argument
userSchema.plugin(uniqueValidator);

// Exportation du schéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);