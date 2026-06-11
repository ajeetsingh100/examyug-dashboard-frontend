import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const HomeRedirect = ({children,allowedRoles}) => {
    const {user}=useSelector(state=>state.auth)
    if(allowedRoles.includes(user.role)){
        return children
    }else if(user.role==='course-manager'){
        return <Navigate to={'/course/view-all-courses'}/>
    }else if(user.role==='book-manager'){
        return <Navigate to={'/book/view-all-books'} />
    }
    return <Navigate to={'/unauthorized'}/>
}

export default HomeRedirect