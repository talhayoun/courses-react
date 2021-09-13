import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addCourseAction } from '../actions/courseAction';
import { loginAction } from '../actions/loginAction';
import { LoginContext } from '../context/LoginContext';
import { coursesReducer, initialCoursesState } from '../reducers/coursesReducer';
import { getCookie, verifyCookieStudent } from '../server/cookie';
import { getAllCourses } from '../server/Courses';
import { joinCourse } from '../server/student';

const BookCourse = () => {

    // const [courses, setCourses] = useState([]);
    const [hasCourse, setHasCourses] = useState(false)
    const { userData, dispatchUserData } = useContext(LoginContext);
    const [courses, dispatchCourses] = useReducer(coursesReducer, initialCoursesState)
    const [error, setError] = useState("");
    const [blackBox, setBlackBox] = useState(false);
    const [message, setMessage] = useState("");


    const history = useHistory();

    // useEffect(() => {
    //     console.log(userData, "userdata")

    //     const cookiesData = getCookie();
    //     if (cookiesData.token && cookiesData.email) {
    //         console.log("goingtoverify cookiee")
    //         verifyCookieStudent(cookiesData.email, cookiesData.token).then(
    //             (res) => {
    //                 console.log(res, "cookie verified")
    //                 if (!res.data.currentUser) {
    //                     history.push("/");
    //                 } else {
    //                     dispatchCourses(addCourseAction(res.data.currentUser.courses))
    //                     dispatchUserData(loginAction(cookiesData.email, cookiesData.token, false))
    //                 }
    //             },
    //             (err) => {
    //                 history.push("/");
    //             }
    //         )
    //     }
    // }, [])

    useEffect(() => {

        getAllCourses().then(
            (res) => {
                dispatchCourses(addCourseAction(res.courses))
            }
        )
    }, [])

    useEffect(() => {

        setHasCourses(true);
        console.log(hasCourse)
        console.log(courses)
    }, [courses])

    const attendCourse = (id, studentEmail) => {
        joinCourse(id, studentEmail).then(
            (res) => {
                setMessage("Course added!")
                setBlackBox(true);

                setTimeout(() => {
                    setBlackBox(false);
                    setMessage("");
                }, 2000);
            },
            (err) => {
                setError("Already attending this course");
                setBlackBox(true);

                setTimeout(() => {
                    setBlackBox(false);
                    setError("");
                }, 2000);
            }
        )
    }

    return (
        <div className="bookcourse">
            <div className="bookcourse-container">
                <table>
                    <tr>
                        <th>Course</th>
                        <th>Time</th>
                        <th>Day</th>
                        <th>Attend</th>
                    </tr>
                    {hasCourse && courses.map((course) => (
                        <tr>
                            <td>{course.name}</td>
                            <td>{course.time}</td>
                            <td>{course.day}</td>
                            <td><button onClick={() => attendCourse(course._id, userData.user)}>X</button></td>
                        </tr>
                    ))}
                </table>
                {error && <div className="error-message-bookcourse"><p>{error}</p></div>}
                {message && <div className="book-course-message"><p>{message}!</p></div>}
                {blackBox && <div className="bookcourse-created-box"></div>}
            </div>
        </div>
    );
};

export default BookCourse;