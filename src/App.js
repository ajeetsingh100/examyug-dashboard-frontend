
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure bootstrap js is loaded for dropdowns
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

function App() {
  return (
    <DashboardLayout>
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={
         <Dashboard/>
        } />
        {/* Fallback route */}
        <Route path="*" element={<PageNotFound/>} />
          {/* course route */}
          <Route path="/course/">
            <Route path='create-course' element={<AddCourse/>}/>
            <Route path='view-all-courses' element={<ViewAllCourses/>}/>
          </Route>
          {/* category route */}
          <Route path="/categories/" element={<ManageCategories/>}>
            <Route path='course/add-category' element={<CourseCategory/>}/>
            <Route path='book/add-category' element={<BookCategory/>}/>          
          </Route>
            <Route path='/categories/view-all-categories/' element={<ViewAllCategories/>}>
              <Route path='course' element={<ViewAllCourseCategories/>}  />
              <Route path='book' element={<ViewAllBookCategories/>}  />            
            </Route>
          {/* book route */}
           <Route path="/book/">
            <Route path='add-book' element={<AddBook/>}/>
            <Route path='view-all-books' element={<ViewAllBooks/>}/>
          </Route>
          {/* bookset route */}
           <Route path="/bookset/">
            <Route path='add-bookset' element={<AddBookset/>}/>
            <Route path='view-all-booksets'element={<ViewAllBookset/>}/>
          </Route>
          {/* sales route */}
          <Route path="/sales/">
            <Route path='today-sales' element={<TodaySales/>}/>
            <Route path='sales-history' element={<SalesHistory/>}/>
          </Route>
      </Routes>
    </DashboardLayout>
  );
}

export default App;
