import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { setEditCourse, setLoading,setSearchBarLoader } from "../../slices/courseSlice"
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
export const updateCourse=(formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Modifying course details...')
        try {
            const response=await apiconnector('POST',`${SERVER_API.MAIN_SERVER}/api/v1/course/edit-course`,formData)
            toast.success('Course successfully modified',{id:toastID})
            navigate('/course/view-all-courses')
            dispatch(setEditCourse(false))
            
        } catch (error) {
            toast.error('Unable to modify course details!!',{id:toastID})
            console.log(error.response.data)
        }
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
