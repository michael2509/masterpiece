const errorType = (error) => {
    const status = error.status;
    const defaultMessage = error.data.errors[0].defaultMessage;
    let msg;

    if (status === 400) {
        msg = defaultMessage;
    } else if (status === 401) {
        msg = "Une identification est nécessaire pour obtenir la réponse demandée.";
    } else if (status === 404) {
        msg = "Le serveur n'a pas trouvé la ressource demandée";
    } else if (status === 500) {
        msg = "Erreur interne du serveur";
    } else {
        msg = error.data.error;
    }

    return msg;
}

export default errorType;