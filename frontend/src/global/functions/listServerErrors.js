import buildErrorMsg from "./buildErrorMsg";

const listServerErrors = (response) => {
    const messages = [];

    if (response === undefined) {
        messages.push("Une erreur est survenue");
        return messages;
    } else if (response.status === 400) {
        response.data.forEach(serverError => {
            const msg = buildErrorMsg(serverError.code, serverError.attribute)
            messages.push(msg)
        });
    } else if (response.status === 401) {
        messages.push("Une identification est nécessaire pour obtenir la réponse demandée.");
    } else if (response.status === 404) {
        messages.push("Le serveur n'a pas trouvé la ressource demandée");
    } else if (response.status === 500) {
        messages.push("Erreur interne du serveur");
    } else {
        messages.push("Une erreur est survenue");
    }

    return messages;
}

export default listServerErrors;