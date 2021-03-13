module.exports = (req,res,next) => {
    const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
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