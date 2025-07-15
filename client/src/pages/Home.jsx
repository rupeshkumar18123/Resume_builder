import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-5 bg-white rounded" style={{ width: "100%", maxWidth: "600px" }}>
        <div className="card-body text-center">
          <h1 className="display-4 fw-bold text-primary mb-4">
            Resume Builder
          </h1>
          <p className="lead text-muted mb-5">
            Create professional resumes in minutes
          </p>
          
          <div className="d-grid gap-3 col-md-8 mx-auto">
            <Link 
              to="/login" 
              className="btn btn-lg btn-outline-primary py-3 fw-bold"
            >
              Login to Your Account
            </Link>
            
            <Link 
              to="/signup" 
              className="btn btn-lg btn-outline-success py-3 fw-bold"
            >
              Create New Account
            </Link>
            
            <div className="position-relative my-4">
              <hr className="border-1" />
              <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                OR
              </span>
            </div>
            
            <Link 
              to="/builder" 
              className="btn btn-lg btn-primary py-3 fw-bold shadow-sm"
            >
              Build Resume Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}