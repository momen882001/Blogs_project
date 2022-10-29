import React from 'react'
import {Outlet} from 'react-router'
import Login from './Login/Login';


const ProtectedRoutes = () => {
  return localStorage["auth-token"] !== undefined ? <Outlet/> : <Login/>;
  
}

export default ProtectedRoutes