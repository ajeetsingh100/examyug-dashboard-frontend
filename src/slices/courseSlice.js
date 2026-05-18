import { createSlice } from "@reduxjs/toolkit";

const initialState={
    editCourse:false,
    allCourse:localStorage.getItem('allCourse')?JSON.parse(localStorage.getItem('allCourse')):null,
    loading:false
}

const courseSlice=createSlice({
    name:'course',
    initialState:initialState,
    reducers:{
        setAllCourse(state,action){
            state.allBooks=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        }
    }
})

export const { setAllCourse,setLoading}=courseSlice.actions
export default courseSlice.reducer