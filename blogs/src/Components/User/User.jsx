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
        console.log(index)
        return(
            <>
            
            <Col id="user-column" className="col-4"  >
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
            <button className="user-btn" type="submit">
                <Link to="/blog" style={{textDecoration:"none"}}>
                Add-Blog
                </Link>
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
