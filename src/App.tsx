import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './lib/CartContext'
import HomePage from './pages/HomePage'
import AdminLoginPage from './pages/AdminLoginPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
