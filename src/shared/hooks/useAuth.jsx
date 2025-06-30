import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const authStatus = !!token
      setIsAuthenticated(authStatus)
      setIsLoading(false)
    }

    checkAuth()

    const handleAuthChange = () => {
      const token = localStorage.getItem('token')
      setIsAuthenticated(!!token)
    }

    window.addEventListener('authChange', handleAuthChange)

    return () => {
      window.removeEventListener('authChange', handleAuthChange)
    }
  }, [])

  const login = () => {
    const fakeToken = btoa('admin@woza.com:logged_in')
    localStorage.setItem('token', fakeToken)
    window.dispatchEvent(new Event('authChange'))
  }

  const logout = () => {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('authChange'))
  }

  return { isAuthenticated, login, logout, isLoading }
}
