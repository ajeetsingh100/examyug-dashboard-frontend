import { createSlice } from "@reduxjs/toolkit";

const initialState={
    editBookCategory:false,
    category:{}
    
}

const bookCategorySlice=createSlice({
    name:'bookCategory',
    initialState:initialState,
    reducers:{
        setCategory(state,action){
            state.category=action.payload
        },
         setEditBookCategory(state,action){
            state.editBookCategory=action.payload
        },
    }
})

export const {setCategory,setEditBookCategory }=bookCategorySlice.actions
export default bookCategorySlice.reducer