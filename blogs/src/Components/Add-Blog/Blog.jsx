import React , {useState} from 'react'
import './Blog.css'
import { useNavigate,Link } from "react-router-dom";
import axios from '../API/axios'

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
        <div className="blog">
            <form className="blog-form" onSubmit={onSubmit}>

                <h1 className="h1-blog">Add Blog</h1>

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

               <div  className="links-contain">
                    
                    <Link to="/" style={{textDecorationColor:"rgba(11,83,148,1)"}}>
                    <p className="p-login">Home</p>
                    </Link>
                    
                    
                    <Link to="/sidebar/user" style={{textDecorationColor:"rgba(11,83,148,1)"}}>
                    <p className="p-login">My-Blogs</p>
                    </Link>
                    
                </div>



            </form>
        </div>
    )
}

export default Blog
