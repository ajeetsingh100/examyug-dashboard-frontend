import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const ViewAllCategories = () => {
  return (
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                 <NavLink  className='nav-link' to={'/categories/view-all-categories/course'}>Course</NavLink>
           </li>
            <li class="nav-item">
                <NavLink  className='nav-link' to={'/categories/view-all-categories/book'}>Book</NavLink>
            </li>
        </ul>       
        <Outlet/>

    </div>
  )
}

export default ViewAllCategories