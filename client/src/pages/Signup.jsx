import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        { email, username, password },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 p-md-5 border-0" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>
          <p className="text-center text-muted mb-4">Start building your professional resume</p>
          
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-medium">Full Name</label>
              <input 
                type="text"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="form-control form-control-lg"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">Email Address</label>
              <input 
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-control form-control-lg"
                placeholder="name@example.com"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-medium">Password</label>
              <input 
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-control form-control-lg"
                placeholder="••••••••"
                required
              />
              <div className="form-text">
                Use 8+ characters with a mix of letters, numbers & symbols
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-success btn-lg w-100 fw-bold py-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Creating Account...
                </>
              ) : "Sign Up"}
            </button>
          </form>
          
          <div className="text-center mt-4 pt-3 border-top">
            <p className="text-muted">
              Already have an account?{" "}
              <Link to="/login" className="fw-medium text-decoration-none">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}