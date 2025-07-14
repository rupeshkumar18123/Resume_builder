import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to Resume Builder</h1>
      <Link to="/login" className="btn btn-outline-primary m-2">Login</Link>
      <Link to="/signup" className="btn btn-outline-success m-2">Signup</Link>
      <Link to="/builder" className="btn btn-primary m-2">Build Resume</Link>
    </div>
  );
}