import React, { useEffect, useReducer, useState } from 'react';
import { addCourseAction, deleteCourseAction } from '../actions/courseAction';
import { coursesReducer, initialCoursesState } from '../reducers/coursesReducer';
import { deleteCourseById, getAllCourses } from '../server/Courses';
import { getAllStudents, joinCourse } from '../server/student';

const ProfessorCourse = () => {


    // const [courses, setNewCourses] = useState([]);
    const [hasCourse, setHasCourse] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [blackBox, setBlackBox] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    const [courses, dispatchCourse] = useReducer(coursesReducer, initialCoursesState);
    const [studentsList, setStudentsList] = useState([]);
    const [studentEmail, setCurrentOption] = useState("");
    const [currentCourse, setCurrentCourse] = useState("");
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState()
    const [selectedTime, setSelectedTime] = useState("");
    const [courseID, setCourseID] = useState("");
    const [isStudentReason, setIsStudentReason] = useState(false);

    useEffect(() => {

        getAllCourses().then(
            (res) => {
                console.log(res, "@####")
                dispatchCourse(addCourseAction(res.courses))
            }
        );

        getAllStudents().then(
            (res) => {
                console.log(res, "resss")
                setStudentsList([...res.students])
            },
            (err) => {
                console.log(err, "@")
            }
        )

    }, [])

    useEffect(() => {
        setHasCourse(true)
    }, [courses])

    const deleteCourse = (id) => {
        deleteCourseById(id).then(
            (res) => {
                dispatchCourse(deleteCourseAction(id));
            },
            (err) => {
                console.log(err)
            }
        )
    }

    const onClickShowParticipants = (participants, courseID) => {
        console.log(participants, "participants")
        setParticipants([...participants]);
        setCourseID(courseID)
        setShowParticipants(true);
        setBlackBox(true);
    }


    const removeBlackBox = () => {
        setBlackBox(false);
        setShowParticipants(false);
    }

    const showMessage = (msg) => {
        setMessage(msg);
        setBlackBox(true)

        // setTimeout(() => {
        //     setMessage("")
        //     setBlackBox(false)
        // }, 2000);
    }

    const hideMessage = () => {
        setMessage("");
        setIsStudentReason(false);
    }

    const addStudentToClass = () => {
        console.log(studentEmail, currentCourse)
        console.log(selectedTime, "@@")
        joinCourse(currentCourse, studentEmail, selectedTime).then(
            (res) => {
                setMessageStyle("professor-course-msg")
                showMessage("Added to course!");
                setTimeout(() => {
                    window.location.reload()
                    hideMessage()
                }, 2000);

            },
            (err) => {
                setMessageStyle("professor-course-msg-error")
                showMessage("Already in course");
                setTimeout(() => {
                    hideMessage()
                }, 2000);
            }
        )
    }

    const getStudentReason = (student, courseID) => {
        let result;
        let studentData;
        for (let i = 0; i < studentsList.length; i++) {
            if (studentsList[i]._id === student.id) {
                studentData = studentsList[i];
            }
        }


        for (let i = 0; i < studentData.courses.length; i++) {
            if (studentData.courses[i].courseID === courseID) {
                result = studentData.courses[i];
            }
        }
        setMessageStyle("professor-student-reason")
        setMessage(result.coursereason ? result.coursereason : "Attended");
        setBlackBox(true)
        setIsStudentReason(true);
    }


    return (
        <div className="professor-course">
            <div className="professor-course-container">
                <table>
                    <tbody>
                        <tr>
                            <th>Course</th>
                            <th>Time</th>
                            <th>Day</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Participants</th>
                            <th>Cancel</th>
                            <th>Add Student</th>
                        </tr>
                        {hasCourse && courses.map((course) => (
                            <tr key={course._id}>
                                <td>{course.name}</td>
                                <td>
                                    <select onChange={(e) => setSelectedTime(e.target.value)}>
                                        <option>----</option>
                                        {course.times.map((currentTime) => <option key={currentTime._id}>{currentTime.time}</option>)}
                                    </select>
                                </td>
                                <td>{course.day}</td>
                                <td>{course.startdate}</td>
                                <td>{course.enddate}</td>
                                <td><button onClick={() => onClickShowParticipants(course.participants, course._id)}>Participants</button></td>
                                <td><button onClick={() => deleteCourse(course._id)}>Delete</button></td>
                                <td>
                                    <div>
                                        <select onChange={(e) => { setCurrentOption(e.target.value); setCurrentCourse(course._id) }}>
                                            <option>----</option>
                                            {studentsList && studentsList.map((student) => <option key={student._id} value={student.email}>{student.name}</option>)}
                                        </select>
                                        <button onClick={addStudentToClass} className="add-student-button-courses">Add</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showParticipants && <div className="professor-course-participants">
                    <p onClick={() => removeBlackBox()} className="professor-course-participants-closebutton">X</p>
                    {participants.length > 0 ?
                        <ol>
                            {participants.map((participant) =>
                                <li key={participant.participant.id}>
                                    {participant.participant.name} - {participant.participant.time}
                                    <button onClick={() => getStudentReason(participant.participant, courseID)}> See attendance</button>
                                </li>)}
                        </ol> : <p className="professor-participants-list">No participants attend this course</p>}

                </div>}
                {blackBox && <div className="professor-blackbox" onClick={() => removeBlackBox()}></div>}
                {message &&
                    <div className={messageStyle}>
                        {isStudentReason &&
                            <div>
                                <h1>Student reason</h1>
                                <div onClick={hideMessage} className="student-reason-exit">X</div>
                            </div>
                        }
                        {message}
                    </div>
                }
            </div>
        </div>
    );
};

export default ProfessorCourse