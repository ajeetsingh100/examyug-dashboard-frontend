import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { setLoading } from "../../slices/courseSlice"


export const addCourse=(formData)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Adding your course please wait.....')
        dispatch(setLoading(true))
        try {
            await apiconnector('post','https://examyug-dashboard-backend.onrender.com/api/v1/course/add-course',formData)
            toast.success('Course is added successfully!!!',{id:toastID})
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.error('add-course API ',error)
        }
        dispatch(setLoading(false))
    }
}