// On a besoin d'express pour créer un routeur
const express = require('express');
const router = express.Router();
// On a besoin du controlleur pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

// Grâce aux routes post le frontend enverra des informations
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;