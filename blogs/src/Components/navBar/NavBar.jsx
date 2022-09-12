import React from 'react'
import { Link } from "react-router-dom";
import "./NavBar.css"

function NavBar() {

    const Logout = () => {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("author")
        console.log("removed")
        window.location.reload();
    }

    return (
        <nav className="navbar">
            <div className="container">
         <h3 className="logo">Blog-App</h3>
          
          {localStorage["auth-token"] !== undefined ?
          <ul className="nav-links">
              <Link style={{textDecoration:"none"}} to="/blog"><li>Add-Blog</li></Link>
              <Link style={{textDecoration:"none"}} to="" onClick={Logout}><li>Logout</li></Link>
          </ul>
          :
          <ul className="nav-links">
              <Link style={{textDecoration:"none"}} to="/login"><li>Login</li></Link>
              <Link style={{textDecoration:"none"}} to="/signup"><li>Signup</li></Link>
          </ul>
          }
          </div>
        </nav>
    )
}

export default NavBar
