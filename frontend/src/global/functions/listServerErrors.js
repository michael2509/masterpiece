import buildErrorMsg from "./buildErrorMsg";

const listServerErrors = (status, data) => {
    const messages = [];

    if (status === 400) {
        data.forEach(serverError => {
            const msg = buildErrorMsg(serverError.code, serverError.attribute)
            messages.push(msg)
        });
    } else if (status === 401) {
        messages.push("Une identification est nécessaire pour obtenir la réponse demandée.");
    } else if (status === 404) {
        messages.push("Le serveur n'a pas trouvé la ressource demandée");
    } else if (status === 500) {
        messages.push("Erreur interne du serveur");
    } else {
        messages.push("Une erreur est survenue");
    }

    return messages;
}

export default listServerErrors;