import React, { useState, useRef, useEffect } from 'react'
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from 'axios'

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        console.log(email,password)
        // e.preventDefault()

        axios.post('/login' , {
             email,
             password
        }).then((response) => {
            console.log("posting data" , response)
            navigate('/');
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>

                <div className="login-input">
                    <label htmlFor="">Email :</label>
                    <input autoFocus type="email"{...register("email", { required: true, pattern: /^[a-zA-Z0-9].+@[a-zA-Z0-9]+\.[A-Za-z]+$/ })} placeholder="write your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="error">Please Enter Valid Email </p>}
                </div>

                <div className="login-input">
                    <label htmlFor="">Password :</label>
                    <input type="password" {...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/ })} placeholder="write Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <p className="error">Please Enter Valid Password </p>}
                </div>

                <button type="submit">Login</button>
            </form>

        </div>
    )
}

export default Login
