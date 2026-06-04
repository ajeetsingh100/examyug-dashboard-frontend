import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { SERVER_API } from "../api"
import { setEditBookset, setLoading, setSearchBarLoader } from "../../slices/booksetSlice"

export const addBookset=(formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('We are creating your bookset please wait...')
        dispatch(setLoading(true))
        try {
            const response=await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/bookset/add-bookset`,formData)
            console.log(response)
            toast.success('Bookset added successfully',{id:toastID})
            navigate('/bookset/view-all-booksets')
        } catch (error) {
            toast.error(error.response.data.message,{id:toastID})
            console.log('addBookset API',error)
        }
        dispatch(setLoading(false))
    }
}

export const searchBookset=(keyword,page,limit)=>{
    return async(dispatch)=>{
        dispatch(setSearchBarLoader(true))
        try {
            const response= await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/bookset/searched-bookset?keyword=${keyword}&page=${page}&limit=${limit}`)
            return response
        } catch (error) {
            throw error
        }
    }
}

export const searchBook=(keyword,page,limit)=>{
    return async(dispatch)=>{
        dispatch(setSearchBarLoader(true))
        try{
            const response=await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/book/searched-book?keyword=${keyword}&page=${page}&limit=${limit}`)
            return response
            
        }catch(error){
            throw error
        }
               
    }
}

export const updateBookset=(formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Modifying bookset details...')
        try {
            const response=await apiconnector('POST','http://localhost:4000/api/v1/bookset/edit-bookset',formData)
            toast.success('Course successfully modified',{id:toastID})
            navigate('/bookset/view-all-booksets') 
            dispatch(setEditBookset(false))           
        } catch (error) {
            toast.error('Unable to modify course details!!',{id:toastID})
            console.log(error.response.data)
        }
    }
}

