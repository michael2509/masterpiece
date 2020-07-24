// ES6 module syntax
import LocalizedStrings from 'react-localization';

let labels = new LocalizedStrings({
    en: {
        username: "username",
        email: "email",
        password: "password",
        confirmPassword: "confirm password",
        name: "name",
        startDateTime: "startDateTime",
        endDateTime: "endDateTime"
    },
    fr: {
        username: "identifiant",
        email: "email",
        password: "mot de passe",
        confirmPassword: "confirmation du mot de passe",
        name: "nom",
        startDateTime: "date de début",
        endDateTime: "date de fin"
    },
});

export default labels;