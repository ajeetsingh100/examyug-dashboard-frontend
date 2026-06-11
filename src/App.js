
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
 // Ensure bootstrap js is loaded for dropdowns
import PageNotFound from './pages/PageNotFound';
import Dashboard from './pages/Dashboard';
import AddCourse from './components/Course/AddCourse';
import AddBook from './components/Book/AddBook'
import AddBookset from './components/Book/AddBookset'
import { Toaster } from 'react-hot-toast';
import CourseCategory from './components/Category/CourseCategory';
import TodaySales from './pages/TodaySales';
import SalesHistory from './pages/SalesHistory';
import ViewAllCourses from './components/Course/ViewAllCourses';
import ManageCategories from './components/Category/ManageCategories';
import BookCategory from './components/Category/BookCategory';
import ViewAllCourseCategories from './components/Category/ViewAllCourseCategories';
import ViewAllBookCategories from './components/Category/ViewAllBookCategories';
import ViewAllCategories from './components/Category/ViewAllCategories';
import ViewAllBooks from './components/Book/ViewAllBooks';
import ViewAllBookset from './components/Book/ViewAllBookset';
import Login from './pages/Login';
import AddUser from './components/User/AddUser';
import ViewAllUsers from './components/User/ViewAllUsers';
import VerifyEmail from './pages/VerifyEmail';
import Unauthorized from './pages/Unauthorized';
import Communication from './pages/Communication';
import ProtectedRoutes from './pages/ProtectedRoutes';
import RoleBasedProtectedRoutes from './pages/RoleBasedProtectedRoutes';
import HomeRedirect from './pages/HomeRedirect';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <div>
       <Toaster position="top-center" reverseOrder={false} />
       <Routes>
       
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized/>}/>
       
        {/* protected routes */}
        <Route path='/' element={<ProtectedRoutes><DashboardLayout/></ProtectedRoutes>}>
            <Route index element={<HomeRedirect allowedRoles={['super-admin','admin']}><Dashboard/></HomeRedirect>}/>
            {/* user route */}
            <Route path="/user/">
              <Route path='add-user' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin']}><AddUser/></RoleBasedProtectedRoutes>}/>
              <Route path='view-all-users' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin']}><ViewAllUsers/></RoleBasedProtectedRoutes>}/>
              <Route path='verify-email' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin']}><VerifyEmail/></RoleBasedProtectedRoutes>}/>
              <Route path='change-password' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin']}><ChangePassword/></RoleBasedProtectedRoutes>}/>

            </Route> 
          {/* course route */}
            <Route path="/course/">
              <Route path='create-course' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','course-manager']}><AddCourse/></RoleBasedProtectedRoutes>}/>
              <Route path='view-all-courses' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','course-manager']}><ViewAllCourses/></RoleBasedProtectedRoutes>}/>
            </Route>
            {/* category route */}
            <Route path="/categories/" element={<ManageCategories/>}>
              <Route path='course/add-category' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','course-manager']}><CourseCategory/></RoleBasedProtectedRoutes>}/>
              <Route path='book/add-category' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','book-manager']}><BookCategory/></RoleBasedProtectedRoutes>}/>          
            </Route>
              <Route path='/categories/view-all-categories/' element={<ViewAllCategories/>}>
                <Route path='course' element={< RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','course-manager']}><ViewAllCourseCategories/></RoleBasedProtectedRoutes>}  />
                <Route path='book' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','book-manager']}><ViewAllBookCategories/></RoleBasedProtectedRoutes>}  />            
              </Route>
            {/* book route */}
            <Route path="/book/">
              <Route path='add-book' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','book-manager']}><AddBook/></RoleBasedProtectedRoutes>}/>
              <Route path='view-all-books' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','book-manager']}><ViewAllBooks/></RoleBasedProtectedRoutes>}/>
            </Route>
            {/* bookset route */}
            <Route path="/bookset/">
              <Route path='add-bookset' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','book-manager']}><AddBookset/></RoleBasedProtectedRoutes>}/>
              <Route path='view-all-booksets'element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','book-manager']}><ViewAllBookset/></RoleBasedProtectedRoutes>}/>
            </Route>
            {/* sales route */}
            <Route path="/sales/">
              <Route path='today-sales' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','book-manager','course-manager']}><TodaySales/></RoleBasedProtectedRoutes>}/>
              <Route path='sales-history' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin','course-manager','book-manager']}><SalesHistory/></RoleBasedProtectedRoutes>}/>
            </Route>
            <Route path='/communication' element={<RoleBasedProtectedRoutes allowedRoles={['super-admin','admin']}><Communication/></RoleBasedProtectedRoutes>}/>
            </Route>
             <Route path="*" element={<PageNotFound/>} /> 
        </Routes>       

    </div>
   );
}

export default App;
