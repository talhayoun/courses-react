export const userDataInitialLoginState = {
    user: null,
    token: "",
    isProfessor: false
}

const loginReducer = (userData, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.user, token: action.token, isProfessor: action.isProfessor };
        case "LOGOUT":
            return { user: null, token: "", isProfessor: false };
        default:
            return { ...userData }
    }
}

export default loginReducer