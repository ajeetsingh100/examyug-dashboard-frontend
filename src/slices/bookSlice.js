import { createSlice } from "@reduxjs/toolkit";



const initialState={
    editBook:false,
    allBooks:localStorage.getItem('allBooks')?JSON.parse(localStorage.getItem('allBooks')):null,
    loading:false,
    tableLoader:false,
    searchBarLoader:false,
    relay:false
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
        }
    }
})

export const { setAllBook,setLoading,setTableLoader,setRelay,setSearchBarLoader,setEditBook}=bookSlice.actions
export default bookSlice.reducer