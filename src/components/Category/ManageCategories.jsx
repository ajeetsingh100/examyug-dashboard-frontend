import React, { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const ManageCategories = () => {
    const location=useLocation()
    
  return (
    <div>
      <ul class="nav nav-tabs">
            <li class="nav-item">
                 <NavLink  className='nav-link' to={'/categories/course/add-category'}>Course</NavLink>
           </li>
            <li class="nav-item">
                <NavLink  className='nav-link' to={'/categories/book/add-category'}>Book</NavLink>
            </li>
        </ul>       
        <Outlet/>
    </div>
  )
}

export default ManageCategories