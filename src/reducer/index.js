import { combineReducers } from "@reduxjs/toolkit";

import bookReducer from '../slices/bookSlice'
import courseReducer from '../slices/courseSlice'
import booksetReducer from '../slices/booksetSlice'
import courseCategoryReducer from '../slices/courseCategorySlice'
import bookCategoryReducer from '../slices/bookCategorySlice'
import authReducer from '../slices/authSlice'

const rootReducer= combineReducers({
    book:bookReducer,
    course:courseReducer,
    bookset:booksetReducer,
    courseCategory:courseCategoryReducer,
    bookCategory:bookCategoryReducer,
    auth:authReducer
})

export default rootReducer