// Exportation d'un middleware qui sera utilisé pour sécuriser la route utilisateur
// Lors de son inscription
module.exports = (req,res,next) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // Création d'une règle d'expression régulière qui sera le modèle d'adresse mail à respecter
    // On la teste pour vérifier la recevabilité
    if(regexEmail.test(req.body.email)) {
        // Si l'input user est valide alors on passe au middleware suivant, qui vaut validation
        next();
        // Sinon on renverra une erreur
        } else {
            res.status(400).json({ message: "L'identifiant utilisateur doit être une adresse email valide !"});
        }
    } 