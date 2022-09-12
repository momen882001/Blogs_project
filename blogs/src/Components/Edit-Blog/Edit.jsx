import React , {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from '../API/axios'
import {useParams} from 'react-router-dom'


function Edit() {

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const {blog_id} = useParams()


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
        console.log(category,title,body)
        e.preventDefault()

        axios.put(`/blog/${blog_id}`, {
           category,
           title,
           body
        },{
            headers:{
                "auth-token" : localStorage.getItem("auth-token")
            }
        }).then((response) => {
            console.log("Editting data", response)
            navigate('/User');
        }).catch((err) => {
           setErr(err.response.data.err)
        })
    };

    

    return (
        <div className="blog">
            <form className="blog-form" onSubmit={edit}>

                <h1 className="h1-blog">Edit Blog</h1>

               <div className="row-blog">
               <label htmlFor="blog-names">Choose Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} name="blog-names" id="blog-names">
                    <option  value="" disabled selected hidden></option>
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
    )
}

export default Edit
