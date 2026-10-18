
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, LogOut } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    }

    setMenuOpen(false);
    navigate("/login");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="main-navbar">
      <nav className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="nav-logo-mark">M</span>
          <span>
            MAISON<span className="logo-dot">.</span>
          </span>
        </Link>

        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <a href="#categories" onClick={closeMenu}>Collections</a>
          <a href="#products" onClick={closeMenu}>Shop</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>

          <button
            type="button"
            className="nav-mobile-logout"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-logout"
            onClick={handleLogout}
          >
            Sign out <LogOut size={15} />
          </button>

          <a href="#products" className="nav-cta" onClick={closeMenu}>
            Shop Now <ArrowUpRight size={16} />
          </a>
        </div>

        <button
          type="button"
          className="nav-menu-toggle"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
