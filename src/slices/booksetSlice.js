import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    searchBarLoader:false,
    relay:false,
    editBookset:false,
    bookset:{}
}

const booksetSlice=createSlice({
    name:'bookset',
    initialState:initialState,
    reducers:{
        setLoading(state,action){
            state.loading=action.payload
        },
         setSearchBarLoader(state,action){
            state.searchBarLoader=action.payload
        },
         setRelay(state,action){
            state.relay=action.payload
        },
         setTableLoader(state,action){
            state.tableLoader=action.payload
        },
        setEditBookset(state,action){
            state.editBookset=action.payload
        },
        setBookset(state,action){
            state.bookset=action.payload
        }

    }
})

export const { setLoading,setSearchBarLoader,setRelay,setTableLoader,setEditBookset,setBookset}=booksetSlice.actions
export default booksetSlice.reducer