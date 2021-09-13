import React, { useContext, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import { loginUser } from '../server/auth';
import { loginAction, logoutAction } from '../actions/loginAction';
import { useHistory } from 'react-router-dom';
import { addLoginCookie } from '../server/cookie';
const LoginForm = (props) => {

    const [error, setError] = useState("");
    const { userData, dispatchUserData } = useContext(LoginContext);

    const history = useHistory();

    const onClickLogin = (e) => {
        e.preventDefault();
        console.log(props.isProfessor, "PROF")
        const email = e.target.children[0].value;
        const password = e.target.children[1].value;
        loginUser(email, password, props.isProfessor).then(
            (token) => {
                console.log("LOGGED IN ", token)
                dispatchUserData(loginAction(email, token, props.isProfessor || false))
                addLoginCookie(token, email, props.isProfessor);
                if (props.isProfessor) {
                    history.push("/home-professor")
                } else {
                    history.push("/home")
                }
            },
            (err) => {
                setError("Email or password are invalid");
            }
        )
    }

    return (
        <div>
            <h1>LOGIN</h1>
            {props.isProfessor && <h2>Professor</h2>}
            <form className="form-login" onSubmit={onClickLogin}>
                <input placeholder="Email" />
                <input placeholder="Password" />
                {error && <p className="error-message-login">{error}</p>}
                <button className="login-button">LOGIN</button>
            </form>
        </div>
    );
};

export default LoginForm