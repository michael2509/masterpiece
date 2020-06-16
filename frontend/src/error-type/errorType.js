const errorType = (error) => {
    const status = error.status;
    const messages = [];

    if (status === 400) {
        error.data.errors.forEach(serverError => {
            messages.push(serverError.defaultMessage)
        });
    } else if (status === 401) {
        messages.push("Une identification est nécessaire pour obtenir la réponse demandée.");
    } else if (status === 404) {
        messages.push("Le serveur n'a pas trouvé la ressource demandée");
    } else if (status === 500) {
        messages.push("Erreur interne du serveur");
    } else {
        messages.push(error.data.error);
    }

    return messages;
}

export default errorType;