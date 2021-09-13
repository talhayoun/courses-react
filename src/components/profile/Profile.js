import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../actions/loginAction';
import { LoginContext } from '../context/LoginContext';
import { getUserData, updateUserPassword } from '../server/auth';
import { getCookie, verifyCookieStudent } from '../server/cookie';

const Profile = () => {

    const { userData, dispatchUserData } = useContext(LoginContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [adress, setAdress] = useState("");
    const [editPassword, setEditPassword] = useState(false);
    const [error, setError] = useState("");
    const [typedPassword, setTypedPassword] = useState("");
    const [repeatedTypedPassword, setRepeatedTypedPassword] = useState("");

    const history = useHistory()


    // useEffect(() => {

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
    //                     setName(res.data.currentUser.name);
    //                     setAdress(res.data.currentUser.adress || "Unknown");
    //                     setEmail(res.data.currentUser.email || "Unknown");
    //                     setPhoneNumber(res.data.currentUser.phonenumber || "Unknown");;
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


    useEffect(() => {
        console.log(userData.user, "sending this user")
        getUserData(userData.user, userData.isProfessor).then(
            (res) => {
                console.log(res, "resss");
                setName(res.userData.name);
                setAdress(res.userData.adress || "Unknown");
                setEmail(res.userData.email || "Unknown");
                setPhoneNumber(res.userData.phonenumber || "Unknown");;
            },
            (err) => {
                console.log(err, "err")
            }
        )

    }, [])

    const onClickButton = (e) => {
        e.preventDefault()
        setEditPassword(true)
    }
    const updateDetails = (e) => {
        e.preventDefault();
        if (typedPassword !== repeatedTypedPassword) {
            setError("Password don't match")
        } else {
            updateUserPassword(email, typedPassword, userData.isProfessor).then(
                (data) => {
                    if (data === "Updated") {
                        alert("Password updated!")
                    }
                }
            )
        }
    }

    return (
        <div className="profile">
            <div className="profile-container">
                <form>
                    <div>

                    </div>
                    <div className="profile-container-div">
                        <h3>Email</h3>
                        <p>{email}</p>
                        <h3>Name</h3>
                        <p>{name}</p>
                        <h3>Phone Number</h3>
                        <p>{phoneNumber} </p>
                        <h3>Adress</h3>
                        <p>{adress}</p>
                    </div>
                    <div className="profile-container-div-button">
                        <button onClick={onClickButton} className="profile-div-button-button">Edit password</button>
                        {editPassword && <input className="profile-container-div-inputOne" value={typedPassword} onChange={(e) => setTypedPassword(e.target.value)} placeholder="New Password" />}
                        {editPassword && <input className="profile-container-div-inputTwo" value={repeatedTypedPassword} onChange={(e) => setRepeatedTypedPassword(e.target.value)} placeholder="Repeat New Password" />}
                        {error && <p className="error-message-login">{error}</p>}
                        {editPassword && <button className="profile-container-div-button-update" onClick={updateDetails}>Update Password</button>}
                    </div>
                    <div className="profile-container-img">
                        <div className="profile-img">

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile