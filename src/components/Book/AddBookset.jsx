import React, { useEffect, useRef, useState } from 'react'
import { apiconnector } from '../../services/apiconnector'
import { SERVER_API } from '../../services/api'
import toast from 'react-hot-toast'
import { searchBook } from '../../services/operations/bookAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../slices/bookSlice'
import { useForm, Watch } from 'react-hook-form'
import {addBookset} from '../../services/operations/booksetAPI'

const AddBookset = () => {
    const [categories,setCategories]=useState([])
    const {loading}=useSelector(state=>state.book)
    const {booksetLoading}=useSelector(state=>state.bookset)
    const [searchedBooks,setSearchedBooks]=useState([])
    const [bookExistFlag,setBookExistFlag]=useState(false)
    const [bookSearchFlag,setBookSearchFlag]=useState(false)
    const [counter,setCounter]=useState(1)
    const [totalPages,setTotalPages]=useState(0)
    const [keyword,setKeyword]=useState('')
    const [keywordFlag,setKeywordFlag]=useState(false)
    const searchBox=useRef()
    const limit=useRef(null)
    const [tempBookList,setTempBookList]=useState([])
    const dispatch=useDispatch()
    const {reset,handleSubmit,register,watch,formState:{errors}}=useForm()
    const maxPrice=watch('maxPrice')
    const sellingPrice=watch('sellingPrice')

    async function handleBookSearch(){
        console.log('handle search book called')
        console.log(bookSearchFlag)
        const keyword=searchBox.current.value
        const data_limit=limit.current.value
        if(!keyword.trim()){
            setKeywordFlag(true)
            return
        }
        const data=await dispatch(searchBook(keyword,counter,data_limit))
        setSearchedBooks(data.result)
        setTotalPages(data.totalPages)
        setBookSearchFlag(true)
        setKeywordFlag(false)
    }

    function handleFormData(form){
        const formData=new FormData()
        const bookList=tempBookList.map(book=>book._id)
        formData.append('booksetName',form.booksetName)
        formData.append('booksetDescription',form.booksetDescription)
        formData.append('thumbnail',form.thumbnail[0])
        formData.append('sellingPrice',form.sellingPrice)
        formData.append('maxPrice',form.maxPrice)
        formData.append('categoryName',form.categoryName)
        formData.append('bookList',JSON.stringify(bookList))
        dispatch(addBookset(formData))
    }

    function handleAddBook(book){
        console.log('handleAddBook called',tempBookList)
       const exist=tempBookList.some(existing_book=>existing_book._id===book._id)
       if(exist){
        setBookExistFlag(true) 
        console.log('flag checked!!!')       
        return 
       }
        setTempBookList([...tempBookList,book])
    }
    function handleBookExistButton(){
        console.log('handlebookexistbutton callled')
        setBookExistFlag(false)
    }
     function handleRemoveBook(book){
        console.log('handleRemoveBook is called',tempBookList)       
            const updateBookList=tempBookList.filter(existing_book=>existing_book._id!==book._id)
            setTempBookList([...updateBookList])
       
    }

    useEffect(()=>{
        async function loadCategories(){
            const response= await apiconnector('get',`${SERVER_API.MAIN_SERVER}/api/v1/book/book-category/get-all-category`)
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
        
        if(!booksetLoading){
            reset()
            setTempBookList([])
            setSearchedBooks([])
            setBookSearchFlag(false)
            searchBox.current.value=''
            setKeywordFlag(false)
        }
        
    },[booksetLoading])

    useEffect(()=>{
        if(searchedBooks.length>0){
            handleBookSearch()
        }
    },[counter])
  return (
    <div>
        <div className='container mt-3'>
            <h4>
                Add Bookset
            </h4>

            {/* Books form */}
            <div>
                <form className='mt-5  needs-validation shadow-lg bg-white ' noValidate onSubmit={handleSubmit(handleFormData)}>
                    
                        <div className="row p-4 gy-3">
                            <h4>Bookset Information</h4>
                            <hr />
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="inputEmail4" className='form-label'>Bookset title</label>
                            <input type="email" className={`form-control form-control-sm ${errors.booksetName&&`is-invalid`}`} {...register('booksetName',{required:'*bookset name is required'})} id="inputEmail4"/>
                             <div className='invalid-feedback'>
                                {errors.booksetName?.message}
                            </div>
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="inputEmail4" className='form-label'>Book category</label>
                            <select name="" className={`form-select form-select-sm' id="" ${errors.categoryName&&`is-invalid`}`} {...register('categoryName',{required:'*please select a particular category'})}>
                                <option value="">--select a category--</option>
                                {
                                    categories?.map(category=>
                                        <option key={category._id} value={category._id}>{category.categoryName}</option>
                                    )
                                }
                            </select>
                            <div className='invalid-feedback'>
                                {errors.categoryName?.message}
                            </div>
                        </div>
                        <div className="form-group  col-md-12">
                            <label htmlFor="inputPassword4" className='form-label'>Booket description</label>
                            <textarea className={`form-control form-control-sm ${errors.booksetDescription&&`is-invalid`}`} cols={4} rows={2} id="inputAddress" placeholder="describe your course...." {...register('booksetDescription',{required:'*please add description about bookset'})}></textarea>
                            <div className='invalid-feedback'>
                                {errors.booksetDescription?.message}
                            </div>
                        </div>


                        <div className="form-group col-12 col-md-6">
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
                        </div>
                        {/* Add Books */}
                        <h4 className='mt-5'>Add Books</h4>
                        <hr />   
                        <div className='form-group col-12 col-md-4'>
                            <label htmlFor="inputBookName" className='form-label'>Search Book</label>
                            <div className='input-group'>
                                <input type="search" name="searched_book" id="" className='form-control form-control-sm' ref={searchBox} placeholder="Type here to search book" />
                                <button type="button" className='btn btn-warning btn-sm' onClick={handleBookSearch}>
                                    
                                  {
                                    loading?(<div class="spinner-border text-white spinner-border-sm" role="status">
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
                        <div className='form-group col-12'>
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
                             <div>
                                <table className='table table-striped table-bordered border-2'>
                                   <thead className='table-danger'>
                                        <tr>
                                            <th>Sr.no</th>
                                            <th>Book Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                   </thead>
                                   {
                                        bookSearchFlag&&(
                                            <tbody>
                                              {
                                                searchedBooks.length>0?(
                                                    searchedBooks.map((book,index)=>
                                                        <tr key={++index}>
                                                            <td>{++index}</td>
                                                            <td>{book.bookTitle}</td>
                                                            <td>{book.categoryName.categoryName}</td>
                                                            <td>{book.sellingPrice}</td>
                                                            <td>
                                                                <button type='button' className="btn btn-sm btn-secondary" onClick={()=>handleAddBook(book)}><i className='bi bi-plus'></i></button>
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
                                    <select name="" id="" defaultValue={3} ref={limit} className=' shadow-lg form-control form-control-sm text-center' style={{width:"35px"}}>
                                        <option value={3}>3</option>
                                        <option value={5}>5</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>                    
                                   </select>
                                </div>
                            </nav>
                            
                        </div>

                         <div className='form-group col-12'>
                           <label htmlFor="" className='form-label' >Your bookset contains following books:</label>
                             <div>
                                <table className='table table-striped table-bordered border-2'>
                                   <thead className='table-danger'>
                                        <tr>
                                            <th>Sr.no</th>
                                            <th>Book Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                   </thead>
                                  {
                                    tempBookList.map((book,index)=>
                                    <tbody>
                                        <tr key={++index}>
                                            <td>{++index}</td>
                                            <td>{book.bookTitle}</td>
                                            <td>{book.categoryName?.categoryName}</td>
                                            <td>{book.sellingPrice}</td>
                                            <td>
                                                <button type='button' className="btn btn-sm btn-primary" onClick={()=>handleRemoveBook(book)}><i className='bi bi-trash'></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    )
                                  }
                                </table>
                            </div>

                        </div>

                        
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
                                <button type="submit" className='btn btn-primary btn-sm'>Add Bookset</button>
                            </div>
                    </div>
              </form>
        </div>
        </div>
    </div>
  )
}

export default AddBookset