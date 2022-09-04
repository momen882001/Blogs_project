import React , {useState} from 'react'
import './Blog.css'
import { useNavigate } from "react-router-dom";
import axios from '../API/axios'

function Blog() {
    const [dropDown, setDropDown] = useState('');
    const [title, setTitle] = useState('');
    const [textArea, setTextArea] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        console.log(dropDown,title,textArea)
        e.preventDefault()

        axios.post('', {
           dropDown,
           title,
           textArea
        }).then((response) => {
            console.log("posting data", response)
            navigate('/');
        }).catch((err) => {
            console.log(err.response.data.err)
        })
    };

    return (
        <div className="blog">
            <form className="blog-form" onSubmit={onSubmit}>

                <h1 className="h1-blog">Add Blog</h1>

               <div className="row-blog">
               <label htmlFor="blog-names">Choose Category:</label>
                <select value={dropDown} onChange={(e) => setDropDown(e.target.value)} name="blog-names" id="blog-names">
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Development">Development</option>
                    <option value="Sports">Sports</option>
                    <option value="Art">Art</option>
                </select>
               </div>

               <div className="row-blog">
               <label>Title :</label>   
               <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Write your title" />
               </div>

               <div className="row-blog">
               <label>Body :</label>
               <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)} id="textArea-blog" name="textArea-blog" rows="4" cols="50"  >
                    
                </textarea>
               </div>

               <button className="blog-btn" type="submit">Save</button>


            </form>
        </div>
    )
}

export default Blog
