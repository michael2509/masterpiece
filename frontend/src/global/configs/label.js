// ES6 module syntax
import LocalizedStrings from 'react-localization';

let labels = new LocalizedStrings({
    en: {
        identifiant: "username",
        email: "email",
        mdp: "password",
        confirmationMdp: "confirm password"
    },
    fr: {
        identifiant: "identifiant",
        email: "email",
        mdp: "mot de passe",
        confirmationMdp: "confirmation du mot de passe"
    },
});

export default labels;