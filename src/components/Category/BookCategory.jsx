import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, updateCategory } from '../../services/operations/bookCategories'
import { useNavigate } from 'react-router-dom'
import {setEditBookCategory} from '../../slices/bookCategorySlice'

const BookCategory = () => {
    const {register,handleSubmit,reset,formState:{errors,dirtyFields}}=useForm()
    const {category,editBookCategory}=useSelector(state=>state.bookCategory)
    const dispatch=useDispatch()
    const navigate=useNavigate()
   

    function handleFormData(form){
        const formData=new FormData
        if(editBookCategory&&Object.keys(dirtyFields).length!==0){
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

        console.log(formData)
        dispatch(addCategory(form,navigate))
    }
    
    function handleCancelEditBookCategory(){        
        dispatch(setEditBookCategory(false))
        navigate('/categories/view-all-categories/book')
    }
    
        useEffect(()=>{
            console.log('book category: ',category)
            console.log(editBookCategory)
            if(editBookCategory){
                reset({
                    ...category
                })
            }
            if(!editBookCategory){
                reset()
            }
        },[editBookCategory])

  return (
    <div>
        <div className='container mt-3'>
            <h4>
                Add Book Category
            </h4>
            { editBookCategory&&<div className='d-flex justify-content-end'>
                     <button className="btn btn-sm btn-primary" onClick={handleCancelEditBookCategory}>Cancel Edit</button>
                </div>}

            {/* Books form */}
            <div>
               <form className='mt-5 shadow-lg bg-white needs-validation' noValidate onSubmit={handleSubmit(handleFormData)}>
                    
                        <div class="row p-4 gy-3">
                            <h4>Category Information</h4>
                            <hr />
                        <div class="form-group col-12  d-flex justify-content-center">
                            <div className='form-group w-50 '>
                                <label htmlFor="" className='form-label'>Category title</label>
                                <input type="text" className={`form-control form-control-sm ${errors.categoryTitle&&`is-invalid`}`} {...register('categoryTitle',{required:'*category name is required'})}/>
                                <div className='invalid-feedback'>
                                    {errors.categoryTitle?.message}
                                </div>
                                <div className='d-flex justify-content-center mt-3 '>
                                   {
                                    editBookCategory?
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

export default BookCategory