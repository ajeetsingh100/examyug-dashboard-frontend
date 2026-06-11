import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RoleBasedProtectedRoutes = ({children,allowedRoles}) => {
    const {user,token}=useSelector(state=>state.auth)
    console.log(user.role)
    console.log(allowedRoles)
    if(!token){
        return <Navigate to={'/login'}/>
    }
    if(!allowedRoles.includes(user?.role)){
        return <Navigate to={'/unauthorized'}/>
    }

  return children
}

export default RoleBasedProtectedRoutes