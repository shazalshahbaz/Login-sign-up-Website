
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      console.log("Login request started:", normalizedEmail);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: normalizedEmail,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response status:", response.status);
      console.log("Login response:", data);

      if (!response.ok) {
        setMessage(
          data.message || `Login failed (HTTP ${response.status}).`
        );
        return;
      }

      setMessage("Login successful! Welcome back.");

      // Keep the success message visible if the home route is not ready.
      // Once login works, we can add a protected dashboard.
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Login request failed:", error);

      setMessage(
        "Server se connection nahi ho raha. Check karo ke backend running hai."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="brand-panel">
          <div className="brand-top">
            <div className="brand-mark">M</div>
            <span>MAISON</span>
          </div>

          <div className="brand-content">
            <span className="eyebrow">
              <Sparkles size={15} /> A MORE REFINED EXPERIENCE
            </span>

            <h1>
              Where your
              <br />
              next chapter
              <br />
              <em>begins.</em>
            </h1>

            <p>
              A thoughtful space designed around you.
              Welcome to something extraordinary.
            </p>
          </div>

          <div className="brand-footer">
            <span>EST. 2026</span>
            <span>DESIGNED WITH INTENTION</span>
          </div>
        </aside>

        <section className="form-panel">
          <div className="mobile-brand">
            <div className="brand-mark">M</div>
            <span>MAISON</span>
          </div>

          <div className="form-heading">
            <span className="eyebrow">WELCOME BACK</span>
            <h2>
              Sign in<span>.</span>
            </h2>
            <p>Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="login-email">Email address</label>
            <div className="input-wrap">
              <Mail size={18} />
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="label-row">
              <label htmlFor="login-password">Password</label>
              <button
                type="button"
                className="text-button"
                onClick={() =>
                  setMessage("Password reset is not configured yet.")
                }
              >
                Forgot password?
              </button>
            </div>

            <div className="input-wrap">
              <LockKeyhole size={18} />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="icon-button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="remember-row">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight size={18} />}
            </button>

            {message && (
              <p className="form-message" role="status">
                {message}
              </p>
            )}
          </form>

          <p className="switch-text">
            Don't have an account? <Link to="/signup">Create account</Link>
          </p>

          <p className="secure-note">
            <LockKeyhole size={13} /> YOUR SPACE. YOUR PRIVACY.
          </p>
        </section>
      </section>
    </main>
  );
}

export default Login;
