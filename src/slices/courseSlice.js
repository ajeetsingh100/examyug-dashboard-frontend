import { createSlice } from "@reduxjs/toolkit";

const initialState={
    editCourse:false,
    course:localStorage.getItem('course')?JSON.parse(localStorage.getItem('course')):null,
    loading:false,
    searchBarLoader:false,
    relay:1,
    tableLoader:false,
    navigated:false
  
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
        setEditCourse(state,action){
            state.editCourse=action.payload
        },
        setCourse(state,action){
            state.course=action.payload
        },
         setNavigated(state,action){
            state.navigated=action.payload
        }
    }
})

export const { setAllCourse,setEditCourse, setLoading, 
    setSearchBarLoader,setRelay,setTableLoader,setCourse,setNavigated}=courseSlice.actions
export default courseSlice.reducer