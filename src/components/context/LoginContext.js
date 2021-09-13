import React, { createContext, useReducer } from 'react';
import loginReducer, { userDataInitialLoginState } from '../reducers/loginReducer';

export const LoginContext = createContext()

const LoginContextProvider = (props) => {
    const [userData, dispatchUserData] = useReducer(loginReducer, userDataInitialLoginState)


    return (
        <LoginContext.Provider value={{ userData, dispatchUserData }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;