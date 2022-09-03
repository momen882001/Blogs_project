import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from '../API/axios'
import './SignUp.css'

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        console.log(name,email, password,confirm_password,birthdate)
        e.preventDefault()

        axios.post('/user', {
            email,
            password,
            name,
            confirm_password,
            birthdate
        }).then((response) => {
            console.log("posting data", response)
            navigate('/');
        }).catch((err) => {
            console.log(err.response.data.err)
        })
    };

    return (
        <div className="signup">
            <form className="signup-form" onSubmit={onSubmit}>
            <h1 className="h1-signup">SignUp</h1>

                <div className="signup-con">

                <div className="row-signup">
                    <label htmlFor="">Name :</label>
                    <input autoFocus type="text" required placeholder="Write your name" value={name} onChange={(e) => setName(e.target.value)}  />
                </div>

                <div className="row-signup">
                    <label htmlFor="">Email :</label>
                    <input  type="email" required placeholder="Write your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="row-signup">
                    <label htmlFor="">Password :</label>
                    <input  type="password" required placeholder="Write your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="row-signup">
                    <label htmlFor="">Confirm Password :</label>
                    <input  type="password" required placeholder="Write your password again" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <div className="row-signup">
                    <label htmlFor="">Birthdate :</label>
                    <input type="date" required placeholder="Write your Birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)}/>
                </div>

                { password === confirm_password ? null : <p className="confirm-pass">Write Confirm Password agian</p> }

                </div>

                <button type="submit" className="signup-btn">SignUp</button>

            </form>
        </div>
    )
}

export default SignUp
