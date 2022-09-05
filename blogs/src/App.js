import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Blog from './Components/Add-Blog/Blog.jsx'
import User from './Components/User/User';


function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/blog" element={<Blog/>}/>
         <Route path="/User" element={<User/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
