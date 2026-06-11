import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
     <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center">
        <h1
          className="display-1 fw-bold text-danger"
          style={{ fontSize: "6rem" }}
        >
          403
        </h1>

        <i
          className="bi bi-shield-lock-fill text-danger"
          style={{ fontSize: "4rem" }}
        ></i>

        <h2 className="mt-4 fw-bold">Access Denied</h2>

        <p className="text-muted mt-3">
          You do not have permission to access this page.
        </p>

        <div className="mt-4">
          <Link to="/" className="btn btn-primary me-2">
            <i className="bi bi-house-door me-2"></i>
            Go to Dashboard
          </Link>

          <button
            className="btn btn-outline-secondary"
            onClick={() => window.history.back()}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized