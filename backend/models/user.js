// Importation de mongoose
const mongoose = require('mongoose');
require('mongoose-type-email');
// Utilisation du plugin de mongoose pour faciliter la validation unique de l'utilisateur par son adresse email
const uniqueValidator = require('mongoose-unique-validator');
// Utilisation du plugin de mongoose qui permet d'assainir les champs de saisie user
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

// Création du schéma utilisateur de notre api en utilisant la fonction Schema de mongoose
const userSchema = mongoose.Schema({
  email: { 
    type: String, 
    unique: true, 
    required: [true, "Veuillez entrer votre adresse email"] 
  },
  password: { type: String, required: [true, "Veuillez entrer un mot de passe valide"] }
});

// Application du validateur au schéma utilisateur
// On appelle la méthode plugin au schéma, auquel on passe uniqueValidator comme argument
userSchema.plugin(uniqueValidator);

userSchema.plugin(sanitizerPlugin);

// Exportation du schéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);

// De façon à s'assurer que deux utilisateurs ne partagerons pas la même adresse email pour s'authentifier, on passera unique: true en paramètre à email dans le schéma utilisateur de mongoose.
// Il est parfois difficile de gérer efficacement l'authentification, il faudra également utiliser le package de validation de mongoose:
// npm install --save mongoose-unique-validator 