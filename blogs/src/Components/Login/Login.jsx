import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from '../API/axios'
import './Login.css'
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faAt } from "@fortawesome/free-solid-svg-icons";
import imgLeft from '../assets/Blog Post.png'



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
            // navigate('/sidebar/user');
            navigate('/');
            localStorage.setItem("auth-token" , response.data.token)
            localStorage.setItem("user_id" , response.data._id)
            localStorage.setItem("author" , response.data.name)
            console.log(response.data)
        }).catch((err) => {
            setErr(err.response.data.err)
            console.log(err.response.data.err)
        })
    };
    const googleAuth = () => {
		window.open(
			// `http://localhost:8080/auth/google/callback`,
			`http://localhost:4000/api/auth/google/callback`,
			"_self"
		);
	};

    return (

    <div className="login" style={{padding:"0",margin:"0"}}>

    <section className="side" style={{padding:"0", margin:"0"}}>
        <img src= {imgLeft} alt="" size="2x" style={{padding:"0", margin:"0"}}/>
    </section>

    <section className="main" style={{padding:"0", margin:"0"}}>
        <div className="login-container">
            <p className="title" >Welcome back</p>
            <div className="separator"></div>
            <p className="welcome-message">Please, provide login credential to proceed and have access to all our services</p>

            <form class="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div class="form-control">
                    <input type="email" required placeholder="Email" autoFocus {...register("email", { required: true, pattern: /^[a-zA-Z0-9].+@[a-zA-Z0-9]+\.[A-Za-z]+$/ })} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <FontAwesomeIcon className="icon" icon={faAt} color="white" size="2x"/>
                    {errors.email && <p className="error">Please Enter Valid Email </p>}
                </div>
                <div class="form-control">
                    <input type="password" placeholder="Password" required {...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/ })} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <FontAwesomeIcon className="icon" icon={faLock} color="white" size="2x" style={{top: "30%"}} />
                    {err === "" ? errors.password && <p className="error">Please Enter Valid Password </p> : <p className="error">{err}</p> }
                </div>
                <button className="submit">Login</button>
                <div className="other">
                <Link to="">
                  Forget Password?
                  </Link>
                  <Link to="/signUp">
                  Create an account ?
                  </Link>
                </div>
            </form>
        </div>
    </section>
    </div>
    )
}

export default Login
