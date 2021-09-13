import React, { useState } from 'react';
import { newStudent } from '../server/student';

const ProfessorNewStudent = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [blackBox, setBlackBox] = useState(false);
    const [message, setMessage] = useState("");


    const onClickCreate = (e) => {
        e.preventDefault()
        newStudent(email, password, phone, name, address, "").then(
            (res) => {
                setMessage("Student created!")
                setBlackBox(true);

                setTimeout(() => {
                    setBlackBox(false);
                    setMessage("");
                }, 2000);

                setName("");
                setEmail("");
                setPassword("");
                setAddress("");
                setPhone("");
            },
            (err) => {
                console.log(err);
            }
        )
    }

    return (
        <div className="professor-new-student">
            <div className="professor-new-student-container">
                <form onSubmit={onClickCreate}>
                    <h1>Add New Student</h1>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required />
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label>Address</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <label>Phone-Number</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <button>Create!</button>
                </form>
                {message && <div className="book-course-message"><p>{message}!</p></div>}
                {blackBox && <div className="bookcourse-created-box"></div>}
            </div>
        </div>
    );
};

export default ProfessorNewStudent