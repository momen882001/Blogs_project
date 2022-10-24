import React from "react";
import "./Error.css";
import img404 from "../assets/404 error with a landscape-cuate.png";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="err-contain">
    <div className="button-contain">
      <Link to="/">
        <button className="Home">Home</button>
      </Link>
    </div>
    <div className="img-contain">
      <img className="errImage" src={img404} alt="Not Found" />
    </div>
  </div>
  )
}

export default Error
