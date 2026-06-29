import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { TokenManager } from "../../../utils/tokenManager";
import { jwtDecode } from "jwt-decode";

export function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const result = await authService.login({
      email,
      password,
    });

    console.log("Login response:", result);

    const accessToken = result.accessToken || result.token;

    if (!accessToken) {
      throw new Error("Backend token qaytarmadı.");
    }

    TokenManager.setAccessToken(accessToken);
console.log(jwtDecode(accessToken));

    if (result.refreshToken) {
      TokenManager.setRefreshToken(result.refreshToken);
    }

    navigate("/");
  } catch (err: any) {
    console.log("Login error:", err);

    setError(
      err.response?.data?.message ||
        err.response?.data?.Message ||
        err.response?.data?.title ||
        err.message ||
        "Email və ya şifrə yanlışdır."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>CampusConnect</h1>
      <h2>Daxil ol</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Şifrə"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

     <button type="submit" disabled={loading}>
  {loading ? "Yüklənir..." : "Daxil ol"}
</button>

<p className="auth-link">
  <Link to="/forgot-password">Şifrəni unutmusunuz?</Link>
</p>

<p className="auth-link">
  Hesabın yoxdur? <Link to="/register">Qeydiyyatdan keç</Link>
</p>
    </form>
  );
}