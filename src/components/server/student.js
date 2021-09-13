import Axios from 'axios';

export const joinCourse = async (id, studentEmail, time) => {
    try {
        const res = await Axios.post("http://localhost:5000/attend-course", { id, studentEmail, time });
        if (res.data !== "Success") {
            throw new Error(res.data);
        }
        return res;
    } catch (err) {
        throw new Error(err)
    }
}

export const leaveCourse = async (courseID, studentEmail) => {
    try {
        console.log(courseID, studentEmail, "this is")
        const res = await Axios.post("http://localhost:5000/student-leave-course", { courseID, studentEmail })
        if (res.data !== "Success") {
            throw new Error("Failed to leave course")
        }
        return res.data
    } catch (err) {
        throw new Error(err);
    }
}

export const newStudent = async (email, password, phonenumber, name, adress) => {
    try {
        const res = await Axios.post("http://localhost:5000/signup", { email, password, phonenumber, name, adress })
        if (res.data !== "Created new user") {
            throw new Error("Failed to create new user")
        };
        return res;
    } catch (err) {
        throw new Error(err);
    }
}

export const getAllStudents = async () => {
    try {
        const res = await Axios.get("http://localhost:5000/get-all-students");
        if (!res.data?.students) {
            throw new Error("Failed to get students")
        };
        return res.data
    } catch (err) {
        throw new Error(err);
    }
}

export const studentAttendance = async(reason, studentEmail, courseID) => {
    try{
        const res = await Axios.post("http://localhost:5000/student-attendance", {reason, studentEmail, courseID})
        if(res !== "Success"){
            throw new Error("Failed")
        }
        return res;
    }catch(err){
        throw new Error(err);
    }
}