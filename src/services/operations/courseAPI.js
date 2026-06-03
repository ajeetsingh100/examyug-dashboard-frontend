import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { setLoading,setSearchBarLoader } from "../../slices/courseSlice"
import { SERVER_API } from "../api"

export const addCourse=(formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Adding your course please wait.....')
        dispatch(setLoading(true))
        try {
            await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/course/add-course`,formData)
            toast.success('Course is added successfully!!!',{id:toastID})
            navigate('/course/view-all-courses')
        } catch (error) {
            toast.error(error,{id:toastID})
            console.error('add-course API ',error)
        }
        dispatch(setLoading(false))
    }
}

export const searchCourse=(keyword,page,limit)=>{
    return async(dispatch)=>{
        dispatch(setSearchBarLoader(true))
        try {
            const response= await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/course/searched-course?keyword=${keyword}&page=${page}&limit=${limit}`)
            return response
        } catch (error) {
            throw error
        }
    }
}
