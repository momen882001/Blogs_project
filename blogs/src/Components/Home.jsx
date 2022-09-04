import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Home() {
    return (
        <div className="home">
            <Container>
                <Row className="justify-content-md-center">

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
