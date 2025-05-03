import React, { useState } from 'react'
import styles from "../styles/auth.module.css"
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
 const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const { signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      await signup(name, email, password)
      navigate("/")
    } catch (err) {
      setError(err.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

    return (
        <div className={styles.SignupContainer}>
         <div className={styles.SignupForm}>
              <h1 className={styles.SignupTitle}>Sign up</h1>
                {error && <div className={styles.errorMessage}>{error}</div>}
              <form  onSubmit={handleSubmit} className={styles.form}>
                  <input type="text" 
                  placeholder='Enter your name' 
                  className={styles.input} 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}/>

                  <input type="email" 
                  placeholder='Enter your email'
                   className={styles.input} 
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}/>

                  <input type="password"
                   placeholder='Password' 
                   className={styles.input}
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)} />

                  <input type="confirm-password"
                   placeholder='confirm-Password'
                    className={styles.input} 
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}/>

                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                   {isLoading ? "Creating Account..." : "Sign Up"}
                </button>             
                 </form>
              <p className={styles.registerText}>Already have an account? <a href="/Login" className={styles.registerLink}>Login</a></p>
         </div>
        </div>
    )
}
export default Signup