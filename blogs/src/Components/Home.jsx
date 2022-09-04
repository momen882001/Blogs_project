import React from 'react'
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">

            <Link to="/login">
                Login
            </Link>
            
            <Link to="/signup">
                signup
            </Link>

            <button>
                <Link to="/blog">
                Add Blog
                </Link>
            </button>

        </div>
    )
}

export default Home
