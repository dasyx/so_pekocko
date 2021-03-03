const express = require('express');
// Importation du package pour extraire l'objet JSON de la demande
const bodyParser = require('body-parser');
// Importation du package mongoose pour accèder à la base de données
const mongoose = require('mongoose');
// Importation du routeur contenant les routes vers les sauces
const saucesRoutes = require('./routes/sauces');
// Importation du routeur contenant les middlewares d'authentification
const userRoutes = require('./routes/user');

// Connection au cluster MongoDB
mongoose.connect('mongodb+srv://dasyx:mzQyjOdjJNajPMqL@cluster0.ap1uo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Grâce à ces headers, on pourra accèder notre API depuis n'importe quelle origine, et envoyer différents types de requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;