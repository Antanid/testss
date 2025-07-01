// src/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/home-page'
import { ProfilePage } from '@/pages/profile-page'
import { ExchangerPage } from '@/pages/exchanger-page'

// Новые страницы
import { WaitingTransactionPage } from '@/pages/transaction-pages/WaitingTransactionPage'
import { TransactionCompletedPage } from '@/pages/transaction-pages/TransactionCompletedPage'

// Защита маршрутов
import { ProtectedRoute } from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Главная страница */}
      <Route path="/" element={<HomePage />} />

      {/* Защищённые маршруты: Профиль */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Защищённые маршруты: Обмен */}
      <Route
        path="/exchange"
        element={
          // <ProtectedRoute>
          <ExchangerPage />
          // </ProtectedRoute>
        }
      />

      {/* Подстраницы /exchange */}
      <Route
        path="/exchange/expect"
        element={
          <ProtectedRoute>
            <WaitingTransactionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/exchange/completed"
        element={
          <ProtectedRoute>
            <TransactionCompletedPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
