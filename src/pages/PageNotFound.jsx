import React from 'react'

const PageNotFound = () => {
  return (
    <div>
        <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5">
            <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
            <h2 className="fw-bold mt-3">Page Not Found</h2>
            <p className="text-muted">The page you are looking for doesn't exist or has been moved.</p>
          </div>
    </div>
  )
}

export default PageNotFound