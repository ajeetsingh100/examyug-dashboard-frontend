import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    searchBarLoader:false,
    relay:false,
    tableLoader:false,
    editBookset:false
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
        }

    }
})

export const { setLoading,setSearchBarLoader,setRelay,setTableLoader,setEditBookset}=booksetSlice.actions
export default booksetSlice.reducer