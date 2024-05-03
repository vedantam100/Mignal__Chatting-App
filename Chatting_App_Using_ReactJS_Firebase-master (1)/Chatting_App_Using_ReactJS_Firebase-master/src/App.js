import React, { useContext } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import {BrowserRouter, Routes,Route, Navigate} from "react-router-dom"
import { AuthContext } from './Context/AuthContext'

function App() {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRout = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element ={
            <ProtectedRout>
              <Home/>
            </ProtectedRout>
          }/>
          <Route path="login" element ={<Login/>}/>
          <Route path="register" element ={<Register/>}/>


        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App