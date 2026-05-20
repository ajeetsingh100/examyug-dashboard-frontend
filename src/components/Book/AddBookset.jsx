import React from 'react'

const AddBookset = () => {
  return (
    <div>
        <div className='container mt-3'>
            <h4>
                Add Bookset
            </h4>

            {/* Books form */}
            <div>
                <form className='mt-5   shadow-lg bg-white '>
                    
                        <div class="row p-4 gy-3">
                            <h4>Bookset Information</h4>
                            <hr />
                        <div class="form-group col-12 col-md-6">
                            <label for="inputEmail4" className='form-label'>Bookset title</label>
                            <input type="email" class="form-control form-control-sm" id="inputEmail4"/>
                        </div>
                        <div class="form-group col-12 col-md-6">
                            <label for="inputEmail4" className='form-label'>Book category</label>
                            <select name="" className='form-select form-select-sm' id="">
                                <option value="">HSSC</option>
                                <option value="">BPSC</option>
                                <option value="">Railway</option>
                            </select>
                        </div>
                        <div class="form-group  col-md-12">
                            <label for="inputPassword4" className='form-label'>Booket description</label>
                            <textarea class="form-control form-control-sm"  cols={4} rows={2} id="inputAddress" placeholder="describe your course...."></textarea>
                        </div>

                        <div class="form-group col-12 col-md-6">
                                <label for="inputAddress2" className='form-label'>Thumbnail</label>
                                <input type="file" class="form-control form-control-sm" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                        </div>
                        {/* Add Books */}
                        <h4 className='mt-5'>Add Books</h4>
                        <hr />   
                        <div className='form-group col-12 col-md-4'>
                            <label htmlFor="inputBookName" className='form-label'>Search Book</label>
                            <div className='input-group'>
                                <input type="search" name="" id="" className='form-control form-control-sm' placeholder="Type here to search book" />
                                <button type="button" className='btn btn-warning btn-sm'><i className='bi bi-search'></i></button>
                            </div>                           
                        </div>
                        <div className='form-group col-12'>
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
                                   <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Xyz</td>
                                            <td>HSSC</td>
                                            <td>1200</td>
                                            <td>
                                                <div>
                                                    <button type='button' className="btn btn-secondary btn-sm">
                                                        <i className='bi bi-plus'></i>
                                                    </button>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Xyz</td>
                                            <td>HSSC</td>
                                            <td>1200</td>
                                             <td>
                                                <div>
                                                    <button type='button' className="btn btn-secondary btn-sm">
                                                        <i className='bi bi-plus'></i>
                                                    </button>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}><center>Sorry, no record found</center></td>
                                            
                                        </tr>
                                   </tbody>
                                </table>
                            </div>
                            <nav aria-label="...">
                                <ul class="pagination pagination-sm " >
                                    <li class="page-item">
                                    <a class="page-link text-dark" href="#" tabindex="-1">Previous</a>
                                    </li>
                                    <li class="page-item"><a class="page-link text-dark" href="#">1</a></li>
                                    <li class="page-item   ">
                                    <a class="page-link text-bg-warning text-white " href="#">2</a>
                                    </li>
                                    <li class="page-item"><a class="page-link text-dark " href="#">3</a></li>
                                    <li class="page-item">
                                    <a class="page-link text-dark" href="#">Next</a>
                                    </li>
                                </ul>
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
                                   <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Xyz</td>
                                            <td>HSSC</td>
                                            <td>1200</td>
                                            <td>
                                                <div>
                                                    <button type='button' className="btn btn-primary btn-sm">
                                                        <i className='bi bi-trash'></i>
                                                    </button>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Xyz</td>
                                            <td>HSSC</td>
                                            <td>1200</td>
                                             <td>
                                                <div>
                                                    <button type='button' className="btn btn-primary btn-sm">
                                                        <i className='bi bi-trash'></i>
                                                    </button>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}><center>Sorry, no record found</center></td>
                                            
                                        </tr>
                                   </tbody>
                                </table>
                            </div>

                        </div>

                        
                        <h4 className='mt-5'>Bookset Pricing</h4>
                        <hr />
                        <div class="form-group  col-12 col-md-4">
                            <label for="inputCity" className='form-label'>MRP</label>
                            <div className='input-group'>
                                <i class="bi bi-currency-rupee input-group-prepend input-group-text"></i>
                                <input type="text" class="form-control form-control-sm" id="inputCity"/>
                            </div>
                            
                        </div>
                        <div class="form-group col-12 col-md-4">
                            <label for="inputState" className='form-label'>Price</label>
                            <div className='input-group'>
                                 <i class="bi bi-currency-rupee input-group-text"></i>
                                 <input type="text" name="" id="inputState" className='form-control form-cntrol-sm' />
                            </div>
                           
                        </div>
            
                       
                            <div className='form-group mt-5 d-flex justify-content-center'>
                                <button type="button" className='btn btn-primary btn-sm'>Add Bookset</button>
                            </div>
                    </div>
              </form>
        </div>
        </div>
    </div>
  )
}

export default AddBookset