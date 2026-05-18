import React from 'react'
import { apiconnector } from '../../services/apiconnector'
import { useForm } from 'react-hook-form'

const CourseCategory = () => {
    const {reset,register,handleSubmit,formState:{errors}}=useForm()

    function handleForm(formData){
        console.log('handle form is called')
        apiconnector('post','http://localhost:4000/api/v1/course/course-category/add-category',formData)
    }
  return (
    <div>
        <div className='container mt-3'>
            <h4>
                Add Course Category
            </h4>

            {/* Books form */}
            <div>
                <form className='mt-5 shadow-lg bg-white needs-validation' noValidate onSubmit={handleSubmit(handleForm)}>
                    
                        <div class="row p-4 gy-3">
                            <h4>Category Information</h4>
                            <hr />
                        <div class="form-group col-12  d-flex justify-content-center">
                            <div className='form-group w-50 '>
                                <label htmlFor="" className='form-label'>Category title</label>
                                <input type="text"  className={`form-control form-control-sm ${errors.categoryName&&`is-invalid`}`} {...register('categoryName',{required:'*category name is required'})}/>
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

export default CourseCategory