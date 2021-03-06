import errorsCodesMsg from "../configs/errorsCodesMsg";
import labels from "../configs/label";

// Build error message using input name and error code from backend
const buildErrorMsg = (code, attribute) => {
    
    let errorMsg;

    if (attribute === null) {
        errorMsg = `${errorsCodesMsg[code]}`;
    } else {
        errorMsg = `[Champ ${labels[attribute]}] : ${errorsCodesMsg[code]}`;
    }

    return errorMsg;
}
export default buildErrorMsg;