import { combineReducers } from "@reduxjs/toolkit";

import bookReducer from '../slices/bookSlice'
import courseReducer from '../slices/courseSlice'

const rootReducer= combineReducers({
    book:bookReducer,
    course:courseReducer
})

export default rootReducer