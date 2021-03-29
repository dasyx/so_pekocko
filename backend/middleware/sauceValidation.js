const validate = require('mongoose-validator'); // Appel du plugin mongoose-validator

// Création du processus de validation de chaque input de l'élément sauce

// Validation du nom de la sauce
exports.nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 30], // Le nom doit contenir entre 3 et 30 caractères
        message: 'Le nom de cette sauce doit contenir comporter entre 3 et 30 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9\ \-_\s]+$/gi, // Utilisation de regex
        message: "Vous pourrez nommer votre sauce à l'aide de chiffres, de lettres, et de tirets si vous le voulez !",
    }),
];
// Validation du nom du fabricant de la sauce
exports.manufacturerValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 30], // Le nom doit contenir entre 3 et 30 caractères
        message: 'Le nom du fabricant doit contenir comporter entre 3 et 30 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z\d\ \-_\s]+$/i, // Utilisation de regex
        message: "Vous pourrez nommer le fabricant votre sauce à l'aide de chiffres, de lettres, et de tirets si vous le voulez !",
    }),
];
// Validation de la description de la sauce
exports.descriptionValidator = [ //  Validation pour la decription de la sauce
    validate({
        validator: 'isLength',
        arguments: [1, 200],
        message: 'Décrivez cette sauce avec minimum 20 et maximum 200 caractères',
    }),
     validate({
        validator: 'matches',
        arguments: /^[a-zA-Z\d\ \-_\s]+$/i, // Regex pour restreindre le type de symboles pour la description de la sauce
        message: "Vous ne pourrez utiliser que des chiffres et des lettres pour écrire une description de cette sauce",
    }),
  ];
// Validation du niveau de
  exports.pepperValidator = [ // Validation pour le principal ingrédient de la sauce
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Le principal ingrédient devra contenir entre 3 et 20 caractères'
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z\d\ \-_\s]+$/i, // Regex pour restreindre le type de symboles pour la description de la sauce
        message: "Vous ne pourrez utiliser que des chiffres et des lettres pour définir l'ingrédient principal de cette sauce",
    }),
  ];