import React, { useState } from "react";
import "./SideBar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import { IconContext } from "react-icons";
// import Admin from "../AdminPage/images/admin.png";
// import Table from "../Table/Table";

function SideBar() {
  const [sidebar, setSidebar] = useState(true);

  function showSidebar() {
    setSidebar(!sidebar);
    console.log("momen");
  }

  // function close() {
  //     if(sidebar === true) {
  //         setSidebar(false);
  //     }
  //     console.log('momen')
  //  }

  return (
    <IconContext.Provider value={{ color: "black" }}>
      <div className="navbar-admin">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav
        className={sidebar ? "nav-menu active" : "nav-menu"}
        style={{ display: sidebar === true ? "block" : "none" }}
      >
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {/* <img src={Admin} alt="" /> */}
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path} className="choices">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div
        className="akwa"
        style={{ display: sidebar === false ? "block" : "none" }}
      >
        <div className="icon-flex">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className="icons">
                <Link to="/">{item.icon}</Link>
              </li>
            );
          })}
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default SideBar;