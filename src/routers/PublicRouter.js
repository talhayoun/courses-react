import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import { loginAction } from '../components/actions/loginAction';
import { LoginContext } from '../components/context/LoginContext';
import { getCookie, verifyCookieStudent } from '../components/server/cookie';

const PublicRouter = ({ component: Component, ...rest }) => {

    const { userData, dispatchUserData } = useContext(LoginContext);
    const history = useHistory();

    useEffect(() => {
        console.log("PUBLIC ROUTER")
        const cookiesData = getCookie();
        console.log(cookiesData)
        if (cookiesData.isProfessor === "false") {
            console.log("goingtoverify cookiee")
            verifyCookieStudent(cookiesData.email, cookiesData.token).then(
                (res) => {
                    console.log(res, "cookie verified")
                    if (!res.data.currentUser) {
                        console.log("SENDING TO LOGIN")
                        history.push("/");
                    } else {
                        console.log("NOT SENDING TO LOGIN")
                        dispatchUserData(loginAction(cookiesData.email, cookiesData.token, false))
                    }
                },
                (err) => {
                    console.log("WHY SEND TO LOGIN")
                    history.push("/");
                }
            )
        } else {
            console.log("WHY THE FUCK")
            history.push("/")
        }
    }, [])

    return (
        <Route
            {...rest}
            component={(props) =>
                // userData.user ? <Component {...props} /> : <Redirect to="/" {...props} />
                userData.user && <Component {...props} />
            }
        />
    );
};

export default PublicRouter;