import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup",
        { email, username, password },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  }

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto">
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="form-control mb-2" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="form-control mb-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="form-control mb-2" />
      <button type="submit" className="btn btn-primary w-100">Sign Up</button>
    </form>
  );
}