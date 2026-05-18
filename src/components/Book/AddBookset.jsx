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
                               
                        
                        <h4 className='mt-5'>Book Pricing</h4>
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