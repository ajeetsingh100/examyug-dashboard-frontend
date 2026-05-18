import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpeg'
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar bg-body-tertiary border-end ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header d-flex align-items-center justify-content-between p-3 border-bottom" style={{ height: 'var(--header-height)' }}>
        <Link to="/" className="text-decoration-none d-flex align-items-center gap-2 text-body">
          <img src={logo} alt='Examyug24' height={50} width={50} />
          <span className="fs-5 fw-bold">Examyug<span className='text-danger'>24</span></span>
        </Link>
        <button className="btn d-md-none border-0 p-1" onClick={toggleSidebar}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="sidebar-body overflow-y-auto p-3">
        {/* Section 1 */}
        <h6 className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-2" style={{ fontSize: '0.75rem' }}>
          Overview
        </h6>
        <ul className="nav flex-column mb-3 gap-1">
          <li className="nav-item">
            <Link to="/" className="nav-link d-flex  align-items-center gap-3 rounded hover-bg py-2 px-3">
              <i className="bi bi-house-door fs-5"></i>
              <span >Dashboard</span>
            </Link>
          </li>

        </ul>

        {/* Section 2 */}
        <h6 className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4" style={{ fontSize: '0.75rem' }}>
          Course Management
        </h6>
        <div className="accordion accordion-flush bg-transparent" id="sidebarAccordion">
          <div className="accordion-item bg-transparent border-0 mb-1">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed shadow-none bg-transparent text-body d-flex align-items-center rounded hover-bg py-2 px-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#submenu1"
                aria-expanded="false"
                aria-controls="submenu1"
              >
                <div className="d-flex align-items-center gap-3 w-100">
                  <i className="bi bi-mortarboard fs-5"></i>
                  <span>Course</span>
                </div>
              </button>
            </h2>
            <div id="submenu1" className="accordion-collapse collapse" data-bs-parent="#sidebarAccordion">
              <div className="accordion-body p-0 pt-1">
                <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                  <li className="nav-item">
                    <Link to="/course/create-course" className="nav-link text-body py-1 px-3 rounded hover-bg small">Create Course</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/course/view-all-courses" className="nav-link text-body py-1 px-3 rounded hover-bg small">View All Courses</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="accordion-item bg-transparent border-0 mb-1">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed shadow-none bg-transparent text-body d-flex align-items-center rounded hover-bg py-2 px-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#submenu2"
                aria-expanded="false"
                aria-controls="submenu2"
              >
                <div className="d-flex align-items-center gap-3 w-100">
                  <i className="bi bi-grid fs-5"></i>
                  <span>Category</span>
                </div>
              </button>
            </h2>
            <div id="submenu2" className="accordion-collapse collapse" data-bs-parent="#sidebarAccordion">
              <div className="accordion-body p-0 pt-1">
                <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                  <li className="nav-item">
                    <Link to="/category/create-category" className="nav-link text-body py-1 px-3 rounded hover-bg small">Create Category</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/category/view-all-categories" className="nav-link text-body py-1 px-3 rounded hover-bg small">View All Categories</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Book Management */}
        <h6 className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4" style={{ fontSize: '0.75rem' }}>
          Book Management
        </h6>
        <div className="accordion accordion-flush bg-transparent" id="sidebarAccordion">
          <div className="accordion-item bg-transparent border-0 mb-1">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed shadow-none bg-transparent text-body d-flex align-items-center rounded hover-bg py-2 px-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#submenu3"
                aria-expanded="false"
                aria-controls="submenu1"
              >
                <div className="d-flex align-items-center gap-3 w-100">
                  <i className="bi bi-book fs-5"></i>
                  <span>Books</span>
                </div>
              </button>
            </h2>
            <div id="submenu3" className="accordion-collapse collapse" data-bs-parent="#sidebarAccordion">
              <div className="accordion-body p-0 pt-1">
                <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                  <li className="nav-item">
                    <Link to="/book/add-book" className="nav-link text-body py-1 px-3 rounded hover-bg small">Create Book</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/book/view-all-books" className="nav-link text-body py-1 px-3 rounded hover-bg small">View All Books</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="accordion-item bg-transparent border-0 mb-1">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed shadow-none bg-transparent text-body d-flex align-items-center rounded hover-bg py-2 px-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#submenu4"
                aria-expanded="false"
                aria-controls="submenu2"
              >
                <div className="d-flex align-items-center gap-3 w-100">
                  <i className="bi bi-collection fs-5"></i>
                  <span>Bookset</span>
                </div>
              </button>
            </h2>
            <div id="submenu4" className="accordion-collapse collapse" data-bs-parent="#sidebarAccordion">
              <div className="accordion-body p-0 pt-1">
                <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                  <li className="nav-item">
                    <Link to="/book/add-bookset" className="nav-link text-body py-1 px-3 rounded hover-bg small">Create Bookset</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products/add" className="nav-link text-body py-1 px-3 rounded hover-bg small">View All Booksets</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* User Management */}
        <h6 className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4" style={{ fontSize: '0.75rem' }}>
          SOLD PRODUCTS
        </h6>
        <ul className="nav flex-column mb-3 gap-1">
          <li className="nav-item">
            <Link to="/today-sold" className="nav-link d-flex  align-items-center gap-3 rounded hover-bg py-2 px-3">
              <i className="bi bi-cart-check fs-5"></i>
              <span >Today's Sold</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sold-history" className="nav-link d-flex  align-items-center gap-3 rounded hover-bg py-2 px-3">
              <i className="bi bi-clock-history fs-5"></i>
              <span >Sold History</span>
            </Link>
          </li>

        </ul>
      </div>

      <div className="sidebar-footer border-top p-3 mt-auto">
        <ul className="nav flex-column gap-1">
          <li className="nav-item">
            <Link to="/settings" className="nav-link text-body d-flex align-items-center gap-2 rounded hover-bg py-1 px-3 small">
              <i className="bi bi-gear"></i>
              <span>Settings</span>
            </Link>
          </li>
          <li className="nav-item">
            <a href="#!" className="nav-link text-danger d-flex align-items-center gap-2 rounded hover-bg py-1 px-3 small">
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
