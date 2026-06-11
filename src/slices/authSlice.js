import { createSlice } from "@reduxjs/toolkit";
const initialState={
    token:localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null,
    loading:false,
    signUpData:{},
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
    editProfile:false,
    profile:{},
    editPassword:false
}

const authSlice=createSlice({
    initialState:initialState,
    name:'auth',
    reducers:{
        setToken(state,action){
            state.token=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        },
        setSignUpData(state,action){
            state.signUpData=action.payload
        },
        setUser(state,action){
            state.user=action.payload
        },
        setEditProfile(state,action){
            state.editProfile=action.payload
        },
        setProfile(state,action){
            state.profile=action.payload
        },
        setEditPassword(state,action){
            state.editPassword=action.payload
        }
        
        
    }
})

export const {setToken,setLoading,setSignUpData,setUser,setEditProfile,setProfile,setEditPassword} = authSlice.actions
export default authSlice.reducer;