import React, { useEffect, useState } from 'react'
import {  useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, updateBook } from '../../services/operations/bookAPI'
import { apiconnector } from '../../services/apiconnector'
import toast from 'react-hot-toast'
import { SERVER_API } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import FileUploadBookThumbnail from '../FileUpload/FileUpload'
import FileUpload from '../FileUpload/FileUpload'
import { setEditBook, setNavigated } from '../../slices/bookSlice'


const AddBook = () => {
    const [bookCategory,setBookCategory]=useState([])    
    const {reset,register,handleSubmit,control,formState:{errors,dirtyFields}}=useForm()
    const {loading,editBook,book,navigated}=useSelector(state=>state.book)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    function handleFormData(form){
    console.log('handleFormData function called!!!',form)
        const formData=new FormData()
        if(editBook&&Object.keys(dirtyFields).length!==0){
            const updates={}
            Object.keys(dirtyFields).forEach(key=>{
                if(key!=='thumbnail'&&key!=='demoPdf')
                updates[key]=form[key]
            })
            formData.append('updates',JSON.stringify(updates))
            formData.append('bookID',book._id)
            formData.append('thumbnail',form.thumbnail)
            formData.append('demoPdf',form.demoPdf)
            dispatch(updateBook(formData,navigate))
            return
                }
            console.log(form.thumbnail)
            formData.append('bookTitle',form.bookTitle)
            formData.append('bookDescription',form.bookDescription)
            formData.append('maxPrice',form.maxPrice)
            formData.append('sellingPrice',form.sellingPrice)
            formData.append('thumbnail',form.thumbnail)
            formData.append('categoryID',form.category)
            formData.append('demoPdf',form.demoPdf)
            dispatch(addBook(formData,navigate))  
            
    }
    /*----loading category------*/
    useEffect(()=>{
         async function loadCategory(){

            const response= await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/book/categories/get-all-categories`)

            console.log(response)
            if(response.data.success){
                setBookCategory(response.data.allCategories)
            }else{
                toast.error('Unable to load categories')
            }
         }
         loadCategory()
         if(!loading){
            reset()
         }
    },[loading])

     useEffect(()=>{     
         if(editBook&&bookCategory.length>0){
            reset({
                ...book,
                category:book.category._id,
                thumbnail:book.thumbnail,
                demoPdf:book.demoPdf           
            })
        }
        if(!editBook){
            reset()
        }
    },[editBook,bookCategory])

        function handleCancelEdit(){
            dispatch(setEditBook(false))
            dispatch(setNavigated(false))
            navigate('/book/view-all-books')
        }
    
  return (
    <div>
        <div className='container py-3'>
            <h4>
                Add Books
            </h4>
            { editBook&&<div className='d-flex justify-content-end'>
                     <button className="btn btn-sm btn-primary" onClick={handleCancelEdit}>Cancel Edit</button>
                </div>}

            {/* Books form */}
            <div>
                <form className='mt-5 needs-validation   shadow-sm bg-white  shadow-lg'  noValidate onSubmit={handleSubmit(handleFormData)} >
                    
                        <div className="row p-4 gy-3">
                            <h4>Book Information</h4>
                            <hr />
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="inputEmail4" className='form-label'>Book title</label>
                            <input type="text" className={`form-control form-control-sm ${errors.bookTitle&&`is-invalid`}`}  id="inputEmail4" {...register('bookTitle',{required:'*book title is required'})}/>
                            <div className='invalid-feedback'>
                                {errors.bookTitle?.message}
                            </div>
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="inputEmail4" className='form-label'>Book category</label>
                            <select name="" className={`form-select form-select-sm ${errors.category&`is-invalid`}`} id="" {...register('category',{required:'please select a category'})}>
                                <option value="">--select category--</option>
                                {
                                    bookCategory?.map(category=>
                                        <option key={category._id} value={category._id}>{category.categoryTitle}</option>
                                    )
                                }
                            </select>
                           <div className='invalid-feedback'>
                                {errors.category?.message}
                           </div>
                        </div>
                        <div className="form-group  col-md-12">
                            <label htmlFor="inputPassword4" className='form-label'>Book description</label>
                            <textarea className={`form-control form-control-sm ${errors.bookDescription&&'is-invalid'}`} cols={4} rows={2} id="inputAddress" placeholder="describe your course...." {...register('bookDescription',{required:'*book description is required'})}></textarea>
                            <div className='invalid-feedback'>
                                {errors.bookDescription?.message}
                            </div>
                        </div>                       
                            
                        <div className='form-group col-12 col-md-6'>  
                            <label className='form-label'>Add course thumbnail</label>                        
                            <div>
                                
                                <Controller
                                    name='thumbnail'
                                    control={control}              
                                    render={({field})=>
                                    <FileUpload value={field.value} 
                                            onChange={field.onChange} 
                                            accept={{"image/jpeg":[],"image/jpg":[],"image/png":[]}} 
                                            fileType='image'
                                            />} 
                                    />
                            </div>                            
                        </div>      
                          <div className='form-group col-12 col-md-6'>  
                            <label className='form-label'>Add demo link</label>                        
                            <div>
                                
                                <Controller
                                    name='demoPdf'
                                    control={control}              
                                    render={({field})=>
                                    <FileUpload value={field.value} 
                                            onChange={field.onChange} 
                                            accept={{"application/pdf":[]}}
                                            fileType='pdf'
                                            />} 
                                    />
                            </div>                            
                        </div>                   
                      
                       
                        
                        <h4 className='mt-5'>Book Pricing</h4>
                        <hr />
                        <div className="form-group  col-12 col-md-4">
                            <label htmlFor="inputCity" className='form-label'>MRP</label>
                            <div className='input-group'>
                                <i className="bi bi-currency-rupee input-group-prepend input-group-text"></i>
                                <input type="text" className={`form-control form-control-sm ${errors.maxPrice&&'is-invalid'}`} id="inputCity" {...register('maxPrice',{required:'*MRP is required'})}/>
                                <div className='invalid-feedback'>
                                    {errors.maxPrice?.message}
                                </div>
                            </div>
                            
                        </div>
                        <div className="form-group col-12 col-md-4">
                            <label htmlFor="inputState" className='form-label'>Price</label>
                            <div className='input-group'>
                                 <i className="bi bi-currency-rupee input-group-text"></i>
                                 <input type="text" name="" id="inputState" className={`form-control form-control-sm ${errors.sellingPrice&&'is-invalid'}`} {...register('sellingPrice',{required:'*price is required'})} />
                                <div className='invalid-feedback'>
                                    {errors.sellingPrice?.message}
                                </div>
                            </div>
                           
                        </div>
            
                       
                            <div className='form-group mt-5 d-flex justify-content-center '>
                                {
                                editBook?
                                    Object.keys(dirtyFields).length!==0?
                                        <button  className='btn btn-warning btn-sm'>Update Book</button>:
                                        null
                                    :<button className='btn btn-danger btn-sm'>Add Book</button>
                                }
                            </div>
                    </div>
              </form>
        </div>
        </div>
    </div>
  )
}

export default AddBook
