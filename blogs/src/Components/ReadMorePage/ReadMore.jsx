import React , {useState,useEffect} from 'react'
import axios from '../API/axios'
import {useParams} from 'react-router-dom'

function ReadMore() {

    const {blog_id} = useParams();
    const [data,setData] = useState();
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        axios.get(`/blog/${blog_id}`)
        .then((response) => {
            console.log("Getting data", response.data)
            setBody(response.data.body)
            setTitle(response.data.title)
            setCategory(response.data.category)
            setCreatedAt(response.data.createdAt)
            setAuthor(response.data.author)
        }).catch((err) => {
            console.log(err)
        })
     }, [blog_id])


    return (
        <div>
            <p>{author}</p>
            <p>{category}</p>
            <p>{title}</p>
            <p>{body}</p>
            <p>{createdAt}</p>
        </div>
    )
}

export default ReadMore
