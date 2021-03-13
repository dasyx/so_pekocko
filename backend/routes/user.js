// On a besoin d'express pour créer un routeur
const express = require('express');
const router = express.Router();
// On a besoin du controlleur pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');
const checkEmail = require('../middleware/email');
const checkPassword = require('../middleware/password');


//Utilisation du package npm permettant de bloquer les abus lors de tentatives de connexions
const rateLimit = require("express-rate-limit");


// Crée une limitation en cas de tentatives trop nombreuses
// Va protéger l'API des attaques brute force
const limitation = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // Limite à 3 tentatives par adresse IP
  message: "Nombre de requêtes abusives détectées , attendez 5 minutes avant nouvel essai",
});

// Grâce aux routes post le frontend enverra des informations
router.post('/signup', checkEmail, checkPassword, userCtrl.signup);
router.post('/login', limitation, userCtrl.login);

module.exports = router;