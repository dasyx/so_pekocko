const verify = require('mongoose-validator'); // Appel du plugin mongoose-validator

exports.nameVerification = [
    validate({
        validator: 'isLength',
        arguments: [3, 30], // Le nom doit contenir entre 3 et 30 caractères
        message: 'Le nom de cette sauce doit contenir comporter entre 3 et 30 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z0-9\-_\s]+$/gi, // Utilisation de regex
        message: "Vous pourrez nommer votre sauce à l'aide de chiffre, de lettres, et de tirets si vous le voulez !",
    }),
];