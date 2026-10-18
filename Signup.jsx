
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed. Please try again.");
        return;
      }

      setMessage("Account created successfully! Redirecting to login...");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Signup error:", error);
      setMessage(
        "Cannot connect to the server. Please check that the backend is running."
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
            <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
            <h1>
              Make room
              <br />
              for something
              <br />
              <em>beautiful.</em>
            </h1>
            <p>
              Create your personal space and enjoy an
              experience made with care and intention.
            </p>
          </div>

          <div className="brand-footer">
            <span>EST. 2026</span>
            <span>DESIGNED WITH INTENTION</span>
          </div>
        </aside>

        <section className="form-panel signup-panel">
          <div className="mobile-brand">
            <div className="brand-mark">M</div>
            <span>MAISON</span>
          </div>

          <div className="form-heading">
            <span className="eyebrow">GET STARTED</span>
            <h2>
              Create account<span>.</span>
            </h2>
            <p>Fill in your details to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="signup-name">Full name</label>
            <div className="input-wrap">
              <UserRound size={18} />
              <input
                id="signup-name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                maxLength={50}
                required
              />
            </div>

            <label htmlFor="signup-email">Email address</label>
            <div className="input-wrap">
              <Mail size={18} />
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <label htmlFor="signup-password">Password</label>
            <div className="input-wrap">
              <LockKeyhole size={18} />
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
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

            <label htmlFor="confirm-password">Confirm password</label>
            <div className="input-wrap">
              <LockKeyhole size={18} />
              <input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="icon-button"
                aria-label={showConfirm ? "Hide password" : "Show password"}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight size={18} />}
            </button>

            {message && (
              <p className="form-message" role="status">
                {message}
              </p>
            )}
          </form>

          <p className="switch-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <p className="secure-note">
            <LockKeyhole size={13} /> YOUR SPACE. YOUR PRIVACY.
          </p>
        </section>
      </section>
    </main>
  );
}

export default Signup;
