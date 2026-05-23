import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { SERVER_API } from "../api"
import { setLoading } from "../../slices/booksetSlice"

export const addBookset=(formData)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('We are creating your bookset please wait...')
        dispatch(setLoading(true))
        try {
            await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/bookset/add-bookset`,formData)
            toast.success('Bookset added successfully',{id:toastID})
        } catch (error) {
            toast.error('Something went wrong',{id:toastID})
            console.log('addBookset API',error)
        }
        dispatch(setLoading(false))
    }
}