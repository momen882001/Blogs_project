import React , {useState} from 'react'
import './Blog.css'
import { useNavigate,Link } from "react-router-dom";
import axios from '../API/axios'
import imgLeft from '../assets/Add files-amico.png'
import NavBar from '../navBar/NavBar'

function Blog() {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        console.log(category,title,body)
        e.preventDefault()

        axios.post('/blog', {
           category,
           title,
           body
        },{
            headers:{
                "auth-token" : localStorage.getItem("auth-token")
            }
        }).then((response) => {
            console.log("posting data", response)
            navigate('/sidebar/user');
        }).catch((err) => {
           setErr(err.response.data.err)
        })
    };

    return (
        <>
         <NavBar/>
        <div className="login">
<section className="side" style={{padding:"0", margin:"0"}}>
        <img src= {imgLeft} alt="" size="2x" style={{padding:"0", margin:"0"}}/>
    </section>

            <section className='main'>
            <div className="login-container">
            <p className="title" >Add-Blog</p>
            <div className="separator" style={{margin: "5px", width:"150px",marginTop: "-7px",marginBottom: "20px", backgroundColor:"rgb(64 123 255)"}}></div>

            <form className="blog-form" onSubmit={onSubmit}>
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

               <button className="blog-btn" type="submit">Save</button>

               {/* <div className="other">
                <Link to="/">
                Home
                  </Link>
                  <Link to="/User">
                  My-Blogs
                  </Link>
                </div> */}
            </form>
            </div>
            </section>
        </div>
        </>
    )
}

export default Blog
