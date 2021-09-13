export const loginAction = (user, token, isProfessor) => ({
    type: "LOGIN",
    user,
    token,
    isProfessor
})

export const logoutAction = () => ({
    type: "LOGOUT"
})