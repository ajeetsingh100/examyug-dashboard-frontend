import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setEditProfile, setSignUpData, setProfile } from '../../slices/authSlice'
import { sendOTP, updateUserDetails } from '../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const AddUser = () => {
    const {handleSubmit,register,reset,formState:{errors,dirtyFields}}=useForm()
    const {editProfile,profile}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    function handleFormData(form){
        console.log(form)
        if(editProfile&&Object.keys(dirtyFields).length!==0){
            const formData=new FormData()

            let updates={}
            Object.keys(dirtyFields).forEach(key=>
                updates[key]=form[key]
            )
            formData.append('userID',profile._id)
            formData.append('updates',JSON.stringify(updates))
            dispatch(updateUserDetails(formData,navigate))
            return
        }
        dispatch(setSignUpData(form))
        dispatch(sendOTP(form.email,navigate))
    }
    function handlCancelUserEdit(){
        dispatch(setEditProfile(false))
        dispatch(setProfile({}))
        navigate('/user/view-all-users')
    }
    useEffect(()=>{
        console.log(profile)
        if(editProfile){
            reset({
                ...profile
            })
        }
        if(!editProfile){
            reset()
        }
    },[editProfile])
  return (
    <div>
        <h4>Add User</h4>
        <div>
            <div className='d-flex justify-content-end'>
                {
                editProfile&&
                    <button className="btn btn-sm btn-primary " onClick={handlCancelUserEdit}>Cancel Edit</button>
            }
            </div>
            <form className='mt-5 needs-validation bg-white shadow-lg'  noValidate onSubmit={handleSubmit(handleFormData)}>
                <div className='row gy-3 p-4'>
                    <div className='form-group col-12 col-md-6'>
                        <label htmlFor='firstName' className='form-label'>First name</label>
                        <input type="text" id='firstName' className={`form-control form-control-sm ${errors.firstName&&`is-invalid`}`} placeholder='enter first name' {...register('firstName',{required:'*firstname is required'})} />
                        <div className="invalid-feedback">
                            {errors.firstName?.message}
                        </div>
                    </div>
                    <div className='form-group col-12 col-md-6'>
                        <label htmlFor='lastName' className='form-label'>Last name</label>
                        <input type="text" id='lastName' className={`form-control form-control-sm ${errors.lastName&&`is-invalid`}`} placeholder='enter last name'    {...register('lastName',{required:'*last name is required'})} />
                        <div className='invalid-feedback'>
                                {errors.lastName?.message}
                        </div>
                    </div>
                    <div className='form-group col-12 col-md-4'>
                        <label htmlFor='gender' className='form-label'>Gender</label>
                          <select className={`form-control form-control-sm ${errors.gender&&`is-invalid`}`} id='gender' {...register('gender',{required:'*gender is required'})} >
                            <option value="">--select gender--</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                         <div className='invalid-feedback'>
                            {errors.gender?.message}
                        </div>
                    </div>
                    <div className='form-group col-12 col-md-4'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type="email" id='email' className={`form-control form-control-sm ${errors.email&&`is-invalid`}`} placeholder='example@gmail.com'    {...register('email',{required:'*email is required'})} />
                        <div className='invalid-feedback'>
                                {errors.email?.message}
                        </div>
                    </div>
                     <div className='form-group col-12 col-md-4'>
                        <label htmlFor='phone_no' className='form-label'>Phone no.</label>
                        <div className='input-group input-group-sm'>
                            <div className='btn' style={{backgroundColor:'#eeeeee'}}>+91</div>
                            <input type="telephone" id='phone_no' className={`form-control form-control-sm ${errors.phone_no&&`is-invalid`}`} placeholder='00000-00000'    {...register('phone_no',{required:'*phone number is required'})} />
                             <div className='invalid-feedback'>
                                {errors.phone_no?.message}
                            </div>
                        </div>
                       
                    </div>
                    <div className='form-group col-12 col-md-4'>
                        <label htmlFor='role' className='form-label'>Role</label>
                        <select id='role' className={`form-control form-control-sm ${errors.role&&`is-invalid`}`}  {...register('role',{required:'*role is required'})} >
                            <option value="">--select-role--</option>
                            <option value="admin">Admin</option>
                            <option value="course-manager">Course Manager</option>
                            <option value="book-manager">Book Manager</option>
                        </select>
                        <div className="invalid-feedback">
                            {errors.role?.message}
                        </div>
                    </div>
                   { !editProfile&& <div className='form-group col-12 col-md-4'>
                        <label htmlFor='password' className='form-label'>Password</label>        
                           
                            <input type="password" id='phone_no' disabled={editProfile} className={`form-control form-control-sm ${errors.password&&`is-invalid`}`}    {...register('password',{required:'*password is required'})} />
                             <div className='invalid-feedback'>
                                {errors.password?.message}
                            </div>
                                            
                    </div>}
                     {!editProfile&&<div className='form-group col-12 col-md-4'>
                        <label htmlFor='confirm-password' className='form-label'>Confirm password</label>
                        
                           
                            <input type="password" id='confirm-password' disabled={editProfile} className={`form-control form-control-sm ${errors.confirmPassword&&`is-invalid`}`} {...register('confirmPassword',{required:'*confirm password is required'})} />
                             <div className='invalid-feedback'>
                                {errors.confirmPassword?.message}
                            </div>
                                            
                    </div>}
                    
                    <div className='form-group d-flex justify-content-center mt-5'>
                        {
                                editProfile?
                                    Object.keys(dirtyFields).length!==0?
                                        <button  className='btn btn-warning btn-sm'>Update user</button>:
                                        null
                                    :<button className='btn btn-danger btn-sm'>Add user</button>
                                }
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser