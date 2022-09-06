import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Home() {

    const Logout = () => {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("author")
        console.log("removed")
        window.location.reload();
    }
    console.log(localStorage.token !== undefined)

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

                    {/* <Col>

                        <Link to="/login">
                            Login
            </Link>
                    </Col>

                    <Col>
                        <Link to="/signup">
                            signup
            </Link>
                    </Col>

                    <Col>
                    <button onClick={Logout}>Logout</button>
                    </Col> */}

                    <Col>
                        <button>
                            <Link to="/blog">
                                Add Blog
                </Link>
                        </button>
                    </Col>

                </Row>
            </Container>

        </div>
    )
}

export default Home
