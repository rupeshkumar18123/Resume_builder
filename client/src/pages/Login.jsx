import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/builder");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 p-md-5 border-0" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 fw-bold text-primary">Sign In</h2>
          
          <form onSubmit={handleLogin}>
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
              <div className="form-text text-end">
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100 fw-bold py-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Signing In...
                </>
              ) : "Sign In"}
            </button>
          </form>
          
          <div className="text-center mt-4 pt-3 border-top">
            <p className="text-muted">
              Don't have an account?{" "}
              <Link to="/signup" className="fw-medium text-decoration-none">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}