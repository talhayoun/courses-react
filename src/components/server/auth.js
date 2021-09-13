import Axios from 'axios';


export const loginUser = async (email, password, isProfessor) => {
    try {
        const res = await Axios.post("http://localhost:5000/login", { email, password, isProfessor })
        if (!res.data?.token) {
            throw new Error("Failed to log in");
        }
        return res.data.token
    } catch (err) {
        if (err.message === "Failed to log in") {
            throw new Error(err.message)
        }
    }
}

export const getUserData = async (email, isProfessor) => {
    try {
        console.log(email, "got this email")
        const res = await Axios.post("http://localhost:5000/userdata", { email, isProfessor });
        if (!res.data?.userData) {
            throw new Error("Failed to get profile")
        }
        return res.data
    } catch (err) {
        throw new Error(err.message);
    }
}

export const updateUserPassword = async (email, password, isProfessor) => {
    try {
        const res = await Axios.post("http://localhost:5000/updateuser", { email, password, isProfessor })
        if (!res.data) {
            throw new Error("Failed to update pass")
        }
        return res.data;
    } catch (err) {

    }
}