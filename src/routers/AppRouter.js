import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginContextProvider from '../components/context/LoginContext';
import BookCourse from '../components/courses/BookCourse';
import Courses from '../components/courses/Courses';
import Header from '../components/header/Header';
import Home from '../components/home/Home';
import HomeProfessor from '../components/homeProfessor/HomeProfessor';
import Login from '../components/login/LoginPage';
import Profile from '../components/profile/Profile';
import PrivateRouter from './PrivateRouter';
import PublicLoginRouter from './PublicLoginRouter';
import PublicRouter from './PublicRouter';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <LoginContextProvider>
                <Header />
                <Switch>
                    <PublicLoginRouter path="/" component={Login} exact={true} />
                    <PublicRouter path="/home" component={Home} exact={true} />
                    <PrivateRouter path="/home-professor" component={HomeProfessor} />
                    <PublicRouter path="/profile" component={Profile} />
                    <PublicRouter path="/courses" component={Courses} />
                    <PublicRouter path="/book-course" component={BookCourse} />
                    <PublicLoginRouter path="*" component={Login} exact={true} />
                </Switch>
            </LoginContextProvider>
        </BrowserRouter>
    )
}

export default AppRouter;