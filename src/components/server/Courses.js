import Axios from 'axios';


export const newCourse = async (courseName, courseDay, courseTime, courseStartDate, courseEndDate) => {
    try {
        const res = await Axios.post("http://localhost:5000/new-course", { courseName, courseDay, courseTime, courseStartDate, courseEndDate })
        if (!res.data?.newCourse) {
            throw new Error("Failed to create new course");
        }
        return res.data.newCourse
    } catch (err) {
        console.log(err)
    }
}


export const getAllCourses = async () => {
    try {
        const res = await Axios.get("http://localhost:5000/get-courses");
        if (!res.data?.courses) {
            throw new Error("cant get courses")
        }
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export const deleteCourseById = async (id) => {

    try {
        const res = await Axios.post("http://localhost:5000/delete-course", { id })
        if (!res.data?.deleteCourse) {
            throw new Error("Failed to delete course");
        };
        return res.data
    } catch (err) {
        throw new Error(err.message)
    }
}
