import React , {useState,useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import shopping from './assets/pexels-cottonbro-4068314.jpg'
import art from './assets/pexels-daian-gan-102127.jpg'
import travel from './assets/pexels-sheila-731217.jpg'
import development from './assets/pexels-lukas-574071.jpg'
import sports from './assets/pexels-pixabay-235922.jpg'
import axios from './API/axios'
import NavBar from './navBar/NavBar';
import { Link } from "react-router-dom";

function Home() {

    const [data,setData] = useState([]);
    // const [author,setAuthor] = useState()

    useEffect(() => {
        axios.get('/blog')
        .then((response) => {
            console.log("Getting All Data", response.data)
            console.log(response.data)
            setData(response.data)
            // setAuthor(response.data.author)
            // console.log(response.data.author)
        }).catch((err) => {
            console.log(err)
        })
     }, [])

    //  useEffect(() => {
    //     AOS.init();
    //     AOS.refresh();
    //   }, []);

    
   

    const allArr = data.map((data,index) => {
        console.log(index)
        return(
            <>
            
            <Col id="user-column" className="col-4" xs={12} sm={6} md={6} lg={4}  >
                <div className="card-contain">
                 <Card className="user-card" style={{height:"100%",}}>
                   <div className="overflow">
                   { data.category === "Shopping" ? (<Card.Img variant="top" src={shopping} style={{height:"12rem"}} />) 
                   : data.category === "Art" ? (<Card.Img variant="top" src={art} style={{height:"12rem"}}/>) 
                   : data.category === "Development" ? (<Card.Img variant="top" src={development} style={{height:"12rem"}}/>)
                   : data.category === "Sports" ? (<Card.Img variant="top" src={sports} style={{height:"12rem"}}/>)
                   : data.category === "Travel" ? (<Card.Img variant="top" src={travel} style={{height:"12rem"}}/>)
                   : null}
                   </div>
                   <Card.Header>{data.category}</Card.Header>
                   <Card.Body >
                   <Card.Title>{data.title}</Card.Title>
                   <Card.Text>{data.body.substr(0,50)}
                   <Link to={`/blog/readmore/${data._id}`}>
                   <div className="btn" style={{ paddingLeft: "5px", border: "transparent" }}>... Read More</div>
                   </Link>
                   </Card.Text>
                   </Card.Body>
                 </Card>
                 </div>
            </Col>
            
            </>
        )
    })

    return (
        <div className="home">
            
                
        <NavBar/>
       
        <Row style={{margin : "0", padding:"0" }}>
        <div className="div-user-row">
            {allArr}
        </div>
        </Row>
            

        </div>
    )
}

export default Home
