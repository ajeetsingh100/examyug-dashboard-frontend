import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { SERVER_API } from "../api"

export const addCategory=(formData)=>{
    return async()=>{
        const toastID=toast.loading('Adding category please wait...')
        try {
<<<<<<< HEAD
            await apiconnector('post','https://examyug-dashboard-backend.onrender.com/api/v1/book/book-category/add-category',formData)
=======
            await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/book/book-category/add-category`,formData)
            toast.success('Category is created successfully',{id:toastID})
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.log('add category API',error)
        }
    }
}

export const addCategory=(formData)=>{
    return async()=>{
        const toastID=toast.loading('Adding category please wait...')
        try {
            await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/book/book-category/add-category`,formData)
>>>>>>> 7ea2271 (all changes saved)
            toast.success('Category is created successfully',{id:toastID})
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.log('add category API',error)
        }
    }
}
