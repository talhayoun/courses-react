import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginAction } from '../actions/loginAction';
import { LoginContext } from '../context/LoginContext';
import { getCookie, verifyCookieStudent } from '../server/cookie';

const Home = () => {

    const { userData, dispatchUserData } = useContext(LoginContext);
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
    //                     dispatchUserData(loginAction(cookiesData.email, cookiesData.token, false))
    //                 }
    //             },
    //             (err) => {
    //                 history.push("/");
    //             }
    //         )
    //     } else {
    //         history.push("/")
    //     }
    // }, [])



    return (
        <div className="home">
            <div className="home-header">
                <div className="home-buttons">
                    <Link to="/courses" className="home-button-one">My Courses</Link>
                    <Link to="/book-course" className="home-button-two">Book Courses</Link>
                </div>
            </div>
        </div>
    );
};


export default Home