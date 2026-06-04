import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { SERVER_API } from "../api"
import { setEditCourseCategory } from "../../slices/courseCategorySlice"

export const addCategory=(formData,navigate)=>{
    return async (dispatch)=>{
        const toastID=toast.loading('Please wait, category is being added...')
        try {
            const response=await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/course/categories/add-category`,formData)
            toast.success('Category added successfully',{id:toastID})
            if(response.data.success){
                navigate('/categories/view-all-categories/course')
            }
        } catch (error) {
            console.log('addCategories API',error)
            console.log('Error while adding category',{id:toastID})
        
        }
    }
}

export const updateCategory=(formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Modifying category details...')
        try {
            const response=await apiconnector('POST','http://localhost:4000/api/v1/course/edit-category',formData)
            toast.success('Course successfully modified',{id:toastID})
            navigate('/categories/view-all-categories/course')
            dispatch(setEditCourseCategory(false))
            
        } catch (error) {
            toast.error('Unable to modify course details!!',{id:toastID})
            console.log(error.response.data)
        }
    }
}