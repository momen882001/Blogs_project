import React, {useEffect,useState} from 'react'
import axios from '../API/axios'

function User() {

    const [data,setData] = useState([]);

    useEffect(() => {
       axios.get(`/blog/?userId=${localStorage.getItem("user_id")}`)
       .then((response) => {
           console.log("Getting data", response.data)
           setData(response.data)
       }).catch((err) => {
           console.log(err)
       })
    }, [])

    const arr = data.map((data,index) => {
        return(
            <div key={index} >
            <p>{data.author}</p>
            <p>{data.title}</p>
            <p>{data.category}</p>
            <p>{data.body}</p>
            </div>
        )
    })

    return (
        <div>
            {arr}
        </div>
    )
}

export default User
