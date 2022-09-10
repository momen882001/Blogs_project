import React, {useEffect,useState} from 'react'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from '../API/axios'
import './User.css'
import shopping from '../assets/pexels-cottonbro-4068314.jpg'
import art from '../assets/pexels-daian-gan-102127.jpg'
import travel from '../assets/pexels-sheila-731217.jpg'
import development from '../assets/pexels-lukas-574071.jpg'
import sports from '../assets/pexels-pixabay-235922.jpg'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


function User() {

    const [data,setData] = useState([]);
    
    useEffect(() => {
       axios.get(`/blog/?userId=${localStorage.getItem("user_id")}`)
       .then((response) => {
           console.log("Getting data", response.data)
           setData(response.data)
           console.log(response)
       }).catch((err) => {
           console.log(err)
       })
    }, [])

    const Delete = (id) => {
        axios.delete(`/blog/${id}`, {
            headers:{
                "auth-token" : localStorage.getItem("auth-token")
            }
        })
    .then((response) => {
        console.log("Deleting data", response)
        console.log(id)
        window.location.reload();
    }).catch((err) => {
        // if(err === 500)
        console.log(err.respons.data.status)
    })
    }

    const Clear = () => {
        axios.delete('/blog', {
            headers:{
                "auth-token" : localStorage.getItem("auth-token")
            }
        })
    .then((response) => {
        console.log("Clearing data", response)
        window.location.reload();
    }).catch((err) => {
        // if(err === 500)
        console.log(err.respons.data.status)
    })
    }

//    function Blog_idStore(id) {
//        console.log(id)
//    }

    const arr = data.map((data,index) => {
        console.log(index)
        return(
            <>
            
            <Col id="user-column" className="col-4" xs={12} sm={6} md={6} lg={4}  >
                <div className="card-contain">
                 <Card className="user-card" style={{height:"100%",}}>
                 
                   { data.category === "Shopping" ? (<Card.Img variant="top" src={shopping} style={{height:"12rem"}} />) 
                   : data.category === "Art" ? (<Card.Img variant="top" src={art} style={{height:"12rem"}}/>) 
                   : data.category === "Development" ? (<Card.Img variant="top" src={development} style={{height:"12rem"}}/>)
                   : data.category === "Sports" ? (<Card.Img variant="top" src={sports} style={{height:"12rem"}}/>)
                   : data.category === "Travel" ? (<Card.Img variant="top" src={travel} style={{height:"12rem"}}/>)
                   : null}
                   <Card.Header>{data.category}</Card.Header>
                   <Card.Body >
                   <Card.Title>{data.title}</Card.Title>
                   <Card.Text>{data.body}</Card.Text>
                   <Button variant="primary" onClick={() => Delete(data._id)}>Delete</Button>
                   <Link to="/Edit" style={{textDecoration:"none", paddingRight:"0"}}>
                   <Link to={`/blog/edit/${data._id}`}>   
                   <Button variant="primary">Edit</Button>
                   </Link>
                   </Link>
                   </Card.Body>
                 </Card>
                 </div>
            </Col>
            
            </>
        )
    })

    return (
        <div className="user-contain">
            <div className="welcome-contain">
            <h1 className="user-h1">Welcome,{localStorage.getItem("author")}</h1>
            <Link to="/blog" style={{textDecoration:"none", display:"inline-block"}}>
            <button className="user-btn" type="submit">
                Add-Blog
                </button>
            </Link>
            <button className="user-btn" type="submit" onClick={() => Clear()} >
                Clear
                </button>
            </div>
        <Row style={{margin : "0", padding:"0" }}>
        <div className="div-user-row">
            {arr}
        </div>
        </Row>
        </div>
    )
}


export default User
