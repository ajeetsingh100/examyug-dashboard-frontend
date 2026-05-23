import { createSlice } from "@reduxjs/toolkit";

const initialState={
    booksetLoading:false
}

const booksetSlice=createSlice({
    name:'bookset',
    initialState:initialState,
    reducers:{
        setLoading(state,action){
            state.booksetLoading=action.payload
        }
    }
})

export const { setLoading}=booksetSlice.actions
export default booksetSlice.reducer