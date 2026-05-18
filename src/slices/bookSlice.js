import { createSlice } from "@reduxjs/toolkit";

const initialState={
    editBook:false,
    allBooks:localStorage.getItem('allBooks')?JSON.parse(localStorage.getItem('allBooks')):null,
    loading:false
}

const bookSlice=createSlice({
    name:'book',
    initialState:initialState,
    reducers:{
        setAllBook(state,action){
            state.allBooks=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        }
    }
})

export const { setAllBook,setLoading}=bookSlice.actions
export default bookSlice.reducer