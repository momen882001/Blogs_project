import React , {useState,useEffect} from 'react'
import axios from '../API/axios'
import {useParams} from 'react-router-dom'
import { response } from 'express';

function ReadMore() {

    const {blog_id} = useParams();
    const [data,setData] = useState();

    useEffect(() => {
        axios.get(`/blog/${blog_id}`)
        .then((response) => {
            console.log("Getting data", response.data)
            setData(response.data)
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
     }, [blog_id])
     console.log(response.data)

    return (
        <div>
            Read More
        </div>
    )
}

export default ReadMore
