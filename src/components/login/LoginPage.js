import React, { useState } from 'react';
import LoginForm from './LoginForm';

const Login = () => {

    const [loginForm, setLoginForm] = useState("Student");
    const onClickProfessor = () => {
        console.log(loginForm)
        if (loginForm === "Student") {
            setLoginForm("Professor");
        } else {
            setLoginForm("Student")
        }
    }

    return (
        <div className="login">
            <div className="login-container">
                {loginForm === "Student" ? <LoginForm isProfessor={false} /> : <LoginForm isProfessor={true} />}
            </div>
            {loginForm === "Student" ? <button onClick={onClickProfessor} className="professor-login">Log in as Professor</button> : <button onClick={onClickProfessor} className="professor-login">Log in as Student</button>}
        </div>
    );
};

export default Login;