import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logoutAction } from '../actions/loginAction';
import { LoginContext } from '../context/LoginContext';
import { removeCookie } from '../server/cookie';

const Header = () => {

    const { userData, dispatchUserData } = useContext(LoginContext)
    const history = useHistory()
    const onLogoutClick = () => {
        dispatchUserData(logoutAction());
        removeCookie()
        history.push("/")
    }
    return (
        <div className="header">
            <div className="header-nav">
                {userData.isProfessor ? <NavLink to="/home-professor">Home</NavLink> : <NavLink to="/home">Home</NavLink>}
                {!userData.isProfessor && <NavLink to="/profile"> Profile</NavLink>}
                {userData.user && <button onClick={onLogoutClick}>Logout</button>}
            </div>
        </div>
    );
};

export default Header;