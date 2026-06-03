import React from 'react'
import { apiconnector } from '../../services/apiconnector'
import { useForm } from 'react-hook-form'
import { SERVER_API } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCategory } from '../../services/operations/courseCategories'
import toast from 'react-hot-toast'

const CourseCategory = () => {
    const {reset,register,handleSubmit,formState:{errors}}=useForm()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    async function handleForm(formData){
      dispatch(addCategory(formData,navigate))
    }
  return (
    <div >
        <div className='container mt-3'>
            <h4>
                Add Course Category
            </h4>

            {/* Books form */}
            <div>
                <form className='mt-5 shadow-lg bg-white needs-validation' noValidate onSubmit={handleSubmit(handleForm)}>
                    
                        <div className="row p-4 gy-3">
                            <h4>Category Information</h4>
                            <hr />
                        <div className="form-group col-12  d-flex justify-content-center">
                            <div className='form-group w-50 '>
                                <label htmlFor="" className='form-label'>Category title</label>
                                <input type="text"  className={`form-control form-control-sm ${errors.categoryTitle&&`is-invalid`}`} {...register('categoryTitle',{required:'*category name is required'})}/>
                                <div className='invalid-feedback'>
                                    {errors.categoryTitle?.message}
                                </div>
                                <div className='d-flex justify-content-center mt-3 '>
                                    <button type="submit" className='btn btn-danger btn-sm'>Add category</button>
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

export default CourseCategory
