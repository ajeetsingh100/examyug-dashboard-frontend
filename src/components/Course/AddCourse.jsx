import React, {  useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCourse } from '../../services/operations/courseAPI'
import toast from 'react-hot-toast'
import { apiconnector } from '../../services/apiconnector'
import { SERVER_API } from '../../services/api'
const AddCourse = () => {
    const {reset,handleSubmit,formState:{errors},register}=useForm()
    const [courseCategory,setCourseCategory]=useState([])
    const {loading}=useSelector(state=>state.course)
    const dispatch=useDispatch()

    function handleFormData(form){
        const formData=new FormData()
        formData.append('courseTitle',form.courseTitle)
        formData.append('courseDescription',form.courseDescription)
        formData.append('maxPrice',form.maxPrice)
        formData.append('sellingPrice',form.sellingPrice)
        formData.append('categoryName',form.categoryName)
        formData.append('thumbnail',form.thumbnail[0])
        formData.append('timeDuration',form.timeDuration)
        formData.append('featured',form.featured)
        formData.append('courseDisplay',form.courseDisplay)
        formData.append('newBatch',form.newBatch)
        dispatch(addCourse(formData))
        
    }

    useEffect(()=>{
        async function loadCategory(){
                    const response= await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/course/course-category/get-all-category`)
                    console.log(response)
                    if(response.data.success){
                        setCourseCategory(response.data.allCategories)
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
         <div className='container  mt-3 '>  
                <h4>Add Course</h4>
                <form className='mt-5   needs-validation shadow-lg bg-white ' noValidate  onSubmit={handleSubmit(handleFormData)}>
                    
                <div className="row p-4 gy-3">
                    <h4>Course Information</h4>
                    <hr />
                <div className="form-group col-12 col-md-6">
                    <label htmlFor="inputEmail4" className='form-label'>Course title</label>
                    <input type="email" className={`form-control-sm form-control ${errors.courseTitle&&`is-invalid`}`} id="inputEmail4" {...register("courseTitle",{required:"*course title is required"})}/>
                    <div className='invalid-feedback'>
                        {errors.courseTitle?.message}
                    </div>
                </div>
                <div className="form-group col-12 col-md-6">
                    <label htmlFor="inputEmail4" className='form-label'>Course category</label>
                    <select name="" className={`form-select form-select-sm ${errors.categoryName&&`is-invalid`}`} {...register("categoryName",{required:"*please select a category"})} id="">
                        <option value=''>--select category---</option>
                        {
                            courseCategory?.map(category=>
                                <option  key={category._id} value={category._id}>{category.categoryName}</option>
                            )
                        }
                    </select>
                    <div className='invalid-feedback'>
                        {errors.categoryName?.message}
                    </div>
                </div>
                <div className="form-group  col-md-12">
                    <label htmlFor="inputPassword4" className='form-label'>Course description</label>
                    <textarea className={`form-control ${errors.courseDescription&&`is-invalid`}`} cols={4} rows={2} id="inputAddress" placeholder="describe your course...." {...register("courseDescription",{required:"*course description is required"})}></textarea>
                    <div className='invalid-feedback'>
                        {errors.courseDescription?.message}
                    </div>
                </div>

            <div className="form-group col-12 col-md-6">
                    <label htmlFor="inputAddress" className='form-label'>Duration</label>
                    <input type="text" name="" className={`form-control form-control-sm ${errors.timeDuration&&`is-invalid`}`} id="inputPassword4" placeholder='enter the course duration eg. 4 months/1 year '{...register("timeDuration",{required:"*course time duration is required"})} />
                    <div className='invalid-feedback'>
                          {errors.timeDuration?.message}
                    </div>
            </div>
             
            <div className="form-group col-12 col-md-6">
                    <label htmlFor="inputAddress2" className='form-label'>Thumbnail</label>
                    <input type="file" className={`form-control form-control-sm ${errors.thumbnail&&`is-invalid`}`} id="inputAddress2" placeholder="Apartment, studio, or floor" 
                    {...register("thumbnail",
                        {
                            required:"*course thumbnail is required",
                            validate:{
                                checkType:(file)=>{
                                    const allowedTypes=['image/png','image/jpeg','image/jpg']
                                    return (
                                        allowedTypes.includes(file[0].type)||'*only jpg, png, jpeg are allowed'
                                    )
                                }
                            }

                        })}/>
                    
                    
                    <div className='invalid-feedback'>
                        {errors.thumbnail?.message}
                    </div>
            </div>         
                
                <h4 className='mt-5'>Course Pricing</h4>
                <hr />
                <div className="form-group  col-12 col-md-4">
                    <label htmlFor="inputCity" className='form-label'>MRP</label>
                   <div className='input-group'>
                        <i className="bi bi-currency-rupee input-group-text"></i>
                        <input type="text" name="" id="inputCity" className={`form-control form-control-sm  ${errors.maxPrice&&`is-invalid`}`}  {...register("maxPrice",{required:"*max price is required"})}/>
                        <div className='invalid-feedback'>
                             {errors.maxPrice?.message}
                        </div>
                    </div>
                </div>
                <div className="form-group col-12 col-md-4">
                    <label htmlFor="inputState" className='form-label'>Price</label>
                   <div className='input-group'>
                        <i className="bi bi-currency-rupee input-group-text"></i>
                        <input type="text" name="" id="inputState" className={`form-control form-control-sm  ${errors.sellingPrice&&`is-invalid`}`} {...register("sellingPrice",{required:"*selling price is required"})} />
                        <div className='invalid-feedback'>
                            {errors.sellingPrice?.message}
                        </div>
                    </div>
                </div>
          <h4 className='mt-5'>Course Controls</h4>
            <hr />
            <div className="form-group col-12">
               <div className='row'>
                    <div className='col-md-4 col-sm-6 col-12'>
                        <label className={`form-check-label`}>Mark it as featured</label>
                        <div className='form-check'>
                            <input type="radio" name='featured' value='yes' className={`form-check-input ${errors.featured&&`is-invalid`}`} id="featured-yes" {...register('featured',{required:'*please select any one of the options'})}/>
                            <label htmlFor="featured-yes" className={`form-check-label ${errors.featured&&`is-invalid`}`}>Yes</label>
                        </div>
                        <div className='form-check'>
                            <input type="radio" name="featured" value='no' className={`form-check-input ${errors.featured&&`is-invalid`}`} id="featured-no" {...register('featured',{required:'*please select any one of the options'})} />
                            <label htmlFor="featured-no" className={`form-check-label ${errors.featured&&`is-invalid`}`}>No</label>
                            <div className='invalid-feedback'>
                                {errors.featured?.message}
                            </div>
                        </div>                        
                    </div>
                     <div className='col-md-4 col-sm-6 mt-sm-0 mt-4 col-12'>
                        <label className={`form-check-label`}>Mark it as new batch</label>
                        <div className='form-check'>
                            <input type="radio" name='featured' value='yes' className={`form-check-input ${errors.newBatch&&`is-invalid`}`} id="newBatch-yes" {...register('newBatch',{required:'*please select any one of the options'})}/>
                            <label htmlFor="newBatch-yes" className={`form-check-label ${errors.newBatch&&`is-invalid`}`}>Yes</label>
                        </div>
                        <div className='form-check'>
                            <input type="radio" name="featured" value='no' className={`form-check-input ${errors.newBatch&&`is-invalid`}`} id="newBatch-no" {...register('newBatch',{required:'*please select any one of the options'})} />
                            <label htmlFor="newBatch-no" className={`form-check-label ${errors.newBatch&&`is-invalid`}`}>No</label>
                            <div className='invalid-feedback'>
                                {errors.newBatch?.message}
                            </div>
                        </div>                        
                    </div>
                     <div className='col-md-4 col-sm-6  mt-sm-4 mt-md-0 mt-4 col-12'>
                        <label className={`form-check-label`}>Make it visible</label>
                        <div className='form-check'>
                            <input type="radio" name='featured' value='yes' className={`form-check-input ${errors.courseDisplay&&`is-invalid`}`} id="courseDisplay-yes" {...register('courseDisplay',{required:'*please select any one of the options'})}/>
                            <label htmlFor="courseDisplay-yes" className={`form-check-label ${errors.courseDisplay&&`is-invalid`}`}>Yes</label>
                        </div>
                        <div className='form-check'>
                            <input type="radio" name="featured" value='no' className={`form-check-input ${errors.courseDisplay&&`is-invalid`}`} id="courseDisplay-no" {...register('courseDisplay',{required:'*please select any one of the options'})} />
                            <label htmlFor="courseDisplay-no" className={`form-check-label ${errors.courseDisplay&&`is-invalid`}`}>No</label>
                            <div className='invalid-feedback'>
                                {errors.courseDisplay?.message}
                            </div>
                        </div>                        
                    </div>
                    
              </div>
            </div>
                <div className='form-group mt-5 d-flex justify-content-center '>
                    <button className='btn btn-primary btn-sm '>Add course</button>
                </div>
            </div>
        </form>
            </div>
    </div>
  )
}

export default AddCourse