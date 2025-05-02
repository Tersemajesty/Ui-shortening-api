import { createContext, useContext, useState, useEffect } from "react"
import { loginUser, signupUser, getCurrentUser } from "../lib/auth"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Not logged in", error)
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  const login = async (email, password) => {
    const user = await loginUser(email, password)
    setUser(user)
    return user
  }

  const signup = async (name, email, password) => {
    const user = await signupUser(name, email, password)
    setUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  }

  return(
    <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>
  )
  
}

export const useAuth = () => useContext(AuthContext)
