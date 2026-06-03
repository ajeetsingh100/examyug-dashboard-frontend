import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { SERVER_API } from "../api"

export const addCategory=(formData,navigate)=>{
    return async (dispatch)=>{
        const toastID=toast.loading('Please wait, category is being added...')
        try {
            const response=await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/course/categories/add-category`,formData)
            toast.success('Category added successfully',{id:toastID})
            if(response.data.success){
                navigate('/course/categories/view-all-categories')
            }
        } catch (error) {
            console.log('addCategories API',error)
            console.log('Error while adding category',{id:toastID})
        
        }
    }
}