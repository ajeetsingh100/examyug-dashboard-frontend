import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { setEditBook, setLoading, setSearchBarLoader } from "../../slices/bookSlice"
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
            //  GOOD PRACTICE TO DISPLAY ERROR
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

export const updateBook=(formData,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Modifying course details...')
        try {
            const response=await apiconnector('POST','http://localhost:4000/api/v1/book/edit-book',formData)
            toast.success('Course successfully modified',{id:toastID})
            navigate('/book/view-all-books')
            dispatch(setEditBook(false))
        } catch (error) {
            toast.error('Unable to modify course details!!',{id:toastID})
            console.log(error.response.data)
        }
    }
}