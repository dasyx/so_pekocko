// Ici on enregistre la logique métier dans le controller.
// On déplace donc toute la logique de routes vers le controller.

// Récupération du modèle de sauce
const Sauce = require('../models/sauce');
// Importation du package fs (filesystem) de node
// Pour avoir accès au système de fichiers
const fs = require('fs');

// Exportation d'une fonction pour la création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};
// Exportation d'une fonction pour l'affichage d'une sauce spécifique
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};
// Exportation d'une fonction pour l'affichage d'une sauce spécifique
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error }));
};
// Exportation d'une fonction pour la modification d'une sauce
exports.modifySauce = (req, res, next) => {
  let sauceObject = {}; 
  req.file ? (
// Utilisation de l'opérateur ternaire si une image est trouvée lors de la modif 
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
// Suppression de l'ancienne image du serveur
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlinkSync(`images/${filename}`)
    }),
    sauceObject = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }
) : (
// L'opérateur ternaire va vérifier la condition :
// Si la modif n'ajoute pas de nouvelle image à la sauce
  sauceObject = {...req.body})
// On applique les paramètres de sauceObject
// Modification des données et ajout d'une nouvelle image
  Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
  .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
  .catch((error) => res.status(400).json({error}))
}

// Exportation d'une fonction pour la suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //Recherche du fichier image dans la base de données
    .then(sauce => {
      // Récupération de l'url de la sauce et split le nom du fichier
      const filename = sauce.imageUrl.split('/images/')[1]; 
      // Recours à unlink pour supprimer le fichier
      fs.unlink(`images/${filename}`, () => {
        // Suppression du fichier de la base de données
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
// Exportations d'une fonction pour gérer les likes/dislikes d'une sauce
exports.likeDislikeSauce = (req, res, next) => {
  const sauceObject = req.body;
  console.log(sauceObject);
// Si le corps de la requête renvoit un like
  if (sauceObject.like === 1) {
    Sauce.updateOne(
      { _id: req.params.id },
      { // On incrémente un like de 1
        $inc: { likes: +1 },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then(() => res.status(200).json({ message: "Like ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
// Si le corps de la requête renvoit un dislike
  } else if (sauceObject.like === -1) {
    Sauce.updateOne(
      { _id: req.params.id },
      { // On incrémente un dislike de 1
        $inc: { dislikes: +1 },
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        console.log(sauce);
        // Dans le cas d'annulation d'un like
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersLiked: req.body.userId },
              $inc: { likes: -1 },
            }
          )
            .then(() => res.status(200).json({ message: "Like supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        // Dans le cas d'annulation d'un dislike
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then(() =>
              res.status(200).json({ message: "Dislike supprimé !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};