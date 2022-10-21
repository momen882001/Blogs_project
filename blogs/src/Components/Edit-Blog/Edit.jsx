import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from '../API/axios'
import { useParams } from 'react-router-dom'
import NavBar from '../navBar/NavBar'
import imgRight from '../assets/Post-pana.png'


function Edit() {

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const { blog_id } = useParams()


    useEffect(() => {
        axios.get(`/blog/${blog_id}`)
            .then((response) => {
                console.log("Getting data", response.data)
                setTitle(response.data.title)
                setCategory(response.data.category)
                setBody(response.data.body)
            }).catch((err) => {
                console.log(err)
            })
    }, [blog_id])




    const edit = (e) => {
        console.log(category, title, body)
        e.preventDefault()

        axios.put(`/blog/${blog_id}`, {
            category,
            title,
            body
        }, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        }).then((response) => {
            console.log("Editting data", response)
            navigate('/sidebar/user');
        }).catch((err) => {
            setErr(err.response.data.err)
        })
    };



    return (
        <>
            <NavBar />
            <div className="login">


                <section className='main'>
                <div className="login-container">
                <p className="title" >Edit-Blog</p>
                <div className="separator" style={{ margin: "5px", width: "150px", marginTop: "-7px", marginBottom: "20px", backgroundColor: "rgb(64 123 255)" }}></div>

                <form className="blog-form" onSubmit={edit}>
                    <div className="row-blog">
                        <label htmlFor="blog-names">Choose Category:</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} name="blog-names" id="blog-names">
                            <option value="" disabled selected hidden></option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Development">Development</option>
                            <option value="Sports">Sports</option>
                            <option value="Art">Art</option>
                        </select>
                    </div>

                    <div className="row-blog">
                        <label>Title :</label>
                        <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Write your title" />
                    </div>

                    <div className="row-blog">
                        <label>Body :</label>
                        <textarea required value={body} onChange={(e) => setBody(e.target.value)} id="textArea-blog" name="textArea-blog" rows="4" cols="50"  >

                        </textarea>
                    </div>
                    {err ? <p className="error-blog">{err}</p> : null}

                    <button className="blog-btn" type="submit">Edit</button>
                </form>
                </div>
                </section>

                <section className="side" style={{ padding: "0", margin: "0" }}>
                    <img src={imgRight} alt="" size="2x" style={{ padding: "0", margin: "0" }} />
                </section>
            </div>
        </>
    )
}

export default Edit
