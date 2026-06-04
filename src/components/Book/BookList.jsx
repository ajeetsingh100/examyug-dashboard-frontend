import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchBarLoader,setTableLoader } from '../../slices/booksetSlice'
import { searchBook } from '../../services/operations/booksetAPI'

const BookList = ({value,onChange}) => {
    const [searchedBooks,setSearchedBooks]=useState([])
        const [bookExistFlag,setBookExistFlag]=useState(false)
        const [bookSearchFlag,setBookSearchFlag]=useState(false)
        const [counter,setCounter]=useState(1)
        const [totalPages,setTotalPages]=useState(0)
        const [totalRecords,setTotalRecords]=useState(0)
        const [keyword,setKeyword]=useState('')
        const [keywordFlag,setKeywordFlag]=useState(false)
        const searchBox=useRef()
        const [limit,setLimit]=useState(3)
        const [tempBookList,setTempBookList]=useState(value)
        const {searchBarLoader, tableLoader}=useSelector(state=>state.bookset)
        const dispatch=useDispatch()

        async function handleBookSearch(){
                const searched_keyword=searchBox.current.value
                let page
                setKeyword(searched_keyword)
                if(keyword!==searched_keyword){
                    page=1
                    setCounter(1)
                }else{
                    page=counter
                }
                if(!searched_keyword.trim()){
                    setKeywordFlag(true)
                    return
                }
                dispatch(setTableLoader(true))
                const response=await dispatch(searchBook(searched_keyword,page,limit))
                dispatch(setTableLoader(false))
                setSearchedBooks(response.data.books)       
                setTotalPages(response.data.totalPages)             
                setBookSearchFlag(true)              
                setKeywordFlag(false)
                dispatch(setSearchBarLoader(false))
        
            }

    
    function handleAddBook(book){
        console.log('handleAddBook called',tempBookList)
        const updatedList=[...tempBookList,book]
        const exist=tempBookList.some(existing_book=>existing_book._id===book._id)
        if(exist){
        setBookExistFlag(true) 
        console.log('flag checked!!!')       
        return 
        }
        setTempBookList(updatedList)
        onChange(updatedList)
    }
    function handleBookExistButton(){
        console.log('handlebookexistbutton callled')
        setBookExistFlag(false)
    }
        function handleRemoveBook(book){
        console.log('handleRemoveBook is called',tempBookList)       
            const updateBookList=tempBookList.filter(existing_book=>existing_book._id!==book._id)
            setTempBookList(updateBookList)
            onChange(updateBookList)
        
    }
    useEffect(()=>{
            if(searchBox.current.value.trim()!==''){
                handleBookSearch()
            }        
               
        },[counter])
    
        useEffect(()=>{
            if(searchBox.current.value.trim()!=''){
                setCounter(1)
                handleBookSearch()
            }
        },[limit])

       useEffect(()=>{
    setTempBookList(value || [])
},[value])
    
  return (
    <div>
        
    <h4 className='mt-5'>Add Books</h4>
                        <hr />   
                        <div className='form-group col-12 col-md-4'>
                            <label htmlFor="inputBookName" className='form-label'>Search Book</label>
                            <div className='input-group'>
                                <input type="search" name="searched_book" id="" className='form-control form-control-sm' ref={searchBox} placeholder="Type here to search book" />
                                <button type="button" className='btn btn-warning btn-sm' onClick={handleBookSearch}>
                                    
                                  {
                                    searchBarLoader?(<div class="spinner-border text-white spinner-border-sm" role="status">
                                    <span class="sr-only"></span>
                                    </div>):(
                                        <i className='bi bi-search'></i>
                                    )
                                  }
                                </button>
                               
                            </div>      
                            {
                                keywordFlag&&(
                                    <div style={{fontSize:" 0.875em",color:" #dc3545",marginTop:"0.25rem"}}>*please enter keyword to search</div>
                                        
                                )
                            }                     
                        </div>
                        <div className='form-group col-12 mt-2'>
                            {
                                bookExistFlag&&(
                                    <div className="alert alert-warning d-flex justify-content-between alert-dismissible fade show" role="alert">
                                        <span><strong>Alert!</strong> Book already exists</span>
                                        <button type="button" className="btn btn-sm" data-bs-dismiss="alert" onClick={handleBookExistButton}>
                                            <span className='bi bi-x '></span>
                                        </button>
                                     </div>
                                )
                            }
                             <div className='position-relative mt-2'>
                                <table className='table table-striped table-bordered border-2'>
                                   <thead >
                                        <tr>
                                            <th>Sr.no</th>
                                            <th>Book Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                   </thead>
                                   {tableLoader&&<div className='position-absolute  w-100  d-flex justify-content-center align-items-center' style={{height:"calc(100% - 37px)",backgroundColor:"rgba(0,0,0,0.2)"}}>

                                   </div>}
                                   {
                                        bookSearchFlag&&(
                                            
                                            <tbody>
                                              {
                                                searchedBooks.length>0?(
                                                    searchedBooks.map((book,index)=>
                                                        <tr key={book._id}>
                                                            <td>{book.serial_no}</td>
                                                            <td>{book.bookTitle}</td>
                                                            <td>{book.category.categoryTitle}</td>
                                                            <td>{book.sellingPrice}</td>
                                                            <td>
                                                                <button type='button' className="btn btn-sm btn-warning" onClick={()=>handleAddBook(book)}><i className='bi bi-plus'></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                ):(
                                                    <tr >
                                                        <td colSpan={5} className='text-center' >Sorry, no record found</td>
                                                    </tr>
                                                )
                                              }
                                            </tbody>
                                        )
                                   }
                                </table>
                            </div>                      
                               
                                <nav aria-label="..." className={`${searchedBooks.length>0?`d-block`:`d-none`}`}>
                                <div className='d-flex gap-1 align-items-center '>
                                    <button  type='button' className="btn b tn-sm btn-outline shadow " style={{border:'1px solid grey'}} ><span className='bi bi-skip-backward-fill'></span></button>
                                    <button  type='button' className="btn btn-sm btn-outline shadow  " style={{border:'1px solid grey'}} onClick={()=>setCounter(prev=>Math.max(1,prev-1))} ><span className='bi bi-rewind-fill' ></span></button>
                                        Page
                                        <input type="text" name="" id="" className="form-control form-control-sm text-center" disabled  value={counter} style={{width:"35px"}}/>
                                        of {totalPages}                                         
                                   <button  type='button' className="btn btn-sm btn-outline shadow " style={{border:'1px solid grey'}}onClick={()=>setCounter(prev=>Math.min(totalPages,prev+1))} ><span className='bi bi-fast-forward-fill' ></span></button>
                                   <button type='button' className="btn btn-sm btn-outline shadow " style={{border:'1px solid grey'}} ><span className='bi bi-skip-forward-fill'></span></button>
                                    <select name="" id=""    onChange={(e)=>setLimit(e.target.value)}  className=' shadow-lg form-control form-control-sm text-center' style={{width:"35px"}}>
                                        <option value={3}>3</option>
                                        <option value={5}>5</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>                    
                                   </select>
                                </div>
                            </nav>
                            
                        </div>

                         <div className='form-group col-12 mt-3'>
                           <label htmlFor="" className='form-label' >Your bookset contains following books:</label>
                             <div>
                                <table className='table table-striped table-bordered border-2'>
                                   <thead>
                                        <tr>
                                            <th>Sr.no</th>
                                            <th>Book Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                   </thead>
                                  {
                                    tempBookList?.map((book,index)=>
                                    <tbody>
                                        <tr key={++index}>
                                            <td>{++index}</td>
                                            <td>{book.bookTitle}</td>
                                            <td>{book.category?.categoryTitle}</td>
                                            <td>{book.sellingPrice}</td>
                                            <td>
                                                <button type='button' className="btn btn-sm btn-danger" onClick={()=>handleRemoveBook(book)}><i className='bi bi-trash'></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    )
                                  }
                                </table>
                            </div>

                        </div>

</div>
  
  )
}

export default BookList