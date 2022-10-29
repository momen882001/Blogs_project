import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Blog from './Components/Add-Blog/Blog.jsx'
import User from './Components/User/User';
import Edit from './Components/Edit-Blog/Edit';
import ReadMore from './Components/ReadMorePage/ReadMore';
import SideBar from './Components/SideBar/SideBar';
import Error from './Components/Error_page/Error';
import ProtectedRoutes from './Components/ProtectedRoutes';
// import Test from './Components/SideBar/SideBar';


function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/blog" element={<Blog/>}/>
         <Route element={<ProtectedRoutes/>}>
         <Route path="/User" element={<User/>}/>
         <Route path="/blog/edit/:blog_id" element={<Edit/>}/>
         </Route>
         <Route path="/blog/readmore/:blog_id" element={<ReadMore/>}/>
         <Route path="/sidebar/user" element={<SideBar/>}/>
         <Route path="*" element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
