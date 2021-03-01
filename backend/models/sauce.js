const mongoose = require('mongoose');

// Création d'un schéma de données strictes pour cadrer avec le modèle de sauces. Certains champs seront obligatoires.
const sauceSchema = mongoose.Schema({
  // Identifiant du créateur de la sauce  
  userId: { type: String, required: true },
  // Nom de la sauce
  name: { type: String, required: true },
  // Nom du créateur de la sauce
  manufacturer: { type: String, required: true },
  // Description de la sauce
  description: { type: String, required: true },
  // Ingrédient principal
  mainPepper: { type: String, required: true },
  // Adresse de la photo de présentation
  imageUrl: { type: String, required: true },
  // Indice de puissance de la sauce
  heat: { type: Number, required: true },
  // Nombre de mentions j'aime de la sauce
  likes: { type: Number, },
  // Nombre de mentions je n'aime pas
  dislikes: { type: Number, },
  // Tableau d'utilisateurs ayant aimé la sauce
  usersLiked: { type: [String] },
  // Tableau d'utilisateurs n'ayant pas aimé la sauce
  usersDisliked:{ type: [String] }
});

module.exports = mongoose.model('Sauce', sauceSchema);