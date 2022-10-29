import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

function NavBar() {

    const [isOpen, setIsOpen] = useState(false);

    const Logout = () => {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("author")
        console.log("removed")
        window.location.reload();
    }

    return (

         <div className="Navbar">
         <Link style={{color:"white"}} to="/">
         <span className="nav-logo" style={{color: "white", paddingLeft: "2rem", fontSize: "25px"}}>Blogs</span>
         </Link>
         <div className={`nav-items ${isOpen && "open"}`}>
         {localStorage["auth-token"] !== undefined ?
          <>
           <Link to="/blog" className="LCN">Add-Blog</Link>
           <Link to="/User" >My-Blogs</Link>
           <Link to="" onClick={Logout} >Logout</Link>
           </>
           :
           <>
           <Link to="/login" >Login</Link>
           <Link to="/signup" >SignUp</Link>
           </>
          }
         </div>
         <div
           className={`nav-toggle ${isOpen && "open"}`}
           onClick={() => setIsOpen(!isOpen)}
         >
           <div className="bar"></div>
         </div>
       </div>
    )
}

export default NavBar



