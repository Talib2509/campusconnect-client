import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../services/authService";

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const emailFromUrl = searchParams.get("email") || "";
    const tokenFromUrl = searchParams.get("token") || "";

    setEmail(emailFromUrl);
    setToken(tokenFromUrl);

    // Token və email URL-dən silinir ki, address bar-da görünməsin
    window.history.replaceState({}, document.title, "/reset-password");
  }, [searchParams]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!email || !token) {
      setError("Reset link düzgün deyil və ya token tapılmadı.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Şifrələr eyni deyil.");
      setLoading(false);
      return;
    }

    try {
      await authService.resetPassword({
        email,
        token,
        newPassword,
        confirmPassword,
      });

      setSuccessMessage("Şifrəniz uğurla yeniləndi.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.Message ||
          err.response?.data?.title ||
          err.message ||
          "Şifrə yeniləmə zamanı xəta baş verdi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>CampusConnect</h1>
      <h2>Yeni şifrə təyin et</h2>

      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Yeni şifrə"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Yeni şifrə təkrarı"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Yenilənir..." : "Şifrəni yenilə"}
      </button>

      <p className="auth-link">
        <Link to="/login">Login səhifəsinə qayıt</Link>
      </p>
    </form>
  );
}