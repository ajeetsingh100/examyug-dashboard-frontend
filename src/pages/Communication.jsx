import React from 'react'

const Communication = () => {
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
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone no.</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Jon Doe</td>
                        <td>johndoe@gmail.com</td>
                        <td>8383922212</td>
                        <td>
                            <div>
                                <button className="btn btn-primary btn-sm"><span className='bi bi-eye'></span></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Communication