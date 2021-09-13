import React, { useEffect, useState } from 'react';
import { newCourse } from '../server/Courses';

const ProfessorNewCourse = () => {

    const [isCreated, setIsCreated] = useState(false);
    const [coursename, setCoursename] = useState("");
    const [courseday, setCourseday] = useState("");
    const [coursetime, setCoursetime] = useState([]);
    const [coursestartdate, setCoursestartdate] = useState("");
    const [courseenddate, setCourseenddate] = useState("");
    const [time, setTime] = useState("");

    const onClickSubmit = (e) => {
        e.preventDefault();
        const courseName = e.target.children[2].value;
        const courseDay = e.target.children[4].value;
        // const courseTime = e.target.children[6].value;
        const courseTime = coursetime;
        const courseStartDate = e.target.children[8].value;
        const courseEndDate = e.target.children[10].value;
        console.log(courseName, courseDay, courseTime, courseStartDate, courseEndDate)

        newCourse(courseName, courseDay, courseTime, courseStartDate, courseEndDate).then(
            (res) => {
                setIsCreated(true);
                setCoursename(res.name)
                setCourseday(res.day)
                setCoursetime(res.time)
                setCoursestartdate(res.startdate)
                setCourseenddate(res.enddate)
                setTimeout(() => {
                    setIsCreated(false);
                    setCoursetime("")
                    setCoursename("")
                    setCourseday("")
                    setCoursestartdate("")
                    setCourseenddate("")
                }, 2000);
            },
            (err) => {
                console.log(err)
            }
        )

    }

    const addTimeToList = () => {
        console.log(coursetime, "s")
        setCoursetime([...coursetime, time]);
        setTime("");
    }

    useEffect(()=>{
        console.log(coursetime)
    }, [coursetime])

    return (
        <div className="professor-new-course">
            <div className="professor-new-course-container">
                <form onSubmit={onClickSubmit}>
                    <h1>New Course</h1>
                    <label for="name">Course Name</label>
                    <input value={coursename} onChange={(e) => setCoursename(e.target.value)} name="name" />
                    <label for="day">Day</label>
                    <input value={courseday} onChange={(e) => setCourseday(e.target.value)} name="day" />
                    <label for="time">Time</label>
                    <input value={time} onChange={(e) => setTime(e.target.value)} name="time" />
                    {coursetime?.length > 0 && coursetime.map((time) => <p className="time-style">{time}</p>)}
                    <label for="startdate">Start Date</label>
                    <input value={coursestartdate} onChange={(e) => setCoursestartdate(e.target.value)} name="startdate" />
                    <label for="enddate">End Date</label>
                    <input value={courseenddate} onChange={(e) => setCourseenddate(e.target.value)} name="enddate" />
                    <button>Submit</button>
                    <button type="button" className="button-time" onClick={addTimeToList}>Add time</button>
                    {isCreated &&
                        <div className="professor-created-box">
                            <h1>Created new course</h1>
                            <p>Course Name: {coursename}</p>
                            <p>Course Day: {courseday}</p>
                            {/* <p>Course Time: {coursetime}</p> */}
                        </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default ProfessorNewCourse