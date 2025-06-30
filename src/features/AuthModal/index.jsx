import { useState, useCallback } from 'react'

export const useAuthModal = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  const openAuthModal = useCallback(() => setIsAuthOpen(true), [])
  const closeAuthModal = useCallback(() => setIsAuthOpen(false), [])

  return {
    isAuthOpen,
    openAuthModal,
    closeAuthModal,
  }
}
