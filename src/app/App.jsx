import AppRoutes from './Routes'
import { useAuth } from '@/shared/hooks/useAuth'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { Support } from '@/widgets/support/Support'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect, useState } from 'react'

function App() {
  const { isAuthenticated } = useAuth()
  const [fadeOut, setFadeOut] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      const hideTimer = setTimeout(() => {
        setShowSplash(false)
      }, 500) // время анимации fade-out
      return () => clearTimeout(hideTimer)
    }, 500) // время показа splash
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Основной контент всегда отображается */}
      <Header isAuthorized={isAuthenticated} />
      <AppRoutes />
      <Footer />
      <Support />
      <ToastContainer />

      {/* Splash экран только поверх */}
      {showSplash && (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
          <div className="spinner">
            <img src="/logo_W.svg" alt="loading" />
            <img src="/logo_COIN.svg" alt="" />
            <img src="/logo_Z.svg" alt="" />
            <img src="/logo_A.svg" alt="" />
          </div>
        </div>
      )}
    </>
  )
}
export default App
