const bcrypt = require('bcrypt');
// Importation du package pour créer des tokens et de les vérifier
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/* Ajout de deux middlewares d'authentification
================================================*/

exports.signup = (req, res, next) => {
    // On appelle la méthode hash de bcrypt qui sera la fonction de cryptage de mot de passe
    // On va lui passer le mdp du corps de la requête passé par le frontend
    // le "salt" correspond de fois on execute l'algorythme de hashage, soit 10 fois ici
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        // Création du nouvel utilisateur
        const user = new User({
          email: req.body.email,
          password: hash
        });
        // Enregistrement de l'utilisateur dans la base de données
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    // Puisque l'adresse mail est unique on sait que l'utilisateur trouvé sera le bon
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // On va utiliser bcrypt pour comparer le mdp envoyé par l'utilisateur qui essaie de connecter
        // Avec le hash qui est enregistré avec le user reçu avant
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            } 
            res.status(200).json({
              userId: user._id,
              // On appelle la fonction sign de jsonwebtoken
              // Prendra pour le payload pour argument
              // Ainsi que la clé secrète pour l'encodage
              token: jwt.sign(
                // On encode le userId pour la création de nouveaux objets
                // On ne pourra pas modifier un objet crée par un autre utilisateur
                { userId: user._id },
                  process.env.SECRET,
                // Ci-dessous l'argument de configuration
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};