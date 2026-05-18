import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">Dashboard</h2>
              <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm">
                <i className="bi bi-download"></i>
                <span className="d-none d-sm-inline">Export Report</span>
              </button>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-5 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6 className="text-muted fw-semibold mb-0">Total Users</h6>
                      <div className="bg-primary bg-opacity-10 text-primary rounded p-2">
                        <i className="bi bi-people-fill"></i>
                      </div>
                    </div>
                    <h3 className="fw-bold mb-2">12,456</h3>
                    
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-5 border-success shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6 className="text-muted fw-semibold mb-0">Total Sales</h6>
                      <div className="bg-success bg-opacity-10 text-success rounded p-2">
                        <i className="bi bi-currency-rupee"></i>
                      </div>
                    </div>
                    <h3 className="fw-bold mb-2">₹45,231</h3>
                   
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-5 border-primary shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6 className="text-muted fw-semibold mb-0">Total Contents</h6>
                      <div className="bg-warning bg-opacity-10 text-warning rounded p-2">
                        <i className="bi bi-body-text"></i>
                      </div>
                    </div>
                    <table cellPadding={2} className='table'>
                      <tr >
                         <th className='fw-fw-semibold small'>Books</th>
                         <th className='fw-fw-semibold small'>Bookset</th>
                         <th className='fw-fw-semibold small'>Courses</th>
                      </tr>
                      <tr>
                        <td className=''>45</td>
                        <td className=''>20</td>
                        <td className=''>15</td>
                      </tr>
                    </table>
  
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-5 border-warning shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6 className="text-muted fw-semibold mb-0">Today Sales</h6>
                      <div className="bg-info bg-opacity-10 text-info rounded p-2">
                        <i className="bi bi-pie-chart-fill"></i>
                      </div>
                    </div>
                    <h3 className="fw-bold mb-2">4.2%</h3>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-12 col-xl-8">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-transparent border-bottom-0 pt-4 pb-0 px-4 d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">Revenue Overview</h5>
                    <div className="dropdown">
                      <button className="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                        This Year <i className="bi bi-chevron-down ms-1 small"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                        <li><a className="dropdown-item" href="#!">This Year</a></li>
                        <li><a className="dropdown-item" href="#!">Last Year</a></li>
                        <li><a className="dropdown-item" href="#!">All Time</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body p-4 d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
                    <div className="text-center text-muted">
                      <i className="bi bi-graph-up-arrow fs-1 mb-3 d-block opacity-50"></i>
                      <p>Chart integration goes here</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-transparent border-bottom-0 pt-4 pb-0 px-4">
                    <h5 className="fw-bold mb-0">Recent Activity</h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex gap-3 mb-4">
                      <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                        <i className="bi bi-person-plus-fill"></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-semibold">New user registered</h6>
                        <p className="small text-muted mb-0">Jane Doe joined the platform.</p>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>2 hours ago</small>
                      </div>
                    </div>
                    <div className="d-flex gap-3 mb-4">
                      <div className="bg-success bg-opacity-10 text-success rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                        <i className="bi bi-bag-check-fill"></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-semibold">Product purchased</h6>
                        <p className="small text-muted mb-0">Order #12034 completed.</p>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>5 hours ago</small>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                        <i className="bi bi-shield-exclamation"></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-semibold">System alert</h6>
                        <p className="small text-muted mb-0">Database backup completed.</p>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>Yesterday</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Dashboard