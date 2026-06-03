import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../pages/Loader'
import { apiconnector } from '../../services/apiconnector'
import { setLoading, setTableLoader } from '../../slices/bookSlice'
import { SERVER_API } from '../../services/api'

const ViewAllBookCategories = () => {
 const {loading,tableLoader}=useSelector(state=>state.book)
     const [counter,setCounter]=useState(1)
     const [limit,setLimit]=useState(5)
     const [totalPages,setTotalPages]=useState()
     const dispatch=useDispatch()
     const [categories,setCategories]=useState([])
     async function initialCategoryLoader(){
         dispatch(setLoading(true))
         const response=await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/book/categories/view-all-categories?page=${1}&limit${5}`)
         setCategories(response.data.allCategories)
         setTotalPages(response.data.totalPages)
         dispatch(setLoading(false))
         console.log(response.data.allCategories)
     }
       async function loadCategories(){
         dispatch(setTableLoader(true))
         const response=await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/book/categories/view-all-categories?page=${1}&limit${5}`)
         setCategories(response.data.allCategories)
         setTotalPages(response.data.totalPages)
         dispatch(setTableLoader(false))
         console.log(response.data.allCategories)
     }
 
 
     useEffect(()=>{initialCategoryLoader()},[])
     useEffect(()=>{loadCategories()},[limit,counter])
   return (
     <div>
         <h4 className='mt-3'>View All Course Categories</h4>
         <div>
             {
                 loading?<Loader/>:
                 <div className='mt-4 position-relative'>
                     <table className='table table-striped border'>
                         <thead>
                             <tr>
                                 <th>Sr. no.</th>
                                 <th>Category Name</th>
                                 <th>Books Contains</th>
                                 <th>Action</th>
                             </tr>
                         </thead>
                         <tbody >
                             
                             {tableLoader&&<div className='position-absolute  w-100  d-flex justify-content-center align-items-center' style={{height:"calc(100% - 37px)",backgroundColor:"rgba(0,0,0,0.2)"}}></div>}                  
 
                             {
                                 categories.map((category,index)=>
                                     <tr>
                                         <td>{++index}</td>
                                         <td>{category.categoryTitle}</td>
                                         <td>{category.books.length}</td>                                        
                                         <td className='d-flex gap-1'>
                                             <button className="btn btn-sm btn-primary"><span className='bi bi-eye'></span></button>
                                             <button className="btn btn-sm btn-warning"> <span className='bi bi-pencil'></span></button>
                                             <button className="btn btn-sm btn-danger"><span className='bi bi-trash'></span></button>
                                         </td>
                                     </tr>
                                 )
                             }
                             
                         </tbody>                        
                     </table>
                 </div>
             }
             {categories?.length>0&&<div className='d-flex align-items-center' >
             <div className='input-group input-group-sm w-auto '>
                 <button className="btn btn-sm btn-outline-dark"><span className='bi bi-skip-backward-fill'></span></button>
                 <button className="btn btn-sm btn-outline-dark" onClick={()=>setCounter(prev=>Math.max(1,prev-1))}><span className='bi bi-rewind-fill' ></span></button>
                 <div className='d-flex justify-content-center align-items-center me-2 ms-2' >
                     <input type="text"  value={counter} className='text-center form-control form-control-sm me-1' style={{width:"35px"}} />
                     <span>of {totalPages}</span>
                 </div>
                 
                 <button className="btn btn-sm btn-outline-dark border-end-0" onClick={()=>setCounter(prev=>Math.min(totalPages,prev+1))}><span className=' bi bi-fast-forward-fill'></span></button>
                 <button className="btn btn-sm btn-outline-dark"><span className='bi bi-skip-forward-fill'></span></button>
             </div>
             <div>
                 <select name="" id=""  defaultValue={limit} onChange={(e)=>setLimit(e.target.value)} className='form-control form-control-sm  ms-1' style={{width:"40px"}}>
                     <option value={5}>5</option>
                     <option value={10}>10</option>
                     <option value={15}>15</option>
                     <option value={20}>20</option>
                 </select>
             </div>
         </div>}
         </div>
     </div>
   )
}

export default ViewAllBookCategories