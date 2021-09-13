import React, { useContext, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import Profile from '../profile/Profile';
import ProfessorCourse from './ProfessorCourse';
import ProfessorNewCourse from './ProfessorNewCourse';
import ProfessorNewStudent from './ProfessorNewStudent';

const HomeProfessor = () => {

    const { userData } = useContext(LoginContext);
    const [currentBody, setCurrentBody] = useState("professor-courses");


    return (
        <div className="home-professor">
            <div className="home-professor-container">
                <div className="home-professor-nav">
                    <div className="professor-profile"></div>
                    <h3>Welcome, {userData.user}</h3>
                    <ul>
                        <li onClick={(e) => setCurrentBody("professor-new-student")}>New Student</li>
                        <li onClick={() => setCurrentBody("professor-new-course")}>New Course</li>
                        <li onClick={() => setCurrentBody("professor-courses")}>Courses</li>
                        <li onClick={() => setCurrentBody("professor-profile")}>Profile</li>
                    </ul>
                </div>
                <div className="home-professor-body">
                    {currentBody === "professor-new-student" && <ProfessorNewStudent />}
                    {currentBody === "professor-new-course" && <ProfessorNewCourse />}
                    {currentBody === "professor-courses" && <ProfessorCourse />}
                    {currentBody === "professor-profile" && <Profile />}
                </div>
            </div>
        </div>
    );
};

export default HomeProfessor