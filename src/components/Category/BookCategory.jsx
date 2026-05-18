import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addCategory } from '../../services/operations/bookCategories'


const BookCategory = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const dispatch=useDispatch()
   

    function handleFormData(formData){
        console.log(formData)
        dispatch(addCategory(formData))
    }

  return (
    <div>
        <div className='container mt-3'>
            <h4>
                Add Book Category
            </h4>

            {/* Books form */}
            <div>
               <form className='mt-5 shadow-lg bg-white needs-validation' noValidate onSubmit={handleSubmit(handleFormData)}>
                    
                        <div class="row p-4 gy-3">
                            <h4>Category Information</h4>
                            <hr />
                        <div class="form-group col-12  d-flex justify-content-center">
                            <div className='form-group w-50 '>
                                <label htmlFor="" className='form-label'>Category title</label>
                                <input type="text" className={`form-control form-control-sm ${errors.categoryName&&`is-invalid`}`} {...register('categoryName',{required:'*category name is required'})}/>
                                <div className='invalid-feedback'>
                                    {errors.categoryName?.message}
                                </div>
                                <div className='d-flex justify-content-center mt-3 '>
                                    <button type="submit" className='btn btn-primary btn-sm'>Add category</button>
                                </div>
                            </div>                           
                        </div>                       
                        
                    </div>
              </form>
        </div>
        </div>
    </div>
  )
}

export default BookCategory