// On va faire appel au plugin express pour la création du routeur
const express = require('express');
// Création du routeur à l'aide de la méthode routeur d'express
const router = express.Router();
// On a besoin ici d'importer le controller pour les sauces
const sauceCtrl = require('../controllers/sauces');
// Importation du middleware d'authentification
const auth = require('../middleware/auth');
// Importation du middleware qui permettra de gérer les fichiers entrant
const multer = require('../middleware/multer-config');

/* Voici la logique de routes de l'api :
=======================================*/

// La route suivante permettra de créer une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

// La route suivante permettra de modifier une sauce et de la mettre à jour
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// La route suivante permettra de supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// La route suivante permettra d'afficher une sauce spécifique
router.get('/:id', auth, sauceCtrl.getOneSauce);

// La route suivante permettra de récupérer toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;