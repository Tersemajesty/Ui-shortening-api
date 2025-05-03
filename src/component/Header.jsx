import { useState } from "react"
import "../styles/Header.css"
import { Link } from "react-router-dom" // ✅ Use react-router-dom
import { useAuth } from "../context/AuthContext"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Shortly</Link>
        </div>

        <nav className="desktopNav">
          <a href="#features">Features</a> 
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
        </nav>

        <div className={`desktopAuth ${mobileMenuOpen ? "mobileAuthActive" : ""}`}>
          {user ? (
            <>
              <span className="welcomeText">Welcome, {user.name}</span>
              <button onClick={logout} className="signupBtn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="loginBtn">
                Login
              </Link>
              <Link to="/signup" className="signupBtn">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className="mobileMenuBtn" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {mobileMenuOpen && (
          <div className="mobileMenu">
            <nav>
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)}>Resources</a>
            </nav>
            <hr />
            {user ? (
              <>
                <span className="welcomeText">Welcome, {user.name}</span>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="mobileSignupBtn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mobileLoginBtn">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="mobileSignupBtn">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
