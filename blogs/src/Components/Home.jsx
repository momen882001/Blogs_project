import React from 'react'
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <Link to="/login">
                <a>Login</a>
            </Link>
        </div>
    )
}

export default Home
