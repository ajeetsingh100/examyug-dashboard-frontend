import { createSlice } from "@reduxjs/toolkit";



const initialState={
    editBook:false,
    book:localStorage.getItem('book')?JSON.parse(localStorage.getItem('book')):null,
    loading:false,
    tableLoader:false,
    searchBarLoader:false,
    relay:false,
    navigated:false
}

const bookSlice=createSlice({
    name:'book',
    initialState:initialState,
    reducers:{
        setBook(state,action){
            state.book=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        },
        setTableLoader(state,action){
            state.tableLoader=action.payload
        },
        setSearchBarLoader(state,action){
            state.searchBarLoader=action.payload
        },
        setRelay(state,action){
            state.relay=action.payload
        },
        setEditBook(state,action){
            state.editBook=action.payload
        },
        setNavigated(state,action){
            state.navigated=action.payload
        }
    }
})

export const { setAllBook,setLoading,setTableLoader,setRelay,setSearchBarLoader,setEditBook,setBook,setNavigated}=bookSlice.actions
export default bookSlice.reducer