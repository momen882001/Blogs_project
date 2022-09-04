import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from '../API/axios'
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";


function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err,setErr] = useState()
    const navigate = useNavigate();

    const onSubmit = (e) => {
        console.log(email, password)
        // e.preventDefault()

        axios.post('/login', {
            email,
            password
        }).then((response) => {
            console.log("posting data", response)
            navigate('/');
        }).catch((err) => {
            setErr(err.response.data.err)
        })
    };

    return (
        <div className="login">
            <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="h1-login">Login</h1>

                <div className="row-login">
                    <label htmlFor="">Email :</label>
                    <input required  autoFocus type="email"{...register("email", { required: true, pattern: /^[a-zA-Z0-9].+@[a-zA-Z0-9]+\.[A-Za-z]+$/ })} placeholder="Write your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="error">Please Enter Valid Email </p>}
                </div>

                <div className="row-login">
                    <label htmlFor="">Password :</label>
                    <input required  type="password" {...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/ })} placeholder="Write your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {err === "" ? errors.password && <p className="error">Please Enter Valid Password </p> : <p className="error">{err}</p> }
                </div>

                <button className="login-btn" type="submit">Login</button>
                <div id="alternativeLogin">
                <label>Or sign in with:</label>
                <div id="iconGroup">
                <FontAwesomeIcon icon={faGoogle} style={{color:"rgba(34,193,195,1)", cursor:"pointer"}} size="lg"/>
                </div>
                <div  className="links-contain">
                    
                    <Link to="/signup">
                    <p className="p-login">Create an account</p>
                    </Link>
                    
                    
                    <Link to="/">
                    <p className="p-login">Forget password?</p>
                    </Link>
                    
                </div>
            </div>
            </form>
            
        </div>
    )
}

export default Login
