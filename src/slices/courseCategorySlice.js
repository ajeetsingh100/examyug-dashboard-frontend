import { createSlice } from "@reduxjs/toolkit";



const initialState={
    editCourseCategory:false,
    category:{}
    
}

const courseCategorySlice=createSlice({
    name:'courseCategory',
    initialState:initialState,
    reducers:{
        setCategory(state,action){
            state.category=action.payload
        },
         setEditCourseCategory(state,action){
            state.editCourseCategory=action.payload
        },
    }
})

export const {setCategory,setEditCourseCategory }=courseCategorySlice.actions
export default courseCategorySlice.reducer