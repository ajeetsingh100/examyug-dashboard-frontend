import React, { useEffect } from 'react'
import { apiconnector } from '../../services/apiconnector'
import { useForm } from 'react-hook-form'
import { SERVER_API } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, updateCategory } from '../../services/operations/courseCategories'
import toast from 'react-hot-toast'
import { setEditCourseCategory } from '../../slices/courseCategorySlice'

const CourseCategory = () => {
    const {reset,register,handleSubmit,formState:{errors,dirtyFields}}=useForm()
    const {category,editCourseCategory}=useSelector(state=>state.courseCategory)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    async function handleForm(form){
        const formData=new FormData
        if(editCourseCategory&&Object.keys(dirtyFields).length!==0){
            const updates={}
            Object.keys(dirtyFields).forEach(key=>{
                if(key!=='thumbnail')
                updates[key]=form[key]
            })
            formData.append('updates',JSON.stringify(updates))
            formData.append('categoryID',category._id)            
            dispatch(updateCategory(formData,navigate))
            return
        }
      dispatch(addCategory(form,navigate))
    }

    useEffect(()=>{
        if(editCourseCategory){
            reset({
                ...category
            })
        }
        if(!editCourseCategory){
            reset()
        }
    },[editCourseCategory])
    
    function handleCancelEditCourseCategory(){
        dispatch(setEditCourseCategory(false))
        navigate('/categories/view-all-categories/course')

    }

  return (
    <div >
        <div className='container mt-3'>
            <h4>
                Add Course Category
            </h4>
             { editCourseCategory&&<div className='d-flex justify-content-end'>
                     <button className="btn btn-sm btn-primary" onClick={handleCancelEditCourseCategory}>Cancel Edit</button>
                </div>}

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
                                    {
                                        editCourseCategory?
                                            Object.keys(dirtyFields).length!==0?
                                                <button  className='btn btn-warning btn-sm'>Update Category</button>:
                                                null
                                            :<button className='btn btn-danger btn-sm'>Add Category</button>
                                }
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
