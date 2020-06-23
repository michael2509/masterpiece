import { signUpReducer } from "../SignUp/signUpReducer";

export function rootReducer(state = {}, action) {
    return {
        signUp: signUpReducer(state.signUp, action)
    }
}