import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/builder");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="form-control mb-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="form-control mb-2" />
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
}