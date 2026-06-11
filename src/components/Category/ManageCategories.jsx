import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const ManageCategories = () => {
    const location=useLocation()
    const {user}=useSelector(state=>state.auth)
    
  return (
    <div>
      <ul class="nav nav-tabs">
            {['super-admin','admin','course-manager'].includes(user.role)&&<li class="nav-item">
                 <NavLink  className='nav-link' to={'/categories/course/add-category'}>Course</NavLink>
           </li>}
            {['super-admin','admin','book-manager'].includes(user.role)&&<li class="nav-item">
                <NavLink  className='nav-link' to={'/categories/book/add-category'}>Book</NavLink>
            </li>}
        </ul>       
        <Outlet/>
    </div>
  )
}

export default ManageCategories