import React, { useEffect, useRef, useState } from 'react'
import { apiconnector } from '../../services/apiconnector'
import { SERVER_API } from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import {setLoading, setSearchBarLoader,setRelay,setTableLoader} from '../../slices/booksetSlice'
import { searchBookset } from '../../services/operations/booksetAPI'
import toast from 'react-hot-toast'
import Loader from '../../pages/Loader'

const ViewAllBookset = () => {
    const [booksets,setBooksets]=useState([])
    const [viewSelectedBookset,setViewSelectedBookset]=useState()
    const [categories,setCategories]=useState([])
    // RELATED TO PAGINATION STATE
    const [keyword,setKeyword]=useState('')
    const searchBox=useRef()
  
    const [counter,setCounter]=useState(1)    
    const [categorySelected,setCategorySelected]=useState('')
    const [categoryHistory,setCategoryHistory]=useState('')
    const categoryPaneRef=useRef()
    const [limit,setLimit]=useState(5)
    const [totalPages,setTotalPages]=useState(0)
    const [displayPaginationFlag,setDisplayPaginationFlag]=useState(false)
    const [searchKeywordFlag,setSearchKeywordFlag]=useState(false)
    const [showSearchItemFlag,setShowSearchItemFlag]=useState(false)
    

    const {loading,searchBarLoader,relay,tableLoader}=useSelector(state=>state.bookset)
    const dispatch=useDispatch()
    
    function handleSelectedBookset(bookset){
        setViewSelectedBookset(bookset)      
        console.log('bookset',bookset)  
    }
    function recordReset(){
       dispatch(setRelay(4))
       searchBox.current.value=''
       setKeyword('')
       categoryPaneRef.current.value=''
       setShowSearchItemFlag(false)
    }
  
    async function handleCategorySearch(){
        const categorySearched=categoryPaneRef.current.value
        let page=1
        if(categoryHistory===categorySearched){
            page=counter
        }
        console.log('handle category search function callled')
        setKeyword('')
        setCategoryHistory(categorySearched)
        setCategorySelected(categoryPaneRef.current.selectedOptions[0].innerText)
        dispatch(setRelay(3))
       if(relay===3&&categorySearched.trim()){
        dispatch(setTableLoader(true))
        const response=await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/bookset/category-searched?keyword=${categorySearched}&page=${page}&limit=${limit}`)
        console.log(response.data)
        dispatch(setTableLoader(false))
        setBooksets(response.data.booksets)
        setTotalPages(response.data.totalPages)
        setShowSearchItemFlag(true)
       }
    }
    async function handleSearchKeyword(){
        const searchedKeyword=searchBox.current.value
        setShowSearchItemFlag(true)
        dispatch(setRelay(2))
        let page
        setKeyword(searchedKeyword)
        if(!searchedKeyword.trim()){
            setSearchKeywordFlag(true)
            setShowSearchItemFlag(false)
            return
        }
        if(keyword!==searchedKeyword.trim()){
            page=1
            setCounter(1)
        }else{
            page=counter
        }
         dispatch(setTableLoader(true))
        const response=await dispatch(searchBookset(searchedKeyword,page,limit))
        dispatch(setTableLoader(false))
        setBooksets(response.data.booksets)
        setTotalPages(response.data.totalPages)
        dispatch(setSearchBarLoader(false))
        setSearchKeywordFlag(false)
    }

    async function initialBooksetLoader(){
            dispatch(setLoading(true))
            const booksetResponse=await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/bookset/view-all-booksets?page=${counter}&limit=${limit}`)
            const categoryResponse=await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/bookset/categories/get-all-categories`)
            setBooksets(booksetResponse.data.allBooksets)
            setTotalPages(booksetResponse.data.totalPages)
            setCategories(categoryResponse.data.allCategories)
            dispatch(setLoading(false))
            dispatch(setRelay(1))
        }
    async function loadBookset(){
            dispatch(setTableLoader(true))
            const booksetResponse=await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/bookset/view-all-booksets?page=${counter}&limit=${limit}`)
            const categoryResponse=await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/bookset/categories/get-all-categories`)
            setBooksets(booksetResponse.data.allBooksets)
            setTotalPages(booksetResponse.data.totalPages)
            setCategories(categoryResponse.data.allCategories)
            dispatch(setTableLoader(false))
            dispatch(setRelay(1))
        }
    useEffect(()=>{        
        initialBooksetLoader()
    },[])

    useEffect(()=>{

        switch(relay){
            case 1: loadBookset()
                    break
            case 2: handleSearchKeyword()
                    break
            case 3: handleCategorySearch()
                    break
            case 4: setCounter(1)
                    loadBookset()
                    break;
            default:console.log('none of the case matched')            
        }
    },[counter,relay])

      useEffect(()=>{
        switch(relay){
            case 1: setCounter(1)
                    loadBookset()
                    break
            case 2: setCounter(1)
                    handleSearchKeyword()
                    break
            case 3: setCounter(1)
                    handleCategorySearch()
                    break
            case 4: setCounter(1)
                    loadBookset()
                    break;
            default:console.log('none of the case matched')
        }   
    },[limit])
    return (
    <div>
        <div>
            <h4>View All Courses</h4>
        </div>
        <div className='d-flex justify-content-between'>
            <div>
                <label htmlFor="" className='form-label small '>Search course:</label>
                <div className='d-flex align-items-center justify-content-center gap-3 '>
                    <div className='input-group input-group-sm'>
                    <input type="search" name="" ref={searchBox} id="" className='form-control form-control-sm' />
                    <button className="btn btn-warning" onClick={handleSearchKeyword}>
                        {searchBarLoader?<div className="spinner-border text-white spinner-border-sm" role="status">
                                <span className="sr-only"></span>
                                </div>:
                                <span className='bi bi-search'></span>}
                    </button>
                </div>
                {showSearchItemFlag&&<button className='btn btn-primary btn-sm text-nowrap  gap-2'><span>{keyword||categorySelected}</span> <span className='bi bi-x' onClick={recordReset}></span></button>}
                </div>
                {searchKeywordFlag&&<div style={{fontSize:" 0.875em",color:" #dc3545",marginTop:"0.25rem"}}>*please enter keyword to search</div>}

            </div>
            <div>
                <label htmlFor="" className='form-label small '>Search by category:</label>
                <select name="" id="" ref={categoryPaneRef} onChange={()=>handleCategorySearch()} className='form-control form-control-sm  '>
                    <option value="" categoryName={''}>--select-category--</option>
                {
                    categories.map(category=>
                        <option key={category._id} value={category._id}>{category.categoryTitle}</option>
                    )
                }
                </select>
            </div>
            
        </div>

        {loading?<Loader/>:<div><div className='mt-3 position-relative'>
            <table className='table table-striped border'>
                <thead >
                    <tr>
                        <th>Sr. no.</th>
                        <th>BoosetName</th>
                        <th>CategoryName</th>
                        <th>Bookset Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
             
                      {tableLoader&&<div className='position-absolute  w-100  d-flex justify-content-center align-items-center' style={{height:"calc(100% - 37px)",backgroundColor:"rgba(0,0,0,0.2)"}}></div>}                  
                <tbody>
                
                    {                
                    booksets?.length>0?(
                        booksets.map((bookset,index)=>
                        <tr key={bookset._id}>
                            <td>{bookset.serial_no}</td>
                            <td>{bookset.booksetTitle}</td>
                            <td className=''>{bookset.category.categoryTitle}</td>
                            <td>₹{bookset.sellingPrice}</td>
                            <td className='d-flex gap-2'>
                                <button className="btn btn-sm btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleSelectedBookset(bookset)}><span className='bi bi-eye text-white'></span></button>
                                <button className="btn btn-sm btn-warning" ><span className='bi bi-pencil'></span></button>
                                <button className="btn btn-sm btn-danger"><span className='bi bi-trash'></span></button>
                            </td>
                        </tr>
                    )
                    ):(
                        <tr>
                            <td colSpan={5} className='text-center'>No booksets are added yet</td>
                        </tr>
                    )
                    
                }
                </tbody>
                    
                
                
            </table>
        </div>
        {booksets?.length>0&&<div className='d-flex align-items-center' >
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
        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Bookset Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="card mb-3 border  p-2" style={{maxWidth: "540px"}}>
                        <div className="row g-2">
                            <div className="col-md-5">
                            <img src={viewSelectedBookset?.thumbnail} className="img-fluid rounded" alt="..."/>
                            </div>
                            <div className="col-md-7 mb-1">
                            <div className="card-body">
                                <h5 className="card-title">{viewSelectedBookset?.booksetTitle} </h5>
                                <p className="card-text small">{viewSelectedBookset?.category.categoryTitle}</p>
                                <p className='d-flex gap-2'>
                                    <strike className='small '>₹{viewSelectedBookset?.maxPrice}</strike>
                                    <span className='fw-semibold'>₹{viewSelectedBookset?.sellingPrice}</span>
                                </p>
                                            
                            </div>                            
                            </div>
                            
                            <div className=' col-12 border-top py-2'>
                                <span className='fw-semibold'>Description: </span> <span>{viewSelectedBookset?.booksetDescription}</span>
                            </div>
                            <p className='card-text small fw-semibold'>Books Contains</p>
                            <div style={{maxHeight:"200px",overflowY:'auto'}}>
                                 <table className='table table-striped border'>
                                    <thead className='position-sticky top-0 z-1 ' style={{backgroundColor:'#fff'}}>
                                        <tr>
                                            <th>Sr. no.</th>
                                            <th>Book Name</th>
                                        </tr>
                                    </thead>
                                    {
                                        viewSelectedBookset?.bookList.length>0?
                                        <tbody>
                                             {viewSelectedBookset.bookList.map((book,index)=>
                                                <tr>
                                                    <td>{++index}</td>
                                                    <td>{book.bookTitle}</td>
                                                </tr>
                                                )
                                            }

                                        </tbody>:
                                        <tbody>
                                            <tr>
                                                <td colSpan={2} className='text-center'>No books are added</td>
                                            </tr>
                                        </tbody>                                      
                                    }
                                </table>
                            </div>           
                        </div>
                    </div>                                      
                </div>

                </div>
            </div>
        </div></div>}
    </div>
    
  )
}

export default ViewAllBookset