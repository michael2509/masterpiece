// Messages associated to validation error code

const errorsCodesMsg = {
    NotBlank:"Ne doit pas être vide",
    NotNull:"Ne peut être nul",
    UniqueUsername:"Un compte ayant cet identifiant existe déjà",
    Future:"Doit être dans le futur",
    FutureOrPresent:"Ne doit pas être dans le passé",
    Size:"Contient trop de caractères",
    AfterDate:"Le début du meeting doit être avant la fin du meeting",
    AccountPassword: "Doit contenir au moins 8 caractères, dont au minimum 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial"
}

export default errorsCodesMsg;