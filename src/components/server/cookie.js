import Axios from 'axios';
import cookie from 'js-cookie';


export const addLoginCookie = (token, email, isProfessor) => {
    try {
        cookie.set("token", token);
        cookie.set("useremail", email);
        cookie.set("isProfessor", isProfessor);
        return;
    } catch (err) {
        console.log(err);
    }
}

export const removeCookie = () => {
    cookie.remove("token");
    cookie.remove("useremail");
    cookie.remove("isProfessor");
}

export const getCookie = () => {
    console.log("getting cookie")
    let token = cookie.get("token");
    let email = cookie.get("useremail");
    let isProfessor = cookie.get("isProfessor");
    return { token, email, isProfessor }
}

export const verifyCookieProfessor = async (email, token) => {
    try {
        const res = await Axios.post("http://localhost:5000/verify-token-professor", { email, token, isProfessor: true })
        if (!res.data?.currentUser) {
            throw new Error("Failed to verify")
        }
        return res;

    } catch (err) {
        throw new Error(err)
    }
}


export const verifyCookieStudent = async (email, token) => {
    try {
        const res = await Axios.post("http://localhost:5000/verify-token-student", { email, token, isProfessor: false })
        if (!res.data?.currentUser) {
            throw new Error("Failed to verify")
        }
        return res;

    } catch (err) {
        throw new Error(err)
    }
}