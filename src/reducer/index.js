import { combineReducers } from "@reduxjs/toolkit";

import bookReducer from '../slices/bookSlice'
import courseReducer from '../slices/courseSlice'
import booksetReducer from '../slices/booksetSlice'

const rootReducer= combineReducers({
    book:bookReducer,
    course:courseReducer,
    bookset:booksetReducer
})

export default rootReducer