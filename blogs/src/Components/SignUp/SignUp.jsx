import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser ,faUnlockKeyhole ,faAt , faCakeCandles} from "@fortawesome/free-solid-svg-icons";
import imgRight from '../assets/register.png'
import axios from '../API/axios'

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState(null);
    const [birthdate, setBirthdate] = useState('');
    const [name, setName] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        console.log(name, email, password, confirm_password, birthdate)
        e.preventDefault()

        axios.post('/user', {
            email,
            password,
            name,
            confirm_password,
            birthdate
        }).then((response) => {
            console.log("posting data", response)
            navigate('/sidebar/user');
            localStorage.setItem("auth-token", response.data.token)
            localStorage.setItem("user_id", response.data._id)
            localStorage.setItem("author", response.data.name)
        }).catch((err) => {
            setErr(err.response.data.err)
        })
    };

    return (                

    <div className="login">
    <section className="main">
        <div className="login-container">
            <p className="title">Sign-Up</p>
            <div className="separator" style={{margin: "5px", width:"200px",marginTop: "-7px",marginBottom: "20px", backgroundColor:"rgb(27 155 133)"}}></div>
            {/* <p className="welcome-message">Please, provide login credential to proceed and have access to all our services</p> */}


            <form class="login-form" onSubmit={onSubmit}>
                <div class="form-control">
                    <input type="text" placeholder="Username" required value={name} onChange={(e) => setName(e.target.value)}/>
                    <FontAwesomeIcon className="icon" icon={faUser} color="white" size="2x"/>
                </div>
                <div class="form-control">
                    <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <FontAwesomeIcon className="icon" icon={faAt} color="white" size="2x" />
                </div>
                <div class="form-control">
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <FontAwesomeIcon className="icon" icon={faUnlockKeyhole} color="white" size="2x" />
                </div>
                {/* {err !== undefined ? <p className="confirm-pass">{err}</p> : null } */}

                <div class="form-control">
                    <input type="password" placeholder="Confirm Password" required value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <FontAwesomeIcon className="icon" icon={faLock} color="white" size="2x" />
                </div>
                <div class="form-control">
                    <input type="date" required value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                    <FontAwesomeIcon className="icon" icon={faCakeCandles} color="white" size="2x" />
                </div>
                {(password === confirm_password || confirm_password === null) && err !== undefined ? <p className="confirm-pass">{err}</p> : <p className="error" style={{marginTop:"-1.32rem", marginBottom: "1.3rem"}}>Write Confirm Password agian</p>}
                <button className="submit" style={{marginTop: "-3px",backgroundColor:"rgb(27 155 133)"}} >Submit</button>
                <div className="other">
                  <Link to="/login">
                  Already have an account ?
                  </Link>
                </div>
            </form>
        </div>
    </section>

    
    <section className="side" >
        <img src= {imgRight} alt="" size="2x" style={{maxWidth: "84%",height:"75vh"}} />
    </section>
    </div>
    )
}

export default SignUp
