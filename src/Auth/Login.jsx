import React from 'react'
import styles from "../styles/auth.module.css"
import { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router'
 const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
    
        if (!email || !password) {
          setError("Please fill in all fields")
          return
        }
    
        setIsLoading(true)
    
        try {
          await login(email, password)
          navigate("/home")
        } catch (err) {
          setError(err.message || "Failed to login. Please check your credentials.")
        } finally {
          setIsLoading(false)
        }
      }
    return (
        <div className={styles.loginContainer}> 
            <div className={styles.loginForm}>
                <h1 className={styles.loginTitle}>Login</h1>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <form  onSubmit={handleSubmit} className={styles.form}>
                    <input  type="email" 
                    placeholder='Enter your email' 
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" 
                    placeholder='Password' 
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
                </form>
                <p className={styles.registerText}>Don't have an account? <a href="/Signup" className={styles.registerLink}>Register</a></p>

            </div>
        </div>
    )
}
export default Login