import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import logo from '../assets/images/logo.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserPassword } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const {profile}=useSelector(state=>state.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    function handleFormData(form){
      dispatch(updateUserPassword(profile.email,form.password,form.confirmPassword,navigate))
    }
  return (
    <div >
      <div className=' d-flex justify-content-center mt-5'  >
            <div className=' border shadow-lg rounded p-4' style={{width:"400px"}}>
                <div className='d-flex gap-2 align-items-center   ' >
                  <img src={logo} alt="" width={40} height={40} />
                  <span className='fw-bold fs-5 small'>Examyug<span className='text-danger fw-bolder'>24</span></span>
                </div>
                <h5 className='fw-semibold text-center mt-2'>Change Password</h5>
                <form className='needs-validation' noValidate  onSubmit={handleSubmit(handleFormData)}>
                  <div className='row gy-3'>
                  <div className='form-group col-12'>
                      <label htmlFor="password" className='form-label'>Password</label>
                      <input type="password" name="" className={`form-control form-control form-control-sm ${errors.password&&'is-invalid'}`} id="password" {...register('password',{required:'*password is required'})} />
                      <div className='invalid-feedback'>
                        {errors.password?.message}
                      </div>
                  </div>
                   <div className='form-group col-12'>
                      <label htmlFor="confirmPassword" className='form-label'>Confirm password</label>
                      <input type="password" name="" className={`form-control form-control form-control-sm ${errors.confirmPassword&&'is-invalid'}`} id="confirmPassword" {...register('confirmPassword',{required:'*confirm password is required'})} />
                      <div className='invalid-feedback'>
                        {errors.confirmPassword?.message}
                      </div>
                  </div>
                  <div className='form-group col-12 mt-4 mb-2'>
                      <button className=" form-control btn-sm btn-warning btn">Update password</button>
                  </div>
                  </div>
                </form>

              </div>
            </div>
    </div>
  )
}

export default ChangePassword