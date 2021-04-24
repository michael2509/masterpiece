// ES6 module syntax
import LocalizedStrings from 'react-localization';

// Inputs Labels names in multi languages
let labels = new LocalizedStrings({
    en: {
        username: "username",
        password: "password",
        confirmPassword: "confirm password",
        name: "name",
        startDateTime: "startDateTime",
        endDateTime: "endDateTime",
        message: "message"
    },
    fr: {
        username: "identifiant",
        password: "mot de passe",
        confirmPassword: "confirmation du mot de passe",
        name: "nom",
        startDateTime: "date de début",
        endDateTime: "date de fin",
        message: "message"
    },
});

export default labels;