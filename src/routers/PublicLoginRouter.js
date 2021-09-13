import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../components/actions/loginAction';
import { LoginContext } from '../components/context/LoginContext';
import { getCookie, verifyCookieProfessor, verifyCookieStudent } from '../components/server/cookie';


const PublicLoginRouter = ({ component: Component, ...rest }) => {

    const { userData, dispatchUserData } = useContext(LoginContext);

    const history = useHistory()

    useEffect(() => {
        console.log("PUBLIC LOGIN ROUTER")
        console.log(userData, "userdata")

        const cookiesData = getCookie();
        if (cookiesData.isProfessor === "false") {
            console.log("goingtoverify cookiee")
            verifyCookieStudent(cookiesData.email, cookiesData.token).then(
                (res) => {
                    console.log(res, "cookie verified")
                    if (!res.data.currentUser) {
                        history.push("/");
                    } else {
                        dispatchUserData(loginAction(cookiesData.email, cookiesData.token, false))
                    }
                },
                (err) => {
                    history.push("/");
                }
            )
        } else {
            console.log("goingtoverify cookiee")
            verifyCookieProfessor(cookiesData.email, cookiesData.token).then(
                (res) => {
                    console.log(res, "cookie verified")
                    if (!res.data.currentUser) {
                        history.push("/");
                    } else {
                        dispatchUserData(loginAction(cookiesData.email, cookiesData.token, true))
                    }
                },
                (err) => {
                    history.push("/");
                }
            )
        }
    }, [])

    return (
        <Route
            {...rest}
            component={(props) =>
                userData.user ? <Redirect to={userData.isProfessor ? "/home-professor" : "/home"} {...props} /> : <Component {...props} />
            }
        />
    )
}

export default PublicLoginRouter