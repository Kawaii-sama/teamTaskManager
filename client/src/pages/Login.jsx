import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");

      const res = await loginUser({ email, password });

      // 🔐 Store JWT token (IMPORTANT)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // 🚀 Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {/* ❌ Error display */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        No account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;