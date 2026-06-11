import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { setToken,setLoading,setUser, setEditProfile, setProfile, setEditPassword } from "../../slices/authSlice"
import {SERVER_API} from '../api'
export const login=(formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading("Signing in")
        try {
            const response=await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/user/login`,formData)
            console.log('login successfull',response)
            console.log(response.data.success)
            toast.success('Login successfull',{toastID})
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/")
        } catch (error) {
            console.log(error.response.message)
            toast.error(error.response.data.message)
        }
       toast.dismiss(toastID)

    }
}
export const logout=(navigate)=>{
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("user")
        localStorage.removeItem('token')
        toast.success("logged out")
        navigate('/login')
    }
}

export const sendOTP=(email,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        const toastID=toast.loading('sending otp please wait...')
        try {
            const response=await apiconnector("POST",`${SERVER_API.MAIN_SERVER}/api/v1/user/sendotp`,{
                email
            })
            console.log('hello',response)
            toast.success('otp send successfully',{id:toastID})
            console.log('otp send successfully',response)
            navigate('/user/verify-email')
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.log(error.response.data.error)         
            
            
        }   
        dispatch(setLoading(false))
        
    }
}

export const resetPasswordToken=(email,setSentEmail,setEmail)=>{
    return async(dispatch)=>{
        const toastID=toast.loading("Sending Email...")
        dispatch(setLoading(true))
        try {
            const response=await apiconnector('POST','http://localhost:4000/api/v1/user/reset-password-token',{
                email
            })
            console.log(response)
            setSentEmail(true)
            setEmail(email)
            toast.success('Email Sent Successfully',{id:toastID})
        } catch (error) {
            toast.error("Unable to Send Email!!!",{id:toastID})
            console.log(error.response.message)
        }
        dispatch(setLoading(false))
    }
}

export const resetPassword=(pass,confirmPass,token,setPassChange)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('please wait...')        
        try {
            const response=await apiconnector('POST','http://localhost:4000/api/v1/user/reset-password',{
                pass,
                confirmPass,
                token
            })
            console.log(response)
            toast.success('password reset successfully',{id:toastID})
            setPassChange(true)
               

        } catch (error) {
            toast.error('unable to reset password',{id:toastID})
             console.log(error.response.message)
        }
    }
}

export const signUp=(signUpData,otp,navigate)=>{
    return async(dispatch)=>{        
        dispatch(setLoading(true))
        const toastID=toast.loading('adding user please wait....')
        try {
            const response=await apiconnector('POST',`${SERVER_API.MAIN_SERVER}/api/v1/user/signup`,{
                ...signUpData,
                otp
            })
            console.log(response)
            toast.success("Congratulations! User is created in database",{id:toastID})            
            navigate('/user/add-user')
            } catch (error) {
            toast.error(error.response.data.message,{id:toastID}) 
            console.log(error.response.data.message)
        }
        dispatch(setLoading(false))        
    }
}

export const updateUserDetails = (formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading(`Updating user details please wait...`)
        try {
            await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/user/edit-user-details`,formData)
            toast.success("User details updated successfully",{id:toastID})                    
            navigate('/user/view-all-users')
            dispatch(setEditProfile(false))
            dispatch(setProfile({}))

        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.error(error)
        }
    }
}

export const sendOTPForUserPasswordChange=(email,navigate)=>{
    return async(dispatch)=>{
        
        const toastID=toast.loading('sending otp please wait...')
        try {
            const response=await apiconnector("POST",`${SERVER_API.MAIN_SERVER}/api/v1/user/send-otp-pass-change`,{
                email
            })
            console.log('hello',response)
            toast.success('otp send successfully',{id:toastID})
            console.log('otp send successfully',response)
            navigate('/user/verify-email')
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.log(error)  
        }   
      
        
    }

}
export const verifyOTP=(otp,email,navigate)=>{
    return async()=>{
        const toastID=toast.loading('verifying your otp please wait...')
        try {
            await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/user/verify-otp`,{otp, email})
            toast.success('OTP verified successfully',{id:toastID})
            navigate('/user/change-password')
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.log(error)
        }
    }

}

export const updateUserPassword= (email,newPass,confirmPass,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Updating user password please wait...')
        try {
            await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/user/change-user-password`,{
                email,
                newPass,
                confirmPass
            })
            toast.success('password updated successfully',{id:toastID})           
            dispatch(setProfile({}))
            dispatch(setEditPassword(false))
            navigate('/user/view-all-users')
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.error(error)            
        }
    }
}

export const deleteUser= (userID,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Deleting user please wait...')
        try {
            const response=await apiconnector('delete',`${SERVER_API.MAIN_SERVER}/api/v1/user/delete-user`,{userID})      
            toast.success('user deleted successfully',{id:toastID})
            return response
           
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            throw error          
        }
    }
}