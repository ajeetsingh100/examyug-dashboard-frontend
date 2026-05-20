import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"

export const addCategory=(formData)=>{
    return async()=>{
        const toastID=toast.loading('Adding category please wait...')
        try {
            await apiconnector('post','https://examyug-dashboard-backend.onrender.com/api/v1/book/book-category/add-category',formData)
            toast.success('Category is created successfully',{id:toastID})
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.log('add category API',error)
        }
    }
}
