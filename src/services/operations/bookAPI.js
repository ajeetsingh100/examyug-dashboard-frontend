import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { setLoading } from "../../slices/bookSlice"

export const addBook=(formData)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Adding your book please wait....')
        dispatch(setLoading(true))
        try {
            await apiconnector('post','https://code-catalyst-backend.onrender.com/api/v1/book/add-book',formData)
            toast.success('Your book is added successfully!!!',{id:toastID})
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.error('addBook API',error)
        }
        dispatch(setLoading(false))   
    }
}

export const editBook=(formData)=>{
    return async()=>{
        const toastID=toast.loading('Updating your book please wait...')
        try {
            await apiconnector('patch','https://code-catalyst-backend.onrender.com/api/v1/book/edit-book',formData)        
            toast.success('Your Book details updated successfully',{id:toastID})
        } catch (error) {
            toast.error("Error while updating book details",{id:toastID})
            console.error('editBook API',error)
        }
    }
}