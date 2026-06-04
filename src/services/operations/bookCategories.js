import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { SERVER_API } from "../api"
import { setEditBookCategory } from "../../slices/bookCategorySlice"

export const addCategory=(formData,navigate)=>{
    return async()=>{
        const toastID=toast.loading('Adding category please wait...')
        try {
            await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/book/categories/add-category`,formData)
            toast.success('Category is created successfully',{id:toastID})
            navigate('/categories/view-all-categories/book')
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.log('add category API',error)
        }
    }
}

export const updateCategory=(formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Modifying category details...')
        try {
            const response=await apiconnector('POST',`${SERVER_API.MAIN_SERVER}/api/v1/book/edit-category`,formData)
            toast.success('Course successfully modified',{id:toastID})
            navigate('/categories/view-all-categories/book')
            dispatch(setEditBookCategory(false))
            
        } catch (error) {
            toast.error('Unable to modify course details!!',{id:toastID})
            console.log(error.response.data)
        }
    }
}

