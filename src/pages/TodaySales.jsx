import React from 'react'

const TodaySales = () => {
  return (
    <div>
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Courses</a>
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
                        <th>Action</th>
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
                                <button className="btn btn-warning btn-sm">Enroll</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TodaySales