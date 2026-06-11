import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const ViewAllCategories = () => {
  const {user}=useSelector(state=>state.auth)
  
  return (
    <div>
        <ul class="nav nav-tabs">
           {['super-admin','admin','course-manager'].includes(user.role) &&<li class="nav-item">
                 <NavLink  className='nav-link' to={'/categories/view-all-categories/course'}>Course</NavLink>
           </li>}
           {['super-admin','admin','book-manager'].includes(user.role)&& <li class="nav-item">
                <NavLink  className='nav-link' to={'/categories/view-all-categories/book'}>Book</NavLink>
            </li>}
        </ul>       
        <Outlet/>

    </div>
  )
}

export default ViewAllCategories