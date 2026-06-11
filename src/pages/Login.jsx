import React from 'react'
import logo from '../assets/images/logo.jpeg'
import { appendErrors, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {handleSubmit,register,formState:{errors}}=useForm()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  function handleFormData(form){
    dispatch(login(form,navigate))
    
  }
  return (
    <div>
        <div className='container d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
            <div className=' border shadow-lg rounded p-4' style={{width:"400px"}}>
                <div className='d-flex gap-2 align-items-center   ' >
                  <img src={logo} alt="" width={40} height={40} />
                  <span className='fw-bold fs-5 small'>Examyug<span className='text-danger fw-bolder'>24</span></span>
                </div>
                <h3 className='fw-bold text-center mt-4'>Welcome to Examyug<span className='text-danger fw-bolder'>24</span></h3>
                <h5 className='fw-semibold text-center mt-2'>Login</h5>
                <form className='needs-validation' noValidate  onSubmit={handleSubmit(handleFormData)}>
                  <div className='row gy-3'>
                  <div className='form-group col-12'>
                      <label htmlFor="email" className='form-label'>Email</label>
                      <input type="text" name="" className={`form-control form-control form-control-sm ${errors.email&&'is-invalid'}`} id="email" {...register('email',{required:'*email is required'})} />
                      <div className='invalid-feedback'>
                        {errors.email?.message}
                      </div>
                  </div>
                   <div className='form-group col-12'>
                      <label htmlFor="password" className='form-label'>Password</label>
                      <input type="password" name="" className={`form-control form-control form-control-sm ${errors.password&&'is-invalid'}`} id="email" {...register('password',{required:'*password is required'})} />
                      <div className='invalid-feedback'>
                        {errors.password?.message}
                      </div>
                  </div>
                  <div className='form-group col-12 mt-4 mb-2'>
                      <button className=" form-control btn-sm btn-warning btn">Login</button>
                  </div>
                  </div>
                </form>

              </div>
            </div>
        </div>
  )
}

export default Login
