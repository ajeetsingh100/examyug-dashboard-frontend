import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = React.useState(null);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user}=useSelector(state=>state.auth)

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  function handleLogout(){
    dispatch(logout(navigate))
  }

  return (
    <aside
      className={`sidebar bg-body-tertiary border-end ${
        isOpen ? 'open' : ''
      }`}
    >
      {/* Header */}
      <div
        className="sidebar-header d-flex align-items-center justify-content-between p-3 border-bottom"
        style={{ height: 'var(--header-height)' }}
      >
        <Link
          to="/"
          className="text-decoration-none d-flex align-items-center gap-2 text-body"
        >
          <img src={logo} alt="Examyug24" height={50} width={50} />

          <span className="fs-5 fw-bold">
            Examyug<span className="text-danger">24</span>
          </span>
        </Link>

        <button
          className="btn d-md-none border-0 p-1"
          onClick={toggleSidebar}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* Body */}
      <div className="sidebar-body overflow-y-auto p-3">
        {/* Overview */}
       {user.role==='super-admin'||user.role==='admin'&& <h6
          className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-2"
          style={{ fontSize: '0.75rem' }}
        >
          Overview
        </h6>}

        {user.role==='super-admin'||user.role==='admin'&&<ul className="nav flex-column mb-3 gap-1">
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link d-flex align-items-center gap-3 rounded hover-bg py-2 px-3"
            >
              <i className="bi bi-house-door fs-5"></i>
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>}
        {/* User Managment */}
        {user.role=='super-admin'&& <h6
          className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4"
          style={{ fontSize: '0.75rem' }}
        >
          User Management
        </h6>}
      {user.role==='super-admin'&&<div
          className="accordion accordion-flush bg-transparent"
          id="sidebarAccordion2"
        >
            <div className="accordion-item bg-transparent border-0 mb-1">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button shadow-none bg-transparent text-body rounded hover-bg py-2 px-3 ${
                    openMenu === 'user' ? '' : 'collapsed'
                  }`}
                  type="button"
                  onClick={() => toggleMenu('user')}
                  aria-expanded={openMenu === 'user'}
                  aria-controls="submenu5"
                >
                  <div className="d-flex align-items-center gap-3 w-100">
                    <i class="bi bi-people fs-5"></i>
                    <span>User</span>
                  </div>
                </button>
              </h2>

              <div
                id="submenu2"
                className={`accordion-collapse collapse ${openMenu === 'user' ? 'show' : ''}`}
              >
                <div className="accordion-body p-0 pt-1">
                  <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                    <li className="nav-item">
                      <Link
                        to="/user/add-user"
                        className="nav-link text-body py-1 px-3 rounded hover-bg small"
                      >
                        Create User
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/user/view-all-users"
                        className="nav-link text-body py-1 px-3 rounded hover-bg small"
                      >
                        View All Users
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>}
      {/* Category Management */}
      <h6
          className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4"
          style={{ fontSize: '0.75rem' }}
        >
          Category Management
        </h6>
      <div
          className="accordion accordion-flush bg-transparent"
          id="sidebarAccordion1"
        >
            <div className="accordion-item bg-transparent border-0 mb-1">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button shadow-none bg-transparent text-body rounded hover-bg py-2 px-3 ${
                    openMenu === 'category' ? '' : 'collapsed'
                  }`}
                  type="button"
                  onClick={() => toggleMenu('category')}
                  aria-expanded={openMenu === 'category'}
                  aria-controls="submenu2"
                >
                  <div className="d-flex align-items-center gap-3 w-100">
                    <i className="bi bi-grid fs-5"></i>
                    <span>Category</span>
                  </div>
                </button>
              </h2>

              <div
                id="submenu1"
                className={`accordion-collapse collapse ${openMenu === 'category' ? 'show' : ''}`}
              >
                <div className="accordion-body p-0 pt-1">
                  <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                    <li className="nav-item">
                      <Link
                        to={`${['super-admin','admin'].includes(user.role)?`/categories/course/add-category`:user.role==='course-manager'?`/categories/course/add-category`:`/categories/book/add-category`}`}
                        className="nav-link text-body py-1 px-3 rounded hover-bg small"
                      >
                        Create Category
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to={`${['super-admin','admin'].includes(user.role)?`/categories/view-all-categories/course`:user.role==='course-manager'?`/categories/view-all-categories/course`:`/categories/view-all-categories/book`}`}
                        className="nav-link text-body py-1 px-3 rounded hover-bg small"
                      >
                        View All Categories
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>       
      
        {/* Course Management */}
        {['admin','super-admin','course-manager'].includes(user.role)&&<h6
          className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4"
          style={{ fontSize: '0.75rem' }}
        >
          Course Management
        </h6>}

        {['admin','super-admin','course-manager'].includes(user.role)&&<div
          className="accordion accordion-flush bg-transparent"
          id="sidebarAccordion3"
        >
          {/* Course */}
          <div className="accordion-item bg-transparent border-0 mb-1">
            <h2 className="accordion-header">
              <button
                className={`accordion-button shadow-none bg-transparent text-body rounded hover-bg py-2 px-3 ${
                  openMenu === 'course' ? '' : 'collapsed'
                }`}
                type="button"
                onClick={() => toggleMenu('course')}
                aria-expanded={openMenu === 'course'}
                aria-controls="submenu1"
              >
                <div className="d-flex align-items-center gap-3 w-100">
                  <i className="bi bi-mortarboard fs-5"></i>
                  <span>Course</span>
                </div>
              </button>
            </h2>

            <div
              id="submenu3"
              className={`accordion-collapse collapse ${openMenu === 'course' ? 'show' : ''}`}
            >
              <div className="accordion-body p-0 pt-1">
                <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                  <li className="nav-item">
                    <Link
                      to="/course/create-course"
                      className="nav-link text-body py-1 px-3 rounded hover-bg small"
                    >
                      Create Course
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/course/view-all-courses"
                      className="nav-link text-body py-1 px-3 rounded hover-bg small"
                    >
                      View All Courses
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>          
        </div>
}
        {/* Book Management */}
      {['admin','super-admin','book-manager'].includes(user.role)&&<h6
        className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4"
        style={{ fontSize: '0.75rem' }}
      >
        Book Management
      </h6>}

       {['admin','super-admin','book-manager'].includes(user.role)&& <div
          className="accordion accordion-flush bg-transparent"
          id="sidebarAccordion4"
        >
          {/* Books */}
          <div className="accordion-item bg-transparent border-0 mb-1">
            <h2 className="accordion-header">
              <button
                className={`accordion-button shadow-none bg-transparent text-body rounded hover-bg py-2 px-3 ${
                  openMenu === 'books' ? '' : 'collapsed'
                }`}
                type="button"
                onClick={() => toggleMenu('books')}
                aria-expanded={openMenu === 'books'}
                aria-controls="submenu3"
              >
                <div className="d-flex align-items-center gap-3 w-100">
                  <i className="bi bi-book fs-5"></i>
                  <span>Books</span>
                </div>
              </button>
            </h2>

            <div
              id="submenu4"
              className={`accordion-collapse collapse ${openMenu === 'books' ? 'show' : ''}`}
            >
              <div className="accordion-body p-0 pt-1">
                <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                  <li className="nav-item">
                    <Link
                      to="/book/add-book"
                      className="nav-link text-body py-1 px-3 rounded hover-bg small"
                    >
                      Create Book
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/book/view-all-books"
                      className="nav-link text-body py-1 px-3 rounded hover-bg small"
                    >
                      View All Books
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bookset */}
          <div className="accordion-item bg-transparent border-0 mb-1">
            <h2 className="accordion-header">
              <button
                className={`accordion-button shadow-none bg-transparent text-body rounded hover-bg py-2 px-3 ${
                  openMenu === 'bookset' ? '' : 'collapsed'
                }`}
                type="button"
                onClick={() => toggleMenu('bookset')}
                aria-expanded={openMenu === 'bookset'}
                aria-controls="submenu4"
              >
                <div className="d-flex align-items-center gap-3 w-100">
                  <i className="bi bi-collection fs-5"></i>
                  <span>Bookset</span>
                </div>
              </button>
            </h2>

            <div
              id="submenu4"
              className={`accordion-collapse collapse ${openMenu === 'bookset' ? 'show' : ''}`}
            >
              <div className="accordion-body p-0 pt-1">
                <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                  <li className="nav-item">
                    <Link
                      to="/bookset/add-bookset"
                      className="nav-link text-body py-1 px-3 rounded hover-bg small"
                    >
                      Create Bookset
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/bookset/view-all-booksets"
                      className="nav-link text-body py-1 px-3 rounded hover-bg small"
                    >
                      View All Booksets
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
}
        {/* Sold Products */}
        <h6
          className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4"
          style={{ fontSize: '0.75rem' }}
        >
          ORDER MANAGMENT
        </h6>

        <ul className="nav flex-column mb-3 gap-1">
          <li className="nav-item">
            <Link
              to="/sales/today-sales"
              className="nav-link d-flex align-items-center gap-3 rounded hover-bg py-2 px-3"
            >
              <i className="bi bi-cart-check fs-5"></i>
              <span>View Orders</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/sales/sales-history"
              className="nav-link d-flex align-items-center gap-3 rounded hover-bg py-2 px-3"
            >
             <i class="bi bi-graph-up-arrow fs-5"></i>
              <span>Sales History</span>
            </Link>
          </li>
        </ul>
      {/* OTHERS */}
        {(user.role==='super-admin'||user.role==='admin')&&<h6
          className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4"
          style={{ fontSize: '0.75rem' }}
        >
          OTHERS
        </h6>}
        {(user.role==='admin'||user.role==='super-admin')&&<ul className="nav flex-column mb-3 gap-1">
          <li className="nav-item">
            <Link
              to="/communication"
              className="nav-link d-flex align-items-center gap-3 rounded hover-bg py-2 px-3"
            >
              <i class="bi bi-chat-left-dots"></i>
              <span>Communication</span>
            </Link>
          </li>
        </ul>}
      </div>

      {/* Footer */}
      <div className="sidebar-footer border-top p-3 mt-auto">
        <ul className="nav flex-column gap-1">
          <li className="nav-item">
            <Link
              to="/settings"
              className="nav-link text-body d-flex align-items-center gap-2 rounded hover-bg py-1 px-3 small"
            >
              <i className="bi bi-gear"></i>
              <span>Settings</span>
            </Link>
          </li>

          <li className="nav-item" onClick={handleLogout}>
            <a
              href="#!"
              className="nav-link text-danger d-flex align-items-center gap-2 rounded hover-bg py-1 px-3 small"
            >
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