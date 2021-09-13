import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../actions/loginAction';
import { LoginContext } from '../context/LoginContext';
import { getUserData } from '../server/auth';
import { getCookie, verifyCookieStudent } from '../server/cookie';
import { leaveCourse, studentAttendance } from '../server/student';

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const [hasCourse, setHasCourse] = useState(false);
    const { userData, dispatchUserData } = useContext(LoginContext);
    const [blackBox, setBlackBox] = useState(false);
    const [message, setMessage] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [courseID, setCourseID] = useState("");
    const [attendanceReason, setAttendanceReason] = useState("");
    const history = useHistory()


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
    //                     setCourses([...res.data.currentUser.courses])
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
        console.log("Starting")
        getUserData(userData.user).then(
            (res) => {
                console.log(res)
                setCourses([...res.userData.courses])
            }
        )

    }, [userData.user])

    useEffect(() => {
        console.log(courses)
        setHasCourse(true);
    }, [courses])

    const onClickCancel = (courseID, studentEmail) => {
        // leaveCourse(courseID, studentEmail).then(
        //     (res) => {
        //         if (res === "Success") {
        //             setMessage("Course removed!")
        //             setBlackBox(true);
        //             setCourses([...courses.filter((course) => course.courseID !== courseID)])

        //             setTimeout(() => {
        //                 setBlackBox(false);
        //                 setMessage("");
        //             }, 2000);
        //         }
        //     },
        //     (err) => {
        //         console.log(err);
        //     }
        // )
        setBlackBox(true);
        setMessageInput(true);
        setCourseID(courseID);

    }

    const studentCantAttend = () => {
        console.log(attendanceReason, "studentcant attend")
        studentAttendance(attendanceReason, userData.user, courseID).then(
            (res)=>{
                if(res === "Success"){
                    alert("Submitted")
                }else{
                    alert("Failed")
                }
            }
        )
        setMessageInput(false)
        setBlackBox(false);
        setCourseID("")
        setMessageInput("");
    } 

    return (
        <div className="courses">
            <div className="table-container">
                <table>
                    <tr>
                        <th>Course</th>
                        <th>Time</th>
                        <th>Day</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Cancel</th>
                    </tr>
                    {hasCourse && courses.map((course) => (
                        <tr>
                            <td>{course.coursename}</td>
                            <td>{course.coursetime}</td>
                            <td>{course.courseday}</td>
                            <td>{course.coursestartdate}</td>
                            <td>{course.courseenddate}</td>
                            <td><button onClick={() => onClickCancel(course.courseID, userData.user)}>X</button></td>
                        </tr>
                    ))}
                </table>
                {message && <div className="student-course-message"><p>{message}!</p></div>}
                {blackBox && <div className="student-created-box"></div>}
                {messageInput &&
                <div className="student-course-message">
                    <input value={attendanceReason} onChange={(e)=> setAttendanceReason(e.target.value)} placeholder="Reason not to attend" />
                    <button onClick={studentCantAttend}>Submit
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default Courses;