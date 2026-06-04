import React, { useEffect, useRef, useState } from 'react'
import { apiconnector } from '../../services/apiconnector'
import { SERVER_API } from '../../services/api'
import toast from 'react-hot-toast'
import { searchBook } from '../../services/operations/bookAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Watch, Controller } from 'react-hook-form'
import {addBookset, updateBookset} from '../../services/operations/booksetAPI'
import { setEditBookset, setLoading } from '../../slices/booksetSlice'
import { useNavigate } from 'react-router-dom'
import FileUploadBooksetThumbnail from '../FileUpload/FileUploadBooksetThumbnail'
import BookList from './BookList'

const AddBookset = () => {
    const [categories,setCategories]=useState([])    
    const {loading,editBookset,bookset}=useSelector(state=>state.bookset)   
    const dispatch=useDispatch()
    const {reset,handleSubmit,register,watch,control,formState:{errors,dirtyFields}}=useForm()
    const maxPrice=watch('maxPrice')
    const sellingPrice=watch('sellingPrice')
    const navigate=useNavigate()  
    function handleFormData(form){
        const formData=new FormData()
        if(editBookset&&Object.keys(dirtyFields).length!==0){
            const updates={}
            Object.keys(dirtyFields).forEach(key=>{
                 if(key === 'thumbnail') return
                if(key === 'bookList'){
                    updates.bookList = form.bookList.map(
                        book => book._id
                    )
                    return
                }

                updates[key] = form[key]
            })
            
            formData.append('updates',JSON.stringify(updates))    
            formData.append('booksetID',bookset._id)        
            formData.append('thumbnail',form.thumbnail)            
            dispatch(updateBookset(formData,navigate))
            return
        }
        const bookList=form.bookList.map(book=>book._id)
        formData.append('booksetTitle',form.booksetTitle)
        formData.append('booksetDescription',form.booksetDescription)
        formData.append('thumbnail',form.thumbnail)
        formData.append('sellingPrice',form.sellingPrice)
        formData.append('maxPrice',form.maxPrice)
        formData.append('categoryID',form.category) 
        formData.append('bookList',JSON.stringify(bookList))        
        dispatch(addBookset(formData,navigate))
    }
   
    //useEffect(()=>{console.log('dirtyFields:',dirtyFields)},[dirtyFields])

    useEffect(()=>{
        async function loadCategories(){
            const response= await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/book/categories/get-all-categories`)
            console.log('response',response)
            if(response.data.success){
                setCategories(response.data.allCategories)
            }else{
                toast.error('Unable to load categories')
            }
        }
        if(categories.length===0){
            loadCategories()
        }        
        if(!loading){
            reset({
                 booksetTitle:'',
                 booksetDescription:'',
                 thumbnail:null,
                 category:'',
                 bookList:[],
                 maxPrice:'',
                 sellingPrice:''
            })           
        }
        
    },[loading])

    
      useEffect(()=>{ 
        console.log('bookset value:',bookset)
        if(editBookset&&categories.length>0){
            reset({
                ...bookset,
                category:bookset.category._id,
                thumbnail:bookset.thumbnail,    
                bookList:bookset.bookList || []            
                    
            })
           
         }                
        if(!editBookset){
            reset()
        }},[editBookset,categories])
    
    function handleCancelEditBookset(){
        dispatch(setEditBookset(false))
        navigate('/bookset/view-all-booksets')
    }     
  
  return (
    <div>
        <div className='container mt-3'>
            <h4>
                Add Bookset
            </h4>
             { editBookset&&<div className='d-flex justify-content-end'>
                     <button className="btn btn-sm btn-primary" onClick={handleCancelEditBookset}>Cancel Edit</button>
                </div>}

            {/* Books form */}
            <div>
                <form className='mt-5  needs-validation shadow-lg bg-white ' noValidate onSubmit={handleSubmit(handleFormData)}>
                    
                        <div className="row p-4 gy-3">
                            <h4>Bookset Information</h4>
                            <hr />
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="inputEmail4" className='form-label'>Bookset title</label>
                            <input type="email" className={`form-control form-control-sm ${errors.booksetTitle&&`is-invalid`}`} {...register('booksetTitle',{required:'*bookset name is required'})} id="inputEmail4"/>
                             <div className='invalid-feedback'>
                                {errors.booksetTitle?.message}
                            </div>
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="inputEmail4" className='form-label'>Book category</label>
                            <select name="" className={`form-select form-select-sm' id="" ${errors.category&&`is-invalid`}`} {...register('category',{required:'*please select a particular category'})}>
                                <option value="">--select a category--</option>
                                {
                                    categories?.map(category=>
                                        <option key={category._id} value={category._id}>{category.categoryTitle}</option>
                                    )
                                }
                            </select>
                            <div className='invalid-feedback'>
                                {errors.category?.message}
                            </div>
                        </div>
                        <div className="form-group  col-md-12">
                            <label htmlFor="inputPassword4" className='form-label'>Booket description</label>
                            <textarea className={`form-control form-control-sm ${errors.booksetDescription&&`is-invalid`}`} cols={4} rows={2} id="inputAddress" placeholder="describe your course...." {...register('booksetDescription',{required:'*please add description about bookset'})}></textarea>
                            <div className='invalid-feedback'>
                                {errors.booksetDescription?.message}
                            </div>
                        </div>
                          <label className='form-label'>Add course thumbnail</label>        
                            <div className='form-group col-12 d-flex justify-content-center'>   
                            
                            <div className='w-50'>
                                <Controller
                                    name='thumbnail'
                                    control={control}              
                                    render={({field})=>
                                    <FileUploadBooksetThumbnail value={field.value} 
                                            onChange={field.onChange} 
                                            accept={{"image/jpeg":[],"image/jpg":[],"image/png":[]}}/>} 
                                    />
                            </div>
                            </div>
                        


                        {/* <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputAddress2" className='form-label'>Thumbnail</label>
                                <input type="file" className={`form-control form-control-sm ${errors.thumbnail&&`is-invalid`}`} id="inputAddress2" placeholder="Apartment, studio, or floor" 
                                    {...register('thumbnail',
                                        {   required:'thumbnail is required',
                                            validate:{
                                                checkFileSize:(file)=>{
                                                    return(
                                                        file[0].size<2097152||'thumbnail should be less than 2MB'
                                                    )
                                                },
                                                checkFileType:(file)=>{
                                                    const allowedTypes=['image/png','image/jpeg','image/jpg']
                                                    return(
                                                        allowedTypes.includes(file[0].type)||'only image type jpeg, jpg, png are allowed'
                                                    )
                                                }
                                            }
                                        }
                                    )}
                                />
                                <div className='invalid-feedback'>
                                    {
                                        errors.thumbnail?.message
                                    }
                                </div>
                        </div> */}
                        {/* Add Books */}
                         <Controller
                            name='bookList'
                            control={control}   
                            defaultValue={[]}           
                            render={({field})=>
                            <BookList 
                            value={field.value} 
                                    onChange={field.onChange} 
                                    />} />
                        
                        <h4 className='mt-5'>Bookset Pricing</h4>
                        <hr />
                        <div className="form-group  col-12 col-md-4">
                            <label htmlFor="inputCity" className='form-label'>MRP</label>
                            <div className='input-group'>
                                <i className="bi bi-currency-rupee input-group-prepend input-group-text"></i>
                                <input type="number"  onWheel={(e) => e.target.blur()} className={`form-control form-control-sm ${errors.maxPrice&&`is-invalid`}`} 
                                {...register('maxPrice',
                                    {
                                        required:'*MRP  is required',
                                        min:{
                                            value:10,
                                            message:'max price should not be less than ₹10'
                                        },
                                        validate:{
                                            checkMaxPrice:(value)=>{
                                                return value>sellingPrice||'*max price should be greater than selling price'
                                            }
                                        },
                                        valueAsNumber:true
                                        })} id="inputCity"/>

                                
                                <div className='invalid-feedback'>
                                  {
                                    errors.maxPrice?.message
                                  }
                                </div>
                            </div>
                            
                        </div>
                        <div className="form-group col-12 col-md-4">
                            <label htmlFor="inputState" className='form-label'>Price</label>
                            <div className='input-group'>
                                 <i className="bi bi-currency-rupee input-group-text"></i>
                                 <input type="number" name="" id="inputState" onWheel={(e) => e.target.blur()} className={`form-control form-control-sm ${errors.sellingPrice&&`is-invalid`}`} 
                                 {...register('sellingPrice',
                                 {
                                    required:'*selling price is required',
                                    min:{
                                        value:5,
                                        message:"*selling price should not less than ₹5"
                                    },
                                    valueAsNumber:true
                                    
                                    })}/>
                                <div className='invalid-feedback'>
                                  {
                                    errors.sellingPrice?.message
                                  }
                                </div>
                            </div>
                           
                        </div>           
                       
                            <div className='form-group mt-5 d-flex justify-content-center'>
                                {
                                editBookset?
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

export default AddBookset