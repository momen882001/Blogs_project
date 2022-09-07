import React , {useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import shopping from './assets/pexels-cottonbro-4068314.jpg'
import art from './assets/pexels-daian-gan-102127.jpg'
import travel from './assets/pexels-sheila-731217.jpg'
import development from './assets/pexels-lukas-574071.jpg'
import sports from './assets/pexels-pixabay-235922.jpg'
import axios from './API/axios'

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

    
    const Logout = () => {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("author")
        console.log("removed")
        window.location.reload();
    }

    const allArr = data.map((data,index) => {
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
                   {/* <Card.Header>{author}</Card.Header> */}
                   <Card.Header>{data.category}</Card.Header>
                   {/* <Card.Header>{localStorage.getItem("author")}</Card.Header> */}
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
        <div className="home">
            <Container>
                <Row>
                    { localStorage["auth-token"] !== undefined ?
               
               <Col>
               <button onClick={Logout}>Logout</button>
               </Col>

                    :
                    
                    <>
                    <Col>

                        <Link to="/login">
                            Login
            </Link>
                    </Col>

                    <Col>
                        <Link to="/signup">
                            signup
            </Link>
                    </Col> 
                    </>
                    
                    }


                    <Col>
                        <button>
                            <Link to="/blog">
                                Add Blog
                </Link>
                        </button>
                    </Col>

                </Row>
        <Row style={{margin : "0", padding:"0" }}>
        <div className="div-user-row">
            {allArr}
        </div>
        </Row>
            </Container>

        </div>
    )
}

export default Home
