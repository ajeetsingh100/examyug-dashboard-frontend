import React, { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addBook } from '../../services/operations/bookAPI'
import { apiconnector } from '../../services/apiconnector'
import toast from 'react-hot-toast'


const AddBook = () => {
    const [bookCategory,setBookCategory]=useState([])    
    const {reset,register,handleSubmit,formState:{errors}}=useForm()
    const {loading}=useSelector(state=>state.book)
    const dispatch=useDispatch()

    function handleFormData(form){
    console.log('handleFormData function called!!!',form)
        const formData=new FormData()
        console.log(form.thumbnail[0])
        formData.append('bookTitle',form.bookTitle)
        formData.append('bookDescription',form.bookDescription)
        formData.append('maxPrice',form.maxPrice)
        formData.append('sellingPrice',form.sellingPrice)
        formData.append('thumbnail',form.thumbnail[0])
        formData.append('categoryName',form.categoryName)
        formData.append('demoPdf',form.demoPdf[0])
        dispatch(addBook(formData))  
        
    }
    /*----loading category------*/
    useEffect(()=>{
         async function loadCategory(){
            const response= await apiconnector('get','http://localhost:4000/api/v1/book/book-category/get-all-category')
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
    
  return (
    <div>
        <div className='container py-3'>
            <h4>
                Add Books
            </h4>

            {/* Books form */}
            <div>
                <form className='mt-5 needs-validation   shadow-sm bg-white  shadow-lg'  noValidate onSubmit={handleSubmit(handleFormData)} >
                    
                        <div class="row p-4 gy-3">
                            <h4>Book Information</h4>
                            <hr />
                        <div class="form-group col-12 col-md-6">
                            <label for="inputEmail4" className='form-label'>Book title</label>
                            <input type="text" class={`form-control form-control-sm ${errors.bookTitle&&`is-invalid`}`}  id="inputEmail4" {...register('bookTitle',{required:'*book title is required'})}/>
                            <div className='invalid-feedback'>
                                {errors.bookTitle?.message}
                            </div>
                        </div>
                        <div class="form-group col-12 col-md-6">
                            <label for="inputEmail4" className='form-label'>Book category</label>
                            <select name="" className={`form-select form-select-sm ${errors.categoryName&&`is-invalid`}`} id="" {...register('categoryName',{required:'please select a category'})}>
                                <option value="">--select category--</option>
                                {
                                    bookCategory?.map(category=>
                                        <option value={category._id}>{category.categoryName}</option>
                                    )
                                }
                            </select>
                           <div className='invalid-feedback'>
                                {errors.categoryName?.message}
                           </div>
                        </div>
                        <div class="form-group  col-md-12">
                            <label for="inputPassword4" className='form-label'>Book description</label>
                            <textarea className={`form-control form-control-sm ${errors.bookDescription&&'is-invalid'}`} cols={4} rows={2} id="inputAddress" placeholder="describe your course...." {...register('bookDescription',{required:'*book description is required'})}></textarea>
                            <div className='invalid-feedback'>
                                {errors.bookDescription?.message}
                            </div>
                        </div>

                        <div class="form-group col-12 col-md-6">
                                <label for="inputAddress" className='form-label'>Demo link</label>
                                <input type="file" className={`form-control form-control-sm ${errors.demoPdf&&'is-invalid'}`}id="inputPassword4"  placeholder='enter the course duration eg. 4 months/1 year ' 
                                {...register('demoPdf',
                                        {
                                            required:"*demo pdf is required",
                                            validate:{
                                                checkType:(file)=>{
                                                    const allowedTypes=['application/pdf']
                                                    return (
                                                        allowedTypes.includes(file[0].type)||'*only pdf file is allowed'
                                                    )
                                                },
                                                checkSize:(file)=>{
                                                    const size=file[0].size
                                                    console.log(file[0].size)
                                                    return(
                                                        size<510000||'*pdf size exceeded!! please upload pdf below size 5MB'
                                                    )                                                
                                                },
                                                
                                            }
                                            
                                            })} />
                                
                                
                                <div className='invalid-feedback'>
                                    {errors.demoPdf?.message}
                                </div>
                        </div>
                        <div class="form-group col-12 col-md-6">
                                <label for="inputAddress2" className='form-label'>Thumbnail</label>
                                <input type="file" className={`form-control form-control-sm  ${errors.thumbnail&&'is-invalid'}`} id="inputAddress2" placeholder="Apartment, studio, or floor" 
                                {...register(
                                            'thumbnail',
                                            {
                                                required:'book thumbnail is required',
                                                validate:{
                                                    checkFileType:(file)=>{
                                                        const allowedTypes=['image/jpeg','image/jpg','image/png']
                                                        return(
                                                            allowedTypes.includes(file[0].type)|| `*only image type 'jpeg, jpg' are allowed`
                                                        )
                                                    }
                                                }
                                            })}/>
                                
                                <div className='invalid-feedback'>
                                    {errors.thumbnail?.message}
                                </div>
                        </div>
                               
                        
                        <h4 className='mt-5'>Book Pricing</h4>
                        <hr />
                        <div class="form-group  col-12 col-md-4">
                            <label for="inputCity" className='form-label'>MRP</label>
                            <div className='input-group'>
                                <i class="bi bi-currency-rupee input-group-prepend input-group-text"></i>
                                <input type="text" className={`form-control form-control-sm ${errors.maxPrice&&'is-invalid'}`} id="inputCity" {...register('maxPrice',{required:'*MRP is required'})}/>
                                <div className='invalid-feedback'>
                                    {errors.maxPrice?.message}
                                </div>
                            </div>
                            
                        </div>
                        <div class="form-group col-12 col-md-4">
                            <label for="inputState" className='form-label'>Price</label>
                            <div className='input-group'>
                                 <i class="bi bi-currency-rupee input-group-text"></i>
                                 <input type="text" name="" id="inputState" className={`form-control form-control-sm${errors.sellingPrice&&'is-invalid'}`} {...register('sellingPrice',{required:'*price is required'})} />
                                <div className='invalid-feedback'>
                                    {errors.sellingPrice?.message}
                                </div>
                            </div>
                           
                        </div>
            
                       
                            <div className='form-group mt-5 d-flex justify-content-center '>
                                <button type='submit' className='btn btn-primary btn-sm'>Add Book</button>
                            </div>
                    </div>
              </form>
        </div>
        </div>
    </div>
  )
}

export default AddBook