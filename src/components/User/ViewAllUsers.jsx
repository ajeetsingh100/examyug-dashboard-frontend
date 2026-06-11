import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditPassword, setEditProfile, setLoading, setProfile } from '../../slices/authSlice'
import { apiconnector } from '../../services/apiconnector'
import { SERVER_API } from '../../services/api'
import Loader from '../../pages/Loader'
import { useNavigate } from 'react-router-dom'
import { deleteUser, sendOTPForUserPasswordChange } from '../../services/operations/authAPI'
import toast from 'react-hot-toast'
import { Modal, Button } from 'react-bootstrap';

const ViewAllUsers = () => {
  const dispatch=useDispatch()
  const [users,setAllUsers]=useState()
  const [selectedUser,setSelectedUser]=useState()
  const [showUserDeleteModal,setShowUserDeleteModal]=useState(false)
  const [showUserPasswordChangeModal,setShowUserPasswordChangeModal]=useState(false)
  const {loading,profile}=useSelector(state=>state.auth)
  const navigate=useNavigate()
  async function handleSelectedUser(user){
    setSelectedUser(user)
  }

  function handleEditUser(user){
    dispatch(setProfile(user))
    dispatch(setEditProfile(true))
    navigate('/user/add-user')
  }

  function handleUserChangePassword(){
     dispatch(setEditPassword(true))
     setShowUserPasswordChangeModal(false)
     dispatch(sendOTPForUserPasswordChange(profile.email,navigate))
  }

  
  async function handleDeleteUser(){
    try{
      const response=await dispatch(deleteUser(selectedUser._id))
      if(response.data.success){      
         setShowUserDeleteModal(false)      
         loadAllUsers()
        }
     
    }catch(error){
      console.log(error)
    }
  }

  async function loadAllUsers(){
    dispatch(setLoading(true))
    const response=await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/user/get-all-users`)
    setAllUsers(response.data.allUsers)
    dispatch(setLoading(false))
  }

  useEffect(()=>{ 
    console.log('load all user called')
    loadAllUsers()
  },[])
  return (
    <div>
        <h4 className='mb-4'>View All User</h4>
        {
          loading?<Loader/>:
          <div>
              <table className="table-striped table border">
                  <thead>
                      <tr>
                        <td>Sr. no.</td>
                        <td>Username</td>
                        <td>Profile</td>
                        <td>Action</td>
                      </tr>
                  </thead>
                  {
                    users?.length>0?<tbody>
                    {users.map((user,index)=>
                      <tr>
                        <td>{++index}</td>
                        <td>{user.firstName+' '+user.lastName}</td>
                        <td>{user.role}</td>
                        <td className='d-flex gap-1'>
                          <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#viewUserModal" onClick={()=> setSelectedUser(user)}><span className='bi bi-eye'></span></button>
                          <button className="btn btn-sm btn-warning" onClick={()=>handleEditUser(user)}><span className='bi bi-pencil'></span></button>
                          <button className="btn btn-sm btn-secondary" onClick={()=>{setShowUserPasswordChangeModal(true);dispatch(setProfile(user))}}><span className='bi bi-lock'></span></button>
                          <button className="btn btn-sm btn-danger"  onClick={() =>{ setShowUserDeleteModal(true);setSelectedUser(user)} }> <span className='bi bi-trash'></span></button>
                        </td>
                      </tr>

                    )}</tbody>:
                    <tbody>
                      <tr>
                        <td colSpan={4}>No users, are added</td>
                      </tr>

                    </tbody>
                  }
              </table>            
          </div>
        }
        {/* user detail modal */}
           <div className="modal fade" id="viewUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog  ">
                  <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">User details</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <div className="card mb-3 border  p-2" style={{maxWidth: "540px"}}>
                          <div className="row g-2">
                              <div className="col-md-5">
                              <img src={selectedUser?.image} className="img-fluid rounded" alt="..."/>
                              </div>
                              <div className="col-md-7 mb-1">
                              <div className="card-body d-flex gap-1 flex-column">
                                  <h5 className="card-title">Name:  {selectedUser?.firstName+' '+selectedUser?.lastName} </h5>
                                  <div className="card-text small">Gender:  {selectedUser?.gender}</div>
                                  <div className="card-text small">Profile:  {selectedUser?.role}</div>
                                  <div className="card-text small">Email:  {selectedUser?.email}</div>
                                  <div className="card-text small">Phone no.:  {selectedUser?.phone_no}</div>                        
                              </div>                           
                              </div>        
                              
                          </div>
                      </div>                                      
                  </div>

                  </div>
              </div>
          </div> 
          {/* confirm delete use modal */}
        <Modal show={showUserDeleteModal} onHide={() => setShowUserDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title className="fs-5 fw-semibold d-flex align-items-center">
                <span className='bi bi-exclamation-circle text-danger me-2 fs-4 fw-bolder'></span>
                Delete Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card mb-3 border p-2">
                <p>Are you sure, you want to delete the selected user?</p>
                <p className='small'><span className='text-danger fw-semibold'>Warning:</span> The selected user account will be permanently deleted from our database</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" size="sm" onClick={handleDeleteUser}>
                <span className='bi bi-trash me-1'></span>Confirm Delete
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowUserDeleteModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* user change password modal */}
          <Modal show={showUserPasswordChangeModal} onHide={() => setShowUserPasswordChangeModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title className="fs-5 fw-semibold d-flex align-items-center">
                <span className='bi bi-exclamation-circle text-primary me-2 fs-4 fw-bolder'></span>
                Send Verification Email Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card mb-3 border p-2">
                <p>Are you sure, you want to send an email verification email to the selected user?</p>
                <p className='small '><span className='text-primary fw-semibold'>Info:</span> The selected user will receive an otp verification email.</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" size="sm" onClick={handleUserChangePassword}>
                Proceed
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowUserPasswordChangeModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}

export default ViewAllUsers