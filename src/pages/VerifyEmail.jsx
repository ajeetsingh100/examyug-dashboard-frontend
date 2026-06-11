import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signUp, verifyOTP } from '../services/operations/authAPI'
import { sendOTP } from '../services/operations/authAPI'
import { useForm } from 'react-hook-form'

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const {signUpData,editPassword,profile}=useSelector((state)=>state.auth)
    const {handleSubmit}=useForm()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleFormData=(e)=>{
        e.preventDefault()
        if(editPassword){
            dispatch(verifyOTP(otp,profile.email,navigate))
            return
        }
        dispatch(signUp(signUpData,otp,navigate))        
    }
    useEffect(()=>{
        if(!signUpData){
            navigate('/signup')
        }
    },[])
    
  return (
    <div>
      
        <div className='d-flex justify-content-center'>
            
                    <div className='shadow-lg mt-5 p-4 w-50 border d-flex flex-column'>
                    <div>
                        <h3>Verify Email</h3>
                        <div>A verfication code has been sent to the specified email in the registeration form</div>
                    </div>
                    <div className='mt-4'>
                        <form onSubmit={handleFormData}>
                             <label className='form-label text-start'>Enter OTP *</label>
                            <div className='row row-gap-2'>
                                    <div className="form-group d-flex flex-column align-items-center">
                                       
                                        <OTPInput                                        
                                            numInputs={6}
                                            value={otp}
                                            onChange={setOtp}
                                            renderSeparator={<span>-</span>}                                        
                                            renderInput={(props) => <input {...props} 
                                                style={{
                                                    width:"50px",
                                                    height:"60px",
                                                    textAlign:'center',
                                                    fontSize:'22px',
                                                    fontWeight:'bold'
                                                }}
                                                placeholder={0}
                                            />}
                                        />
                                </div>
                                <div className='form-group mt-4'>
                                   <button className='btn btn-warning form-control'>Verify Email</button>                 
                                </div>                                
                            </div>
                        </form>
                        
                    </div>
                    <div className='d-flex justify-content-between mt-4'>                                     
                            <Link to='/user/add-user' className='text-decoration-none d-flex gap-2'><span className='bi bi-arrow-left-circle'></span>Back to add user</Link>
                            <Link to='' className='text-decoration-none'  onClick={()=> dispatch(sendOTP(signUpData.email,navigate))}><span className='bi bi-arrow-repeat'></span> Resend it</Link>
                    </div>

                </div>
               
        </div>
    </div>
  )
}

export default VerifyEmail