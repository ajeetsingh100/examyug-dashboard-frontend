import React from 'react'

const SalesHistory = () => {
  return (
    <div>
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Recent</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Books</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Booksets</a>
                </li>
                </ul>
        </div>
        <div className='mt-2'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Sr.no</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Buyer Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>XYZ</td>
                        <td>10,000</td>
                        <td>ABC</td>
                        <td>
                            <div>
                               <div className='badge bg-success'>Enrolled</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default SalesHistory