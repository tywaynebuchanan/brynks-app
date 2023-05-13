import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const PublicRoute = ({children}) => {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(!token){
          localStorage.clear()
           navigate("/login")
        }
    },[])
  return (
    <div>{children}</div>
  )
}

export default PublicRoute