import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await authService.forgotPassword({
        email,
      });

      setSuccessMessage(
        "Şifrə yeniləmə linki email ünvanınıza göndərildi."
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Şifrə yeniləmə sorğusu zamanı xəta baş verdi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>CampusConnect</h1>
      <h2>Şifrəni unutdum</h2>

      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}

      <input
        type="email"
        placeholder="Email ünvanınızı daxil edin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Göndərilir..." : "Link göndər"}
      </button>

      <p className="auth-link">
        <Link to="/login">Login səhifəsinə qayıt</Link>
      </p>
    </form>
  );
}