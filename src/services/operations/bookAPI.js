import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { setLoading, setSearchBarLoader } from "../../slices/bookSlice"
import { SERVER_API } from "../api"

export const addBook=(formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Adding your book please wait....')
        dispatch(setLoading(true))
        try {

            await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/book/add-book`,formData)

            toast.success('Your book is added successfully!!!',{id:toastID})
            navigate('/book/view-all-books')
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
            await apiconnector('patch',`${SERVER_API.MAIN_SERVER}/api/v1/book/edit-book`,formData)  
            toast.success('Your Book details updated successfully',{id:toastID})
        } catch (error) {
            toast.error("Error while updating book details",{id:toastID})
            console.error('editBook API',error)
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

