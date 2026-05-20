
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
            <Route path='view-all-course'/>
          </Route>
          {/* category route */}
          <Route path="/category/">
            <Route path='create-category' element={<CourseCategory/>}/>
            <Route path='view-all-category'/>
          </Route>
          {/* book route */}
           <Route path="/book/">
            <Route path='add-book' element={<AddBook/>}/>
            <Route path='view-all-books' element/>
          </Route>
          {/* bookset route */}
           <Route path="/book/">
            <Route path='add-bookset' element={<AddBookset/>}/>
            <Route path='view-all-bookset'/>
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
